import express, { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import ServiceController from '../controllers/service.controller.js'

const router: Router = express.Router() 

const serviceController = new ServiceController()
const authController: AuthController = new AuthController()

router.route('/')
    .get(serviceController.getAllServices)
    .post(authController.isAdmin, serviceController.addService)

router.route('/:id')
    .get(serviceController.getService) 
    .patch(authController.isAdmin, serviceController.updateService)
    .delete(authController.isAdmin, serviceController.deleteService)

export default router 
