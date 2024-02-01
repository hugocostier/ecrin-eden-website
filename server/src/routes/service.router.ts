import express from 'express'
import serviceController from '../controllers/service.controller.js'
import { Service } from '../entities/Service.js'
import { validationMiddleware } from '../middlewares/validation.js'

const router = express.Router() 

router.route('/')
    .get(serviceController.getAllServices)
    .post(validationMiddleware(Service), serviceController.addService)

router.route('/:id')
    .get(serviceController.getService) 
    .patch(validationMiddleware(Service), serviceController.updateService)
    .delete(serviceController.deleteService)

export default router 
