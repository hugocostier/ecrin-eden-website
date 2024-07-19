import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import Client from '../entities/Client.entity.js'
import Preferences from '../entities/Preferences.entity.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import { ClientRepository } from '../repositories/client.repository.js'
import BaseService from './base.service.js'

/**
 * Service for handling clients
 * 
 * @class ClientService
 * @extends BaseService
 * @property {ClientRepository} _customClientRepository - Instance of the custom repository for clients
 * @property {Repository<Client> & { findAll(): Promise<Client[]>; indById(id: string): Promise<Client | null>; findByName(first_name: string, last_name: string): Promise<Client | null>; findByUser(user_id: string): Promise<Client | null>; getClientWithUser(id: string): Promise<Client | null>; getPersonalInfo(id: string): Promise<Client | null;> }} _clientRepository - The extended client repository
 */
export class ClientService extends BaseService {
    private _customClientRepository: ClientRepository = new ClientRepository()
    private _clientRepository!: Repository<Client> & { 
        findAll(): Promise<Client[]>
        findById(id: string): Promise<Client | null>
        findByName(first_name: string, last_name: string): Promise<Client | null>
        findByUser(user_id: string): Promise<Client | null>
        getClientWithUser(id: string): Promise<Client | null>
        getPersonalInfo(id: string): Promise<Client | null>
    }

    /**
     * Extends the client repository by assigning the result of the 'extendClientRepository' method to the '_clientRepository' property
     * 
     * @async
     * @method extendClientRepository
     * @memberof ClientService
     * @throws {Error} If there is an error extending the client repository
     * @returns {Promise<void>} A promise that resolves if the client repository is successfully extended
     */
    private async extendClientRepository(): Promise<void> {
        try {
            this._clientRepository = await this._customClientRepository.extendClientRepository()
        } catch (error: any) {
            console.error('Error extending client repository: ', error)
            throw new CustomAPIError('Error extending client repository', 500)
        }
    }

    /**
     * Retrieves all clients
     * 
     * @async
     * @method getAllClients
     * @memberof ClientService
     * @throws {CustomAPIError} If there is an error getting the clients
     * @returns {Promise<Client[]>} A promise that resolves with an array of clients
     */
    public async getAllClients(): Promise<Client[]> {
        if (!this._clientRepository) {
            await this.extendClientRepository()
        }
        try {
            return await this._clientRepository.findAll()
        } catch (error: any) {
            console.error('Error getting clients: ', error)
            throw new CustomAPIError('Error getting clients', 500)
        }
    }

    /**
     * Retrieves a client by id
     * 
     * @async
     * @method getClientById
     * @memberof ClientService
     * @param {string} id - The id of the client
     * @throws {CustomAPIError} If no client is found with the provided id or if there is an error getting the client
     * @returns {Promise<Client>} A promise that resolves with the client
     */
    public async getClientById(id: string): Promise<Client> {
        if (!this._clientRepository) {
            await this.extendClientRepository()
        }

        try {        
            const client: Client | null = await this._clientRepository.findById(id)
                .catch((error: any) => {
                    console.error('Error getting client: ', error)
                    throw new CustomAPIError('Error getting client', 500)
                }) 

            if (!client) {
                throw new CustomAPIError(`No client found with id ${id}`, 404)
            }

            return client
        } catch (error: any) {
            throw error 
        }
    }

    /**
     * Retrieves a client with user
     * 
     * @async
     * @method getClientWithUser
     * @memberof ClientService
     * @param {string} id - The id of the client
     * @throws {CustomAPIError} If no client is found with the provided id or if there is an error getting the client
     * @returns {Promise<Client>} A promise that resolves with the client and it's user information
     */
    public async getClientWithUser(id: string): Promise<Client> {
        if (!this._clientRepository) {
            await this.extendClientRepository()
        }

        try {
            const client: Client | null = await this._clientRepository.getClientWithUser(id)
                .catch((error: any) => {
                    console.error('Error getting client with user: ', error)
                    throw new CustomAPIError('Error getting client with user', 500)
                })

            if (!client) {
                throw new CustomAPIError(`No client found with id ${id}`, 404)
            }

            return client
        } catch (error: any) {
            throw error 
        }        
    }

