import express from 'express'
import appointment from '../controllers/appointment.controller.js'
import auth from '../controllers/auth.controller.js'
import { Appointment } from '../entities/Appointment.js'
import { validationMiddleware } from '../middlewares/validation.js'

const router = express.Router() 

router.route('/')
    .get(auth.isAdmin, appointment.getAppointments)
    .post(validationMiddleware(Appointment), appointment.addAppointment)

router.route('/:id')
    .get(auth.isLoggedIn, auth.isAuthorized, appointment.getAppointmentById)
    .patch(auth.isLoggedIn, auth.isAuthorized, validationMiddleware(Appointment), appointment.updateAppointment)
    .delete(auth.isLoggedIn, auth.isAuthorized, appointment.deleteAppointment)

router.route('/client/:clientId') 
    .get(auth.isAdmin, appointment.getAppointmentsByClient)

router.route('/service/:serviceId')
    .get(auth.isLoggedIn, auth.isAuthorized, appointment.getAppointmentsByService)

router.route('/count')
    .get(auth.isLoggedIn, auth.isAuthorized, appointment.countAppointmentsForDay)

router.route('/count/:clientId')
    .get(auth.isLoggedIn, auth.isAuthorized, appointment.countAppointmentsForWeekAndClient)

export default router 