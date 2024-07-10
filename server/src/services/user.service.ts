import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import Client from '../entities/Client.entity.js'
import User from '../entities/User.entity.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import { UserRepository } from '../repositories/user.repository.js'
import BaseService from './base.service.js'
import { ClientService } from './client.service.js'

/**
 * Service for handling users
 * 
 * @class UserService
 * @extends BaseService
 * @property {UserRepository} _customUserRepository - Instance of the custom repository for users
 * @property {ClientService} _clientService - Instance of ClientService
 * @property {Repository<User> & { findById(id: number): Promise<User | null>; findByEmail(email: string): Promise<{ email: string, role: string } | null>; findUserWithClient(id: number): Promise<User | null>; findUserByClient(clientId: number): Promise<User | null>; }} _userRepository - The extended user repository
 */
export class UserService extends BaseService {
    private _customUserRepository: UserRepository = new UserRepository()
    private _clientService: ClientService = new ClientService() 
    private _userRepository!: Repository<User> & {
        findById(id: number): Promise<User | null>
        findByEmail(email: string): Promise<{ email: string, role: string } | null>
        findUserWithClient(id: number): Promise<User | null>
        findUserByClient(clientId: number): Promise<User | null>
    }

    /**
     * Extends the user repository by assigning the result of the 'extendUserRepository' method to the '_userRepository' property
     * 
     * @async
     * @method extendUserRepository
     * @memberof UserService
     * @throws {Error} If there is an error extending the user repository
     * @returns {Promise<void>} A promise that resolves if the user repository is successfully extended
     */
    private async extendUserRepository(): Promise<void> {
        try {
            this._userRepository = await this._customUserRepository.extendUserRepository()
        } catch (error: any) {
            console.error('Error extending user repository: ', error)
            throw new Error(error)
        }
    }

    /**
     * Retrieves all users
     * 
     * @async
     * @method getAllUsers
     * @memberof UserService
     * @throws {CustomAPIError} If there is an error getting the users
     * @returns {Promise<User[]>} A promise that resolves with all users
     */
    public async getAllUsers(): Promise<User[]> {
        if (!this._userRepository) {
            await this.extendUserRepository()
        }

        try {
            return await this._userRepository.find()
        } catch (error: any) {
            console.error('Error getting users: ', error)
            throw new CustomAPIError('Error getting users', 500)
        }
    }

    /**
     * Retrieves a user by id
     * 
     * @async
     * @method getUser
     * @memberof UserService
     * @param {string} id - The id of the user
     * @throws {CustomAPIError} If no user is found with the id or if there is an error getting the user
     * @returns {Promise<User>} A promise that resolves with the user
     */
    public async getUser(id: string): Promise<User> {
        if (!this._userRepository) {
            await this.extendUserRepository()
        }

        try {
            const user: User | null = await this._userRepository.findById(parseInt(id))
                .catch((error: any) => {
                    console.error('Error getting user: ', error)
                    throw new CustomAPIError('Error getting user', 500)
                }) 

            if (!user) {
                throw new CustomAPIError(`No user found with id ${id}`, 404)
            }

            return user
        } catch (error: any) {
            throw error
        }
    }

    /**
     * Retrieves a user by email
     * 
     * @async
     * @method getUserByEmail
     * @memberof UserService
     * @param {string} email - The email of the user
     * @throws {CustomAPIError} If no user is found with the email or if there is an error getting the user
     * @returns {Promise<User>} A promise that resolves with the user
     */
    public async getUserByEmail(email: string): Promise<User | null > {
        if (!this._userRepository) {
            await this.extendUserRepository()
        }

        try {
            const user: User | null = await this._userRepository.findOneBy({ email })
                .catch((error: any) => {
                    console.error('Error getting user by email: ', error)
                    throw new CustomAPIError('Error getting user by email', 500)
                })

            if (!user) {
                throw new CustomAPIError(`No user found with email ${email}`, 404)
            }

            return user
        } catch (error: any) {
            throw error
        }
    }

    /**
     * Retrieves a user by client
     * 
     * @async
     * @method getUserByClient
     * @memberof UserService
     * @param {string} clientId - The id of the client
     * @throws {CustomAPIError} If no user is found with the client id or if there is an error getting the user
     * @returns {Promise<User | null>} A promise that resolves with the user or null if no user is found
     */
    public async getUserByClient(clientId: string): Promise<User | null> {
        if (!this._userRepository) {
            await this.extendUserRepository()
        }

        try {
            const user: User | null = await this._userRepository.findUserByClient(parseInt(clientId))
                .catch((error: any) => {
                    console.error('Error getting user by client: ', error)
                    throw new CustomAPIError('Error getting user by client', 500)
                })

            return user
        } catch (error: any) {
            throw error
        }
    }

