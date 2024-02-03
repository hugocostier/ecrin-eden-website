import express from 'express'
import appointment from '../controllers/appointment.controller.js'
import { Appointment } from '../entities/Appointment.js'
import { validationMiddleware } from '../middlewares/validation.js'

const router = express.Router() 

router.route('/')
    .get(appointment.getAppointments)
    .post(validationMiddleware(Appointment), appointment.addAppointment)

router.route('/:id')
    .get(appointment.getAppointmentById)
    .patch(validationMiddleware(Appointment), appointment.updateAppointment)
    .delete(appointment.deleteAppointment)

router.route('/client/:clientId') 
    .get(appointment.getAppointmentsByClient)

router.route('/service/:serviceId')
    .get(appointment.getAppointmentsByService)

router.route('/count')
    .get(appointment.countAppointmentsForDay)

router.route('/count/:clientId')
    .get(appointment.countAppointmentsForWeekAndClient)

export default router 