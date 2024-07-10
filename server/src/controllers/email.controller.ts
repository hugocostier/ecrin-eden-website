import { Request, Response } from 'express'
import { promises as fs } from 'fs'
import Handlebars from 'handlebars'
import mjml2html from 'mjml'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js'
import { dirname } from 'path'
import xss from 'xss'
import Appointment from '../entities/Appointment.entity.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import { capitalize } from '../utils/capitalize.util.js'
import BaseController from './base.controller.js'

/**
 * Controller for sending emails
 *
 * @class EmailController
 * @extends BaseController
 * @property {nodemailer.Transporter<SMTPTransport.SentMessageInfo>} _transporter - The transporter used to send emails
 */
export default class EmailController extends BaseController {
    private _transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    })

    private attachments: Mail.Attachment[] = [
        {
            filename: 'logo-black.png',
            path: `${process.cwd()}/src/templates/assets/logo-black.png`,
            cid: 'logo-black',
        },
        {
            filename: 'facebook.svg',
            path: `${process.cwd()}/src/templates/assets/facebook.svg`,
            cid: 'facebook',
        }, 
        {
            filename: 'instagram.svg',
            path: `${process.cwd()}/src/templates/assets/instagram.svg`,
            cid: 'instagram',
        },
        {
            filename: 'linkedin.svg',
            path: `${process.cwd()}/src/templates/assets/linkedin.svg`,
            cid: 'linkedin',
        },
        {
            filename: 'twitter.svg',
            path: `${process.cwd()}/src/templates/assets/twitter.svg`,
            cid: 'twitter',
        },
    ]
        

    /**
     * Send an email with the transporter
     *
     * @async
     * @method sendEmailWithTransporter
     * @memberof EmailController
     * @param {Mail.Options} mailOptions - The options of the email to send
     * @returns {Promise<nodemailer.SentMessageInfo>} The info of the sent email
     */
    private async sendEmailWithTransporter(mailOptions: Mail.Options): Promise<nodemailer.SentMessageInfo> {
        return new Promise((resolve, reject) => {
            this._transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(info)
                }
            })
        })
    }

    /**
     * Generate the HTML content of an email from a template
     *
     * @async
     * @method generateEmailHTML
     * @memberof EmailController
     * @param {string} templatePath - The path of the MJML template
     * @param {object} templateData - The data to inject in the template
     * @returns {Promise<string>} A promise that resolves with the HTML content of the email
     */
    private async generateEmailHTML(templatePath: string, templateData: object): Promise<string> {
        const template = await fs.readFile(templatePath, 'utf-8')
        const compiledTemplate = Handlebars.compile(template)
        const mjmlContent = compiledTemplate(templateData)
        const htmlOutput = mjml2html(mjmlContent, { filePath: dirname(templatePath) })

        if (htmlOutput.errors.length > 0) {
            throw new CustomAPIError(`Error while generating the email HTML, ${htmlOutput.errors}`, 500)
        }

        return htmlOutput.html
    }

    // ############### AUTHENTICATION EMAILS ###############
    /**
     * Send an email with a verification link
     *
     * @async
     * @method sendVerificationLink
     * @memberof EmailController
     * @param {string} email - The email of the user
     * @param {string} token - The verification token
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendVerificationLink(email: string, token: string): Promise<void> {
        const verificationLink = `${process.env.CLIENT_URL}/login/verify-email?token=${token}&email=${email}`
        const templatePath = `${process.cwd()}/src/templates/verification-email.mjml`
        const templateData = {
            verificationLink,
        }

        const html = await this.generateEmailHTML(templatePath, templateData)

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: "Vérification de l'adresse email",
            html,
            attachments: this.attachments,
        }

        await this.sendEmailWithTransporter(mailOptions)
    }

    /**
     * Send an email with a reset password OTP
     *
     * @async
     * @method sendResetPasswordOTP
     * @memberof EmailController
     * @param {string} email - The email of the user
     * @param {number} otp - The one-time password
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendResetPasswordOTP(email: string, otp: number): Promise<void> {
        const templatePath = `${process.cwd()}/src/templates/reset-password.mjml`
        const templateData = {
            code: otp.toString().split(''),
        }

        const html = await this.generateEmailHTML(templatePath, templateData)

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: 'Réinitialisation du mot de passe',
            html,
            attachments: this.attachments,
        }

        await this.sendEmailWithTransporter(mailOptions)
    }

    /**
     * Send an email to confirm the password reset
     *
     * @async
     * @method sendPasswordResetConfirmation
     * @memberof EmailController
     * @param {string} email - The email of the user
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendPasswordResetConfirmation(email: string): Promise<void> {
        const templatePath = `${process.cwd()}/src/templates/reset-password-confirmation.mjml`
        const templateData = {}

        const html = await this.generateEmailHTML(templatePath, templateData)

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: 'Mot de passe réinitialisé',
            html,
            attachments: this.attachments,
        }

        await this.sendEmailWithTransporter(mailOptions)
    }

    /**
     * Send an email to welcome a new user
     *
     * @async
     * @method sendWelcomeEmail
     * @memberof EmailController
     * @param {string} email - The email of the user
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendWelcomeEmail(email: string): Promise<void> {
        const templatePath = `${process.cwd()}/src/templates/welcome-email.mjml`
        const templateData = {
            clientUrl: `${process.env.CLIENT_URL}/login`,
        }

        const html = await this.generateEmailHTML(templatePath, templateData)

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: `Bienvenue !`,
            html,
            attachments: this.attachments,
        }

        await this.sendEmailWithTransporter(mailOptions)
    }

    // ############### CONTACT FORM EMAILS ###############
    /**
     * Send an email with the contact form
     *
     * @async
     * @method sendContactForm
     * @memberof EmailController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public sendContactForm = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { firstName, lastName, phone, email, message } = req.body

            const templatePath = `${process.cwd()}/src/templates/contact-form.mjml`
            const templateData = {
                firstName: capitalize(xss(firstName.trim())),
                lastName: capitalize(xss(lastName.trim())),
                phone: xss(phone.trim()),
                email: xss(email.trim()),
                message: xss(message.trim()),
            }

            const html = await this.generateEmailHTML(templatePath, templateData)

            const mailOptions: Mail.Options = {
                from: process.env.GMAIL_EMAIL,
                to: process.env.PERSONAL_EMAIL,
                subject: `${templateData.firstName} ${templateData.lastName} essaye de te contacter !`,
                html,
                attachments: this.attachments,
            }

            await this.sendEmailWithTransporter(mailOptions)
        }, 'Message sent successfully')
    }

    // ############### APPOINTMENT EMAILS ###############
    /**
     * Send an email with the appointment request
     *
     * @async
     * @method sendAppointmentRequest
     * @memberof EmailController
     * @param {Appointment} appointmentInfo - The appointment information
     * @param {string} clientEmail - The email of the client
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendAppointmentRequest(appointmentInfo: Appointment, clientEmail: string): Promise<void> {
        const templatePath = `${process.cwd()}/src/templates/appointment-reservation.mjml`

        const templateData = {
            firstName: capitalize(appointmentInfo.client?.first_name as string),
            lastName: capitalize(appointmentInfo.client?.last_name as string),
            date: appointmentInfo.date, 
            time: appointmentInfo.time.slice(0, 5), 
            isAway: appointmentInfo.is_away,
            address: appointmentInfo.client?.address + ', ' + appointmentInfo.client?.postal_code + ' ' + appointmentInfo.client?.city, 
            service: appointmentInfo.service?.name, 
            duration: appointmentInfo.service?.duration, 
            price: appointmentInfo.service?.price
        }

        const html = await this.generateEmailHTML(templatePath, templateData)

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: clientEmail,
            subject: 'Récapitulatif de votre rendez-vous',
            html, 
            attachments: this.attachments,
        }

        await this.sendEmailWithTransporter(mailOptions)
    }

    /**
     * Send an email with the appointment request to the admin
     *
     * @async
     * @method sendAppointmentRequestToAdmin
     * @memberof EmailController
     * @param {Appointment} appointmentInfo - The appointment information
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendAppointmentRequestToAdmin(appointmentInfo: Appointment): Promise<void> {
        const templatePath = `${process.cwd()}/src/templates/appointment-reservation-admin.mjml`
        const templateData = {
            firstName: capitalize(appointmentInfo.client?.first_name as string),
            lastName: capitalize(appointmentInfo.client?.last_name as string),
            date: appointmentInfo.date, 
            time: appointmentInfo.time.slice(0, 5), 
            isAway: appointmentInfo.is_away,
            address: appointmentInfo.client?.address + ', ' + appointmentInfo.client?.postal_code + ' ' + appointmentInfo.client?.city, 
            service: appointmentInfo.service?.name, 
            duration: appointmentInfo.service?.duration, 
            price: appointmentInfo.service?.price, 
            confirmUrl: `${process.env.CLIENT_URL}/admin/appointments/update/${appointmentInfo.id}`,
        }

        const html = await this.generateEmailHTML(templatePath, templateData)

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: process.env.PERSONAL_EMAIL,
            subject: 'Nouveau rendez-vous',
            html, 
            attachments: this.attachments,
        }

        await this.sendEmailWithTransporter(mailOptions)
    }

    /**
     * Send an email with the appointment confirmation
     *
     * @async
     * @method sendAppointmentConfirmation
     * @memberof EmailController
     * @param {Appointment} appointmentInfo - The appointment information
     * @param {string} clientEmail - The email of the client
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendAppointmentConfirmation(appointmentInfo: Appointment, clientEmail: string): Promise<void> {
        const templatePath = `${process.cwd()}/src/templates/appointment-confirmation.mjml`
        const templateData = {
            firstName: capitalize(appointmentInfo.client?.first_name as string),
            lastName: capitalize(appointmentInfo.client?.last_name as string), 
            date: appointmentInfo.date,
            time: appointmentInfo.time.slice(0, 5),
        }

        const html = await this.generateEmailHTML(templatePath, templateData)

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: clientEmail,
            subject: 'Confirmation de votre rendez-vous',
            html, 
            attachments: this.attachments,
        }

        await this.sendEmailWithTransporter(mailOptions)
    }

    /**
     * Send an email with the appointment reminder
     *
     * @async
     * @method sendAppointmentReminder
     * @memberof EmailController
     * @param {Appointment} appointmentInfo - The appointment information
     * @param {string} clientEmail - The email of the client
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendAppointmentReminder(appointmentInfo: Appointment, clientEmail: string): Promise<void> {
        const templatePath = `${process.cwd()}/src/templates/appointment-reminder.mjml`
        const templateData = {
            firstName: capitalize(appointmentInfo.client?.first_name as string),
            lastName: capitalize(appointmentInfo.client?.last_name as string),
            date: appointmentInfo.date, 
            time: appointmentInfo.time.slice(0, 5), 
            isAway: appointmentInfo.is_away,
            address: appointmentInfo.client?.address + ', ' + appointmentInfo.client?.postal_code + ' ' + appointmentInfo.client?.city, 
            service: appointmentInfo.service?.name, 
            duration: appointmentInfo.service?.duration, 
            price: appointmentInfo.service?.price
        }

        const html = await this.generateEmailHTML(templatePath, templateData)

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: clientEmail,
            subject: 'Rappel de rendez-vous',
            html, 
            attachments: this.attachments,
        }

        await this.sendEmailWithTransporter(mailOptions)
    }

    /**
     * Send an email with the updated appointment
     *
     * @async
     * @method sendAppointmentUpdate
     * @memberof EmailController
     * @param {Appointment} appointmentInfo - The appointment information
     * @param {string} clientEmail - The email of the client
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendAppointmentUpdate(appointmentInfo: Appointment, clientEmail: string): Promise<void> {
        const templatePath = `${process.cwd()}/src/templates/appointment-update.mjml`
        const templateData = {
            firstName: capitalize(appointmentInfo.client?.first_name as string),
            lastName: capitalize(appointmentInfo.client?.last_name as string),
            date: appointmentInfo.date, 
            time: appointmentInfo.time.slice(0, 5), 
            isAway: appointmentInfo.is_away,
            address: appointmentInfo.client?.address + ', ' + appointmentInfo.client?.postal_code + ' ' + appointmentInfo.client?.city, 
            service: appointmentInfo.service?.name, 
            duration: appointmentInfo.service?.duration, 
            price: appointmentInfo.service?.price
        }

        const html = await this.generateEmailHTML(templatePath, templateData)

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: clientEmail,
            subject: 'Modification de votre rendez-vous',
            html, 
            attachments: this.attachments,
        }

        await this.sendEmailWithTransporter(mailOptions)
    }

    /**
     * Send an email with the appointment cancellation
     *
     * @async
     * @method sendAppointmentCancellation
     * @memberof EmailController
     * @param {Appointment} appointmentInfo - The appointment information
     * @param {string} clientEmail - The email of the client
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendAppointmentCancellation(appointmentInfo: Appointment, clientEmail: string): Promise<void> {
        const templatePath = `${process.cwd()}/src/templates/appointment-cancel.mjml`
        const templateData = {
            firstName: capitalize(appointmentInfo.client?.first_name as string),
            lastName: capitalize(appointmentInfo.client?.last_name as string),
            date: appointmentInfo.date, 
            time: appointmentInfo.time.slice(0, 5), 
            rescheduleLink: `${process.env.CLIENT_URL}/appointment/service`
        }

        const html = await this.generateEmailHTML(templatePath, templateData)

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: clientEmail,
            subject: 'Annulation de votre rendez-vous',
            html, 
            attachments: this.attachments,
        }

        await this.sendEmailWithTransporter(mailOptions)
    }

    // ############### CAPTCHA ###############
    /**
     * Verify the CAPTCHA
     *
     * @async
     * @method verifyCAPTCHA
     * @memberof EmailController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @returns {Promise<void>} A promise that resolves with the CAPTCHA verification result
     */
    public async verifyCAPTCHA(req: Request, res: Response): Promise<void> {
        const { captcha } = req.body

        const secretKey = process.env.RECAPTCHA_SECRET_KEY
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`

        await fetch(url, {
            method: 'POST',
        })
            .then((response) => response.json())
            .then((data: any) => {
                if (data.success) {
                    res.status(200).json({
                        success: true,
                        msg: 'CAPTCHA verification successful',
                        data: data,
                    })
                } else {
                    throw new CustomAPIError('CAPTCHA verification failed', 400)
                }
            })
            .catch((error) => {
                res.status(error.statusCode).json({
                    success: false,
                    error: error.message,
                })
            })
    }
}