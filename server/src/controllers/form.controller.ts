import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

class FormController {
    async sendContactForm(req: Request, res: Response) {
        const { firstName, lastName, phone, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hugo.costier@gmail.com', 
                pass: 'Hugo5002c'
            }
        })

        const mailOptions = {
            from: email,
            to: 'hugo.costier@icloud.com', 
            subject: `${firstName} ${lastName} essaye de te contacter !`,
            text: `
                Prénom : ${firstName} \n 
                Nom : ${lastName} \n 
                Téléphone : ${phone} \n 
                Adresse email : ${email} \n 
                Message : ${message}
            `
        }
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({
                    message: 'Erreur lors de l\'envoi du message'
                });
                console.log(error);
            } else {
                res.status(200).json({
                    message: 'Message envoyé avec succès'
                });
            }
        });
    }
}

export default new FormController();