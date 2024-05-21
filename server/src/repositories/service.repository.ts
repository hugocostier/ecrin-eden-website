import Service from '../entities/Service.entity.js'
import BaseRepository from './base.repository.js'

/**
 * The `ServiceRepository` class extends the `BaseRepository` class and adds custom requests for service data.
 * 
 * @class ServiceRepository
 * @extends BaseRepository
 */
export class ServiceRepository extends BaseRepository {
    /**
     * Initializes the data source and returns an extended repository with custom requests for service data.
     * 
     * @async
     * @method extendServiceRepository
     * @memberof ServiceRepository
     * @throws {Error} If there is an error extending the service repository.
     * @returns The extended service repository.
     */
    public async extendServiceRepository() {
        try { 
            await this.initializeDataSource() 
            return this.serviceRepository()
        } catch (error: any) {
            console.error('Error extending service repository: ', error)
            throw new Error(error)
        }
    }
    
    /**
     * Adds custom requests to the service repository.
     * 
     * @method serviceRepository
     * @memberof ServiceRepository
     * @returns The extended service repository.
     */    
    private async serviceRepository() {
        return this.dataSource.getRepository(Service).extend({
            /**
             * Finds a service by its id and returns its data.
             * 
             * @async
             * @method findById
             * @memberof serviceRepository
             * @param {number} id - The id of the service to find.
             * @returns {Promise<Service | null>} The service data or null if the service is not found.
             */
            async findById(id: number): Promise<Service | null> {
                return await this.findOneBy({ id })
            }
        })
    }
}