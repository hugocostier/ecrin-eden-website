import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/async.js';
import { ServiceService } from '../services/service.service.js';

class ServiceController {
    private _serviceService = new ServiceService

    // Get all services
    public getAllServices = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
        const services = await this._serviceService.getAllServices() 
    
        res.status(200).json({ 
            success: true, 
            data: services
        })
    })

    // Get a service 
    public getService = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id: serviceId } = req.params

        const service = await this._serviceService.getService(serviceId) 

        res.status(200).json({ 
            success: true, 
            data: service
        })
    }) 
    
    // Add a service 
    public addService = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const {
            name, 
            duration, 
            price
        } = req.body

        const service = await this._serviceService.addService({
            name, 
            duration, 
            price
        })

        res.status(201).json({ 
            success: true, 
            data: service, 
            msg: 'Service created successfully'
        })
    }) 

    // Update a service 
    public updateService = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id: serviceId } = req.params

        const service = await this._serviceService.updateService(serviceId, req.body)

        res.status(200).json({ 
            success: true, 
            data: service, 
            msg: 'Service updated successfully'
        })
    })

    // Delete a service 
    public deleteService = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id: serviceId } = req.params
        
        const service = await this._serviceService.deleteService(serviceId)

        res.status(200).json({ 
            success: true, 
            data: service, 
            msg: 'Service deleted successfully'
        })
    }) 
}

export default new ServiceController()