    /**
     * Retrieves a user's email and role by email
     * 
     * @async
     * @method getUserEmailAndRole
     * @memberof UserService
     * @param {string} email - The email of the user
     * @throws {CustomAPIError} If no user is found with the email or if there is an error getting the user's email and role
     * @returns {Promise<{ email: string, role: string }>} A promise that resolves with the user's email and role
     */
    public async getUserEmailAndRole(email: string): Promise<{ email: string, role: string }> {
        if (!this._userRepository) {
            await this.extendUserRepository()
        }

        try {
            const user: { email: string, role: string } | null = await this._userRepository.findByEmail(email)
                .catch((error: any) => {
                    console.error('Error getting user email and role: ', error)
                    throw new CustomAPIError('Error getting user email and role', 500)
                })

            if (!user) {
                throw new CustomAPIError(`No user found with email ${email}`, 404)
            }

            return user
        } catch (error: any) {
            throw error 
        }
    }

    /**
     * Updates an user
     * 
     * @async
     * @method updateUser
     * @memberof UserService
     * @param {string} id - The id of the user
     * @param {Partial<User>} userData - The data of the user
     * @throws {CustomAPIError} If no user is found with the id, if the client id is undefined, or if there is an error updating the user
     * @returns {Promise<UpdateResult>} A promise that resolves with the result of the update operation
     */
    public async updateUser(id: string, userData: Partial<User>): Promise<UpdateResult> {
        if (!this._userRepository) {
            await this.extendUserRepository()
        }

        try {
            this.validateEntity(userData, User)

            return this._userRepository.manager.transaction(async transactionalEntityManager => {
                const user: User | null = await this._userRepository.findById(parseInt(id))
                    .catch((error: any) => {
                        console.error('Error getting user: ', error)
                        throw new CustomAPIError('Error getting user', 500)
                    }) 

                if (!user) {
                    throw new CustomAPIError(`No user found with id ${id}`, 404)
                }

                const clientId: number | undefined = user.client?.id

                if (clientId === undefined) {
                    throw new CustomAPIError('Client id is undefined', 500)
                }

                return await transactionalEntityManager.update(User, id, userData)
                    .catch((error: any) => {
                        console.error('Error updating user: ', error)
                        throw new CustomAPIError('Error updating user', 500)
                    }) 
            }) 
        } catch (error: any) {
            throw error 
        }
    }

    /**
     * Deletes a user
     * 
     * @async
     * @method deleteUser
     * @memberof UserService
     * @param {string} id - The id of the user
     * @throws {CustomAPIError} If no user is found with the id, if the client id is undefined, if no client is found with the id, or if there is an error saving the client or deleting the user
     * @returns {Promise<DeleteResult>} A promise that resolves with the result of the delete operation
     */
    public async deleteUser(id: string): Promise<DeleteResult> {
        if (!this._userRepository) {
            await this.extendUserRepository()
        }

        try {
            return this._userRepository.manager.transaction(async transactionalEntityManager => {
                const user: User | null = await this._userRepository.findUserWithClient(parseInt(id))
                    .catch((error: any) => {
                        console.error('Error getting user: ', error)
                        throw new CustomAPIError('Error getting user', 500)
                    })

                if (!user) {
                    throw new CustomAPIError(`User with id ${id} doesn't exists`, 404)
                }

                const clientId: number | undefined = user.client?.id

                if (clientId === undefined) {
                    throw new CustomAPIError('Client id is undefined', 500)
                }

                const client: Client = await this._clientService.getClientById(clientId.toString())
                    .catch((error: any) => {
                        console.error('Error getting client: ', error)
                        throw new CustomAPIError('Error getting client', 500)
                    })

                if (!client) {
                    throw new CustomAPIError(`Client with id ${id} doesn't exists`, 404)
                }

                client.user = null

                await transactionalEntityManager.save(client)
                    .catch((error: any) => {
                        console.error('Error saving client: ', error)
                        throw new CustomAPIError('Error saving client', 500)
                    }) 

                return await transactionalEntityManager.delete(User, id)
                    .catch((error: any) => {
                        console.error('Error deleting user: ', error)
                        throw new CustomAPIError('Error deleting user', 500)
                    })
            })
        } catch (error: any) {
            throw error 
        }
    }
}