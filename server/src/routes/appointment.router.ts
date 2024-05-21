import express, { Router } from 'express'
import AppointmentController from '../controllers/appointment.controller.js'
import AuthController from '../controllers/auth.controller.js'

const router: Router = express.Router() 

const appointmentController: AppointmentController = new AppointmentController()
const authController: AuthController = new AuthController() 

router.route('/')
    .post(authController.isAdmin, appointmentController.getAppointments)

router.route('/add')
    .post(appointmentController.addAppointment)

router.route('/:id')
    .get(authController.isLoggedIn, authController.isAuthorized, appointmentController.getAppointmentById)
    .patch(authController.isLoggedIn, authController.isAuthorized, appointmentController.updateAppointment)
    .delete(authController.isLoggedIn, authController.isAuthorized, appointmentController.deleteAppointment)

router.route('/client/:id') 
    .post(authController.isLoggedIn, authController.isAuthorized, appointmentController.getAppointmentsByClient)

router.route('/service/:id')
    .get(authController.isLoggedIn, authController.isAuthorized, appointmentController.getAppointmentsByService)

router.route('/count')
    .post(authController.isLoggedIn, authController.isAuthorized, appointmentController.countAppointmentsForDay)

router.route('/count/:id')
    .post(authController.isLoggedIn, authController.isAuthorized, appointmentController.countAppointmentsForWeekAndClient)


export default router 