import Client from '../entities/Client.entity.js'
import BaseRepository from './base.repository.js'

/**
 * The `ClientRepository` class extends the `BaseRepository` class and adds custom requests for retrieving and manipulating client data from the data source.
 * 
 * @class ClientRepository
 * @extends BaseRepository
 */
export class ClientRepository extends BaseRepository {
    /**
     * Initializes the data source and returns an extended repository with custom requests for client data.
     * 
     * @async
     * @method extendClientRepository
     * @memberof ClientRepository
     * @throws {Error} If there is an error extending  the client repository.
     * @returns The extended client repository.
     */
    public async extendClientRepository() {
        try {
            await this.initializeDataSource()
            return this.clientRepository()
        } catch (error: any) {
            console.error('Error extending client repository: ', error)
            throw new Error(error)
        }
    }
    
    /**
     * Adds custom requests to the client repository.
     * 
     * @method clientRepository
     * @memberof ClientRepository
     * @returns The extended client repository.
     */
    private clientRepository() {
        return this.dataSource.getRepository(Client).extend({
            /**
             * Finds a client by their id and returns their data.
             * 
             * @async
             * @method findById
             * @memberof clientRepository
             * @param {string} id - The id of the client to find.
             * @returns {Promise<Client | null>} The client data or null if the client is not found.
             */
            async findById(id: string): Promise<Client | null> {
                return this.findOneBy({ id })
            }, 

            /**
             * Finds a client by their first and last name and returns their data.
             * 
             * @async
             * @method findByName
             * @memberof clientRepository
             * @param {string} first_name - The first name of the client to find.
             * @param {string} last_name - The last name of the client to find.
             * @returns {Promise<Client | null>} The client data or null if the client is not found.
             */
            async findByName(first_name: string, last_name: string): Promise<Client | null> {
                return this.findOneBy({ first_name, last_name })
            }, 

            /**
             * Finds a client by their user id and returns their data.
             * 
             * @async
             * @method findByUser
             * @memberof clientRepository
             * @param {string} user_id - The user id of the client to find.
             * @returns {Promise<Client | null>} The client data or null if the client is not found.
             */
            async findByUser(user_id: string): Promise<Client | null> {
                return this.findOneBy({ user: { id: user_id } })
            },

            /**
             * Finds a client by their id and returns their data with the associated user data.
             * 
             * @async
             * @method getClientWithUser
             * @memberof clientRepository
             * @param {string} id - The id of the client to find.
             * @returns {Promise<Client | null>} The client data with the associated user data or null if the client is not found.
             */
            async getClientWithUser(id: string): Promise<Client | null> {
                return this.createQueryBuilder('client') 
                    .leftJoin('client.user', 'user')
                    .select([
                        'client.id',
                        'client.first_name',
                        'client.last_name',
                        'client.phone_number',
                        'client.birth_date',
                        'client.address',
                        'client.postal_code',
                        'client.city',
                        'client.shared_notes',
                        'client.private_notes',
                        'client.profile_picture', 
                        'user.id', 
                        'user.email', 
                    ])
                    .where('client.id = :id', { id })
                    .getOne()
            }, 

            /**
             * Finds a client by their id and returns their personal information.
             * 
             * @async
             * @method getPersonalInfo
             * @memberof clientRepository
             * @param {string} id - The id of the client to find.
             * @returns {Promise<Client | null>} The client's personal information or null if the client is not found.
             */
            async getPersonalInfo(id: string): Promise<Client | null> {
                return this.createQueryBuilder('client') 
                    .select([
                        'client.first_name', 
                        'client.last_name', 
                        'client.phone_number', 
                        'client.birth_date', 
                        'client.address', 
                        'client.postal_code', 
                        'client.city', 
                        'client.shared_notes',
                        'client.profile_picture'
                    ])
                    .where('client.id = :id', { id })
                    .getOne()
            }
        })
    }
}