import nodemailer from 'nodemailer'

class EmailController {
    public sendResetPasswordOTP = (email: string, otp: string) => {
        return new Promise((resolve, reject) => {
            // Create a transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_EMAIL,
                    pass: process.env.GMAIL_PASSWORD
                }
            })

            // Create an email
            const mailOptions = {
                from: process.env.GMAIL_EMAIL,
                to: email,
                subject: 'RESET PASSWORD OTP',
                text: `Your OTP is ${otp}`
            }

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(info)
                }
            })
        }) 
    }
}

export default new EmailController()