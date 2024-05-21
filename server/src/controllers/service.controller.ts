import { Request, Response } from 'express'
import Service from '../entities/Service.entity.js'
import { ServiceService } from '../services/service.service.js'
import BaseController from './base.controller.js'

/**
 * Controller for services
 * 
 * @class ServiceController
 * @extends BaseController
 * @property {ServiceService} _serviceService - Instance of ServiceService
 */
export default class ServiceController extends BaseController {
    public _serviceService: ServiceService = new ServiceService() 

    /**
     * Get all services
     * 
     * @method getAllServices
     * @memberof ServiceController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the services are returned.
     */
    public getAllServices = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            return await this._serviceService.getAllServices()
        })
    }

    /**
     * Get a service
     * 
     * @method getService
     * @memberof ServiceController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the service is returned.
     */
    public getService = async (req: Request, res: Response): Promise<void> => {        
        await this.handleRequest(req, res, async () => {
            const { id: serviceId } = req.params

            return await this._serviceService.getService(serviceId)
        }) 
    }
    
    /**
     * Add a service
     * 
     * @method addService
     * @memberof ServiceController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the service is added.
     */
    public addService = async (req: Request, res: Response): Promise<void> => {        
        await this.handleRequest(req, res, async () => {
            const validRequestBody: Partial<Service> = this.filterRequestBody(req.body, Service)

            return await this._serviceService.addService(validRequestBody)
        }, 'Service created successfully', 201)
    } 

    /**
     * Update a service
     * 
     * @method updateService
     * @memberof ServiceController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the service is updated.
     */
    public updateService = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { id: serviceId } = req.params
    
            const validRequestBody: Partial<Service> = this.filterRequestBody(req.body, Service)
            
            return await this._serviceService.updateService(serviceId, validRequestBody)
        }, 'Service updated successfully')
    }

    /**
     * Delete a service
     * 
     * @method deleteService
     * @memberof ServiceController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the service is deleted.
     */
    public deleteService = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { id: serviceId } = req.params

            return await this._serviceService.deleteService(serviceId)
        }, 'Service deleted successfully', 204)
    } 
}