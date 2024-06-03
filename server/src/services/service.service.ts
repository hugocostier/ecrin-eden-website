import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import Appointment from '../entities/Appointment.entity.js'
import Service from '../entities/Service.entity.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import { ServiceRepository } from '../repositories/service.repository.js'
import BaseService from './base.service.js'

/**
 * Service for handling services
 * 
 * @class ServiceService
 * @extends BaseService
 * @property {ServiceRepository} _customRepository - Instance of the custom repository for services
 * @property {Repository<Service> & { findById(id: number): Promise<Service | null>; }} _serviceRepository - The extended service repository
 */
export class ServiceService extends BaseService {
    private _customRepository: ServiceRepository = new ServiceRepository()
    private _serviceRepository!: Repository<Service> & {
        findById(id: number): Promise<Service | null>
    }

    /**
     * Extends the service repository by assigning the result of the 'extendServiceRepository' method to the '_serviceRepository' property
     * 
     * @async
     * @method extendServiceRepository
     * @memberof ServiceService
     * @throws {Error} If there is an error extending the service repository
     * @returns {Promise<void>} A promise that resolves if the service repository is successfully extended
     */
    private async extendServiceRepository(): Promise<void> {
        try {
            this._serviceRepository = await this._customRepository.extendServiceRepository()
        } catch(error: any) {
            console.error('Error extending service repository: ', error)
            throw new Error(error)
        }
    }

    /**
     * Retrieves all services
     * 
     * @async
     * @method getAllServices
     * @memberof ServiceService
     * @throws {CustomAPIError} If there is an error getting the services
     * @returns {Promise<Service[]>} A promise that resolves with all services
     */
    public async getAllServices(): Promise<Service[]> {
        if (!this._serviceRepository) {
            await this.extendServiceRepository()
        }

        try {
            return await this._serviceRepository.find() 
        } catch (error: any) {
            console.error('Error getting services: ', error)
            throw new CustomAPIError('Error getting services', 500)
        }
    }

    /**
     * Retrieves a service by id
     * 
     * @async
     * @method getService
     * @memberof ServiceService
     * @param {string} id - The id of the service
     * @throws {CustomAPIError} If no service is found with the provided id or if there is an error getting the service
     * @returns {Promise<Service>} A promise that resolves with the service
     */
    public async getService(id: string): Promise<Service> {
        if (!this._serviceRepository) {
            await this.extendServiceRepository()
        }

        try {
            const service: Service | null = await this._serviceRepository.findById(parseInt(id)) 
                .catch((error: any) => {
                    console.error('Error getting service: ', error)
                    throw new CustomAPIError('Error getting service', 500)
                })

            if (!service) {
                throw new CustomAPIError(`No service found with id ${id}`, 404)
            }

            return service 
        } catch (error: any) {
            throw error 
        }
    }

    /**
     * Adds a new service
     * 
     * @async
     * @method addService
     * @memberof ServiceService
     * @param {Partial<Service>} serviceData - The data for the new service
     * @throws {CustomAPIError} If the service's name, price or duration is not provided, or if the service could not be created
     * @returns {Promise<Service>} A promise that resolves with the newly added service
     */
    public async addService(serviceData: Partial<Service>): Promise<Service> {  
        if (!this._serviceRepository) {
            await this.extendServiceRepository()
        }

        try {
            await this.validateEntity(serviceData, Service)
         
            return await this._serviceRepository.save(serviceData)
                .catch((error: any) => {
                    console.error('Error adding service: ', error)
                    throw new CustomAPIError('Service could not be added', 500)
                }) 
        } catch (error: any) {
            throw error 
        }
    }

    /**
     * Updates a service
     * 
     * @async
     * @method updateService
     * @memberof ServiceService
     * @param {string} id - The id of the service
     * @param {Partial<Service>} serviceData - The data to update the service
     * @throws {CustomAPIError} If the service could not be updated or if the service doesn't exist
     * @returns {Promise<UpdateResult>} A promise that resolves with the result of the update operation
     */
    public async updateService(id: string, serviceData: Partial<Service>): Promise<UpdateResult> {
        if (!this._serviceRepository) {
            await this.extendServiceRepository()
        }

        try {
            await this.validateEntity(serviceData, Service)

            return this._serviceRepository.manager.transaction(async transactionalEntityManager => {    
                if (!await this.checkIfServiceExists(id)) {
                    throw new CustomAPIError(`Service with id ${id} doesn't exists`, 404)
                }

                return await transactionalEntityManager.update(Service, parseInt(id), serviceData)
                    .catch((error: any) => {
                        console.error('Error updating service: ', error)
                        throw new CustomAPIError(`Service with id ${id} could not be updated`, 500)
                    }) 
            }) 
        } catch (error: any) {
            throw error 
        }
    }

    /**
     * Deletes a service
     * 
     * @async
     * @method deleteService
     * @memberof ServiceService
     * @param {string} id - The id of the service
     * @throws {CustomAPIError} If the service could not be deleted, if the service is associated with appointments, or if the service doesn't exist
     * @returns {Promise<DeleteResult>} A promise that resolves with the result of the delete operation
     */
    public async deleteService(id: string): Promise<DeleteResult> {
        if (!this._serviceRepository) {
            await this.extendServiceRepository()
        }
        
        try {
            return await this._serviceRepository.manager.transaction(async transactionalEntityManager => {
                if (!await this.checkIfServiceExists(id)) {
                    throw new CustomAPIError(`Service with id ${id} doesn't exists`, 404)
                }

                const appointments: Appointment[] = await transactionalEntityManager.find(Appointment, { where: { service: { id: parseInt(id) } } })
                    .catch((error: any) => {
                        console.error('Error finding appointments: ', error)
                        throw new CustomAPIError('Error finding appointments', 500)
                    }) 

                if (appointments.length > 0) {
                    throw new CustomAPIError(`Service with id ${id} is associated with appointments and cannot be deleted`, 400)
                }

                return await transactionalEntityManager.delete(Service, parseInt(id))
                    .catch((error: any) => {
                        console.error('Error deleting service: ', error)
                        throw new CustomAPIError(`Service with id ${id} could not be deleted`, 500)
                    })
            }) 
        } catch (error: any) {
            throw error
        }
    }

    /**
     * Checks if a service exists
     * 
     * @async
     * @method checkIfServiceExists
     * @memberof ServiceService
     * @param {string} id - The id of the service
     * @throws {CustomAPIError} If there is an error checking if the service exists
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating if the service exists
     */
    private async checkIfServiceExists(id: string): Promise<boolean> {
        if (!this._serviceRepository) {
            await this.extendServiceRepository()
        }

        try {
            const existingService: number = await this._serviceRepository.countBy({ id: parseInt(id) })

            return existingService > 0
        } catch (error: any) {
            console.error('Error checking if service exists: ', error)
            throw new CustomAPIError('Error checking if service exists', 500)
        }
    }
}