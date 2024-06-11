import express, { Router } from 'express'
import AppointmentController from '../controllers/appointment.controller.js'
import AuthController from '../controllers/auth.controller.js'

const router: Router = express.Router() 

const appointmentController: AppointmentController = new AppointmentController()
const authController: AuthController = new AuthController() 

router.route('/')
    .post(appointmentController.getAppointments)

router.route('/add')
    .post(appointmentController.addAppointment)

router.route('/:id')
    .get(authController.isLoggedIn, appointmentController.getAppointmentById)
    .patch(authController.isLoggedIn, appointmentController.updateAppointment)
    .delete(authController.isLoggedIn, appointmentController.deleteAppointment)

router.route('/client/:id') 
    .post(authController.isLoggedIn, appointmentController.getAppointmentsByClient)

router.route('/service/:id')
    .get(authController.isAdmin, appointmentController.getAppointmentsByService)

router.route('/count')
    .post(authController.isAdmin, appointmentController.countAppointmentsForDay)

router.route('/count/:id')
    .post(authController.isLoggedIn, appointmentController.countAppointmentsForWeekAndClient)


export default router 