    /**
     * Retrieves a client by name
     * 
     * @async
     * @method getClientByName
     * @memberof ClientService
     * @param {string} first_name - The first name of the client
     * @param {string} last_name - The last name of the client
     * @throws {CustomAPIError} If no client is found with the provided name or if there is an error getting the client
     * @returns {Promise<Client>} A promise that resolves with the client 
     */
    public async getClientByName(first_name: string, last_name: string): Promise<Client> {
        if (!this._clientRepository) {
            await this.extendClientRepository()
        }

        try {
            const client: Client | null = await this._clientRepository.findByName(first_name, last_name)
                .catch((error: any) => {
                    console.error('Error getting client by name: ', error)
                    throw new CustomAPIError('Error getting client by name', 500)
                }) 
            
            if (!client) {
                throw new CustomAPIError(`No client found with name ${first_name} ${last_name}`, 404)
            }
    
            return client 
        } catch (error: any) {
            throw error 
        }        
    }

    /**
     * Retrieves a client by user
     * 
     * @async
     * @method getClientByUser
     * @memberof ClientService
     * @param {string} userId - The id of the user
     * @throws {CustomAPIError} If no client is found with the provided user id or if there is an error getting the client
     * @returns {Promise<Client>} A promise that resolves with the client
     */
    public async getClientByUser(userId: string): Promise<Client> {
        if (!this._clientRepository) {
            await this.extendClientRepository()
        }
        
        try {
            const client: Client | null = await this._clientRepository.findByUser(userId)
                .catch((error: any) => {
                    console.error('Error getting client by user: ', error)
                    throw new CustomAPIError('Error getting client by user', 500)
                })

            if (!client) {
                throw new CustomAPIError(`No client found with user id ${userId}`, 404)
            }

            return client
        } catch (error: any) {
            throw error 
        }        
    }

    /**
     * Retrieves a client's personal information
     * 
     * @async
     * @method getClientPersonalInfo
     * @memberof ClientService
     * @param {string} clientId - The id of the client
     * @throws {CustomAPIError} If no client is found with the provided id, if no personal info is found for the client or if there is an error getting the client's personal information
     * @returns {Promise<Client>} A promise that resolves with the client's personal information
     */
    public async getClientPersonalInfo(clientId: string): Promise<Client> {
        if (!this._clientRepository) {
            await this.extendClientRepository()
        }

        try {
            const client: Client | null = await this._clientRepository.findById(clientId)
            
            if (!client) {
                throw new CustomAPIError(`Client with id ${clientId} doesn't exists`, 404)
            }
    
            const personalInfo: Client | null = await this._clientRepository.getPersonalInfo(clientId)
                .catch((error: any) => {
                    console.error('Error getting client personal info: ', error)
                    throw new CustomAPIError('Error getting client personal info', 500)
                })
    
            if (!personalInfo) {
                throw new CustomAPIError(`No personal info found for client with id ${clientId}`, 404)
            }
    
            return personalInfo
        } catch (error: any) {
            throw error 
        }        
    }

    /**
     * Check if a client exists by name
     * 
     * @async
     * @method isExistingClient
     * @memberof ClientService
     * @param {string} first_name - The first name of the client
     * @param {string} last_name - The last name of the client
     * @throws {CustomAPIError} If there is an error checking if the client exists
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating if the client exists
     */
    public async isExistingClient(first_name: string, last_name: string): Promise<boolean> {
        if (!this._clientRepository) {
            await this.extendClientRepository()
        }

        try {
            const client: Client | null = await this._clientRepository.findByName(first_name, last_name)
                .catch((error: any) => {
                    console.error('Error getting client by name: ', error)
                    throw new CustomAPIError('Error getting client by name', 500)
                }) 
    
            return !!client
        } catch (error: any) {
            throw error 
        }        
    }

    /**
     * Delete personal information for a client
     * 
     * @async
     * @method deletePersonalInfo
     * @memberof ClientService
     * @param {string} id - The id of the client
     * @throws {CustomAPIError} If no client is found with the provided id or if personal info for the client could not be deleted
     * @returns {Promise<UpdateResult>} A promise that resolves with the result of the deletion
     */
    public async deletePersonalInfo(id: string): Promise<UpdateResult> {
        if (!this._clientRepository) {
            await this.extendClientRepository()
        }
        
        try {
            return await this._clientRepository.manager.transaction(async transactionalEntityManager => {
                const clientExists: Client | null = await transactionalEntityManager.findOneBy(Client, { id })
        
                if (!clientExists) {
                    throw new CustomAPIError(`Client with id ${id} doesn't exists`, 404)
                }

                return await transactionalEntityManager.update(Client, id, {
                    phone_number: null, 
                    birth_date: null, 
                    address: null, 
                    postal_code: null, 
                    city: null, 
                    shared_notes: null,
                    profile_picture: null
                }).catch((error: any) => {
                    console.error('Error deleting personal info: ', error)
                    throw new CustomAPIError(`Personal info for client with id ${id} could not be deleted`, 500)
                })
            }) 
        } catch (error: any) {
            throw error 
        }
    }

