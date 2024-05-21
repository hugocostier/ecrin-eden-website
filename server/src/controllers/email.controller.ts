import { Request, Response } from 'express'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js'

/**
 * Controller for sending emails 
 * 
 * @class EmailController
 * @property {nodemailer.Transporter<SMTPTransport.SentMessageInfo>} _transporter - The transporter used to send emails
 */
export default class EmailController {
    private _transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    })

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
        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: 'Vérification de l\'adresse email',
            text: `Cliquez sur ce lien pour vérifier votre adresse email : ${process.env.CLIENT_URL}/login/verify-email?token=${token}&email=${email}`
        }

        await this.sendEmailWithTransporter(mailOptions)
    }
    
    /**
     * Send an email with a reset password link
     * 
     * @async
     * @method sendResetPasswordLink
     * @memberof EmailController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendResetPasswordLink(req: Request, res: Response): Promise<void> {
        const { email, token } = req.body

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: 'Réinitialisation du mot de passe',
            text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${process.env.CLIENT_URL}/api/v1/email/reset-password?token=${token}`
        }

        await this.sendEmailWithTransporter(mailOptions)
            .then((info) => {
                res.status(200).json({
                    message: 'Email sent successfully'
                })
            })
            .catch((error) => {
                res.status(500).json({
                    error: error, 
                    message: 'Error while sending the email'
                })
            })
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
        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: 'Réinitialisation du mot de passe',
            text: `Votre code OTP est ${otp}`
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
    public async sendContactForm(req: Request, res: Response): Promise<void> {
        const { firstName, lastName, phone, email, message } = req.body

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: process.env.PERSONAL_EMAIL, 
            subject: `${firstName} ${lastName} essaye de te contacter !`,
            text: `
                Prénom : ${firstName} \n 
                Nom : ${lastName} \n 
                Téléphone : ${phone} \n 
                Adresse email : ${email} \n 
                Message : ${message}
            `
        }

        await this.sendEmailWithTransporter(mailOptions)
            .then((info) => {
                res.status(200).json({
                    message: 'Message sent successfully'
                })
            })
            .catch((error) => {
                res.status(500).json({
                    error: error, 
                    message: 'Error while sending the email'
                })
            })
    }


    // ############### APPOINTMENT EMAILS ###############
    /**
     * Send an email with the appointment confirmation
     * 
     * @async
     * @method sendAppointmentConfirmation
     * @memberof EmailController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendAppointmentConfirmation(req: Request, res: Response): Promise<void> {
        const { firstName, lastName, email, date, time } = req.body

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: 'Confirmation de rendez-vous',
            text: `
                Bonjour ${firstName} ${lastName}, \n 
                Nous vous confirmons votre rendez-vous le ${date} à ${time}. \n 
                Merci de votre confiance. \n 
                À bientôt !
            `
        }

        await this.sendEmailWithTransporter(mailOptions)
            .then((info) => {
                res.status(200).json({
                    message: 'Email sent successfully'
                })
            })
            .catch((error) => {
                res.status(500).json({
                    error: error, 
                    message: 'Error while sending the email'
                })
            })
    }

    /**
     * Send an email with the appointment reminder
     * 
     * @async
     * @method sendAppointmentReminder
     * @memberof EmailController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendAppointmentReminder(req: Request, res: Response): Promise<void> {
        const { firstName, lastName, email, date, time } = req.body

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: 'Rappel de rendez-vous',
            text: `
                Bonjour ${firstName} ${lastName}, \n 
                Nous vous rappelons votre rendez-vous le ${date} à ${time}. \n 
                Merci de votre confiance. \n 
                À bientôt !
            `
        }

        await this.sendEmailWithTransporter(mailOptions)
            .then((info) => {
                res.status(200).json({
                    message: 'Email sent successfully'
                })
            })
            .catch((error) => {
                res.status(500).json({
                    error: error, 
                    message: 'Error while sending the email'
                })
            })
    }

    /**
     * Send an email with the updated appointment
     * 
     * @async
     * @method sendUpdatedAppointment
     * @memberof EmailController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendUpdatedAppointment(req: Request, res: Response): Promise<void> {
        const { firstName, lastName, email, date, time } = req.body

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: 'Modification de rendez-vous',
            text: `
                Bonjour ${firstName} ${lastName}, \n 
                Nous vous confirmons la modification de votre rendez-vous le ${date} à ${time}. \n 
                Merci de votre compréhension. \n 
                À bientôt !
            `
        }

        await this.sendEmailWithTransporter(mailOptions)
            .then((info) => {
                res.status(200).json({
                    message: 'Email sent successfully'
                })
            })
            .catch((error) => {
                res.status(500).json({
                    error: error, 
                    message: 'Error while sending the email'
                })
            })
    }

    /**
     * Send an email with the appointment cancellation
     * 
     * @async
     * @method sendAppointmentCancellation
     * @memberof EmailController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @returns {Promise<void>} A promise that resolves when the email is sent
     */
    public async sendAppointmentCancellation(req: Request, res: Response): Promise<void> {
        const { firstName, lastName, email, date, time } = req.body

        const mailOptions: Mail.Options = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: 'Annulation de rendez-vous',
            text: `
                Bonjour ${firstName} ${lastName}, \n 
                Nous vous confirmons l'annulation de votre rendez-vous le ${date} à ${time}. \n 
                Merci de votre compréhension. \n 
                À bientôt !
            `
        }

        await this.sendEmailWithTransporter(mailOptions)
            .then((info) => {
                res.status(200).json({
                    message: 'Email sent successfully'
                })
            })
            .catch((error) => {
                res.status(500).json({
                    error: error, 
                    message: 'Error while sending the email'
                })
            })
    }
}