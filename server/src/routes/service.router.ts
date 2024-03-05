import express from 'express'
import auth from '../controllers/auth.controller.js'
import serviceController from '../controllers/service.controller.js'
import { Service } from '../entities/Service.js'
import { validationMiddleware } from '../middlewares/validation.js'

const router = express.Router() 

router.route('/')
    .get(serviceController.getAllServices)
    .post(auth.isAdmin, validationMiddleware(Service), serviceController.addService)

router.route('/:id')
    .get(serviceController.getService) 
    .patch(auth.isAdmin, validationMiddleware(Service), serviceController.updateService)
    .delete(auth.isAdmin, serviceController.deleteService)

export default router 