    /**
     * Create a new client
     * 
     * @async
     * @method createClient
     * @memberof ClientService
     * @param {Partial<Client>} clientData - The data for the new client
     * @throws {CustomAPIError} If a client with the provided name already exists, if the client or the preferences could not be created or if the preferences could not be linked to the client
     * @returns {Promise<Client>} A promise that resolves with the new client
     */
    public async createClient(clientData: Partial<Client>): Promise<Client> {
        if (!this._clientRepository) {
            await this.extendClientRepository()
        }

        try {
            return await this._clientRepository.manager.transaction( async (transactionalEntityManager) => {
                await this.validateEntity(clientData, Client)
        
                const existingClient: Client | null = await this._clientRepository.findByName(clientData.first_name!, clientData.last_name!)
                    .catch((error: any) => {
                        console.error('Error finding client by name: ', error)
                        throw new CustomAPIError('Error finding client by name', 500)
                    }) 
                
                if (existingClient) {
                    throw new CustomAPIError(`Client with name ${clientData.first_name} ${clientData.last_name} already exists`, 400)
                }

                const client: Client = await transactionalEntityManager.save(Client, clientData)
                    .catch((error: any) => {
                        console.error('Error adding client: ', error)
                        throw new CustomAPIError('Client could not be created', 500)
                    }) 

                const preferences: Preferences = await transactionalEntityManager.save(Preferences, { client })
                    .catch((error: any) => {
                        console.error('Error adding preferences: ', error)
                        throw new CustomAPIError('Preferences could not be created', 500)
                    })

                await transactionalEntityManager.update(Client, client.id, { preferences })
                    .catch((error: any) => {
                        console.error('Error linking preferences to client: ', error)
                        throw new CustomAPIError('Preferences could not be linked to client', 500)
                    })

                return client
            })
        } catch (error: any) {
            throw error 
        }
    }

    /**
     * Update a client
     * 
     * @async
     * @method updateClient
     * @memberof ClientService
     * @param {string} id - The id of the client
     * @param {Partial<Client>} clientData - The data to update the client with
     * @throws {CustomAPIError} If no client is found with the provided id or if the client could not be updated
     * @returns {Promise<UpdateResult>} A promise that resolves with the result of the update
     */
    public async updateClient(id: string, clientData: Partial<Client>): Promise<UpdateResult> {
        if (!this._clientRepository) {
            await this.extendClientRepository()
        }

        try {
            return await this._clientRepository.manager.transaction(async transactionalEntityManager => {
                await this.validateEntity(clientData, Client)

                const clientExists: Client | null = await transactionalEntityManager.findOneBy(Client, { id })

                if (!clientExists) {
                    throw new CustomAPIError(`Client with id ${id} doesn't exists`, 404)
                }

                return await transactionalEntityManager.update(Client, id, clientData)
                    .catch((error: any) => {
                        console.error('Error updating client: ', error)
                        throw new CustomAPIError(`Client with id ${id} could not be updated`, 500)
                    })
            }) 
        } catch (error: any) {
            throw error 
        }
    }

    /**
     * Delete a client
     * 
     * @async
     * @method deleteClient
     * @memberof ClientService
     * @param {string} id - The id of the client
     * @throws {CustomAPIError} If no client is found with the provided id or if the client could not be deleted
     * @returns {Promise<DeleteResult>} A promise that resolves with the result of the deletion
     */
    public async deleteClient(id: string): Promise<DeleteResult> {
        if (!this._clientRepository) {
            await this.extendClientRepository()
        }

        try {
            return await this._clientRepository.manager.transaction(async transactionalEntityManager => {
                const clientExists: Client | null = await transactionalEntityManager.findOneBy(Client, { id })

                if (!clientExists) {
                    throw new CustomAPIError(`Client with id ${id} doesn't exists`, 404)
                }

                return await transactionalEntityManager.softDelete(Client, id)
                    .catch((error: any) => {
                        console.error('Error deleting client: ', error)
                        throw new CustomAPIError(`Client with id ${id} could not be deleted`, 500)
                    })
            })
        } catch (error: any) {
            throw error
        }
    }
}