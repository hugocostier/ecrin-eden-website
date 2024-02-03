import { Service } from '../entities/Service.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import { ServiceRepository } from '../repositories/service.repository.js'

export class ServiceService {
    private _serviceRepository= ServiceRepository

    async getAllServices() {
        const allServices = await this._serviceRepository.find() 

        if (!allServices || allServices.length === 0) {
            throw new CustomAPIError('No services found', 404)
        }

        return allServices
    }

    async getService(id: string) {
        const service = await this._serviceRepository.findById(parseInt(id)) 

        if (!service) {
            throw new CustomAPIError(`No service found with id ${id}`, 404)
        }

        return service 
    }

    async addService(serviceData: Partial<Service>) {        
        if (!serviceData.name || !serviceData.duration || !serviceData.price) {
            throw new CustomAPIError('Please provide the service\'s name, price and duration', 400)
        }

        const service = await this._serviceRepository.create(serviceData).save()

        if (!service) {
            throw new CustomAPIError('Service could not be created', 500)
        }

        return service 
    }

    async updateService(id: string, serviceData: Partial<Service>) {
        const service = await this._serviceRepository.update(id, serviceData) 

        if (!service) {
            throw new CustomAPIError(`Service with id ${id} could not be updated`, 500)
        }

        return service 
    }

    async deleteService(id: string) {
        const service = await this._serviceRepository.delete(id) 

        if (!service) {
            throw new CustomAPIError(`Service with id ${id} could not be deleted`, 500)
        }

        return service
    }
}