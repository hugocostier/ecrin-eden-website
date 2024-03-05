import express from 'express'
import formController from '../controllers/form.controller.js'

const router = express.Router() 

router.post('/send-contact-form', formController.sendContactForm)

export default router