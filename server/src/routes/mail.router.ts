import express, { Router } from 'express'
import EmailController from '../controllers/email.controller.js'

const router: Router = express.Router() 

const emailController: EmailController = new EmailController()

router.post('/send-contact-form', emailController.sendContactForm)

export default router