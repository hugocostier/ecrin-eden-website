import { Repository, UpdateResult } from 'typeorm'
import Client from '../entities/Client.entity.js'
import User from '../entities/User.entity.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import { AuthRepository } from '../repositories/auth.repository.js'
import BaseService from './base.service.js'
import { ClientService } from './client.service.js'
import { OTPService } from './otp.service.js'
import { UserService } from './user.service.js'

/**
 * Service for handling authentication
 * 
 * @class AuthService
 * @extends BaseService
 * @property {AuthRepository} _customAuthRepository - Instance of the custom repository for authentication
 * @property {ClientService} _clientService - Instance of ClientService
 * @property {OTPService} _otpService - Instance of OTPService
 * @property {UserService} _userService - Instance of UserService
 * @property {Repository<User> & {isUserAlreadyRegistered(email: string): Promise<boolean>;registerUser(email: string, password: string, client: Client): Promise<{ id: number, email: string }>; authenticateUser(email: string, password: string): Promise<{ user: Partial<User> | false, message: string }>; resetPassword(email: string, otp: number, password: string, salt: string)}} _authRepository - The extended auth repository with custom methods for the authentication process
 * @property {Repository<Client> & {isExistingClient(firstName: string, lastName: string): Promise<Client | false>;}} _clientRepository - The extended client repository with custom methods for the authentication process
 */
export class AuthService extends BaseService {
    private _customAuthRepository: AuthRepository = new AuthRepository()
    private _clientService: ClientService = new ClientService()
    private _otpService: OTPService = new OTPService() 
    private _userService: UserService = new UserService() 
    private _authRepository!: Repository<User> & {
        isUserAlreadyRegistered(email: string): Promise<boolean>;
        registerUser(email: string, password: string, token: string, client: Client): Promise<{ id: number, email: string }>
        authenticateUser(email: string, password: string): Promise<{ user: Partial<User> | false, message: string }>
        resetPassword(email: string, otp: number, password: string, salt?: string): Promise<UpdateResult>
    }
    private _clientRepository!: Repository<Client> & {
        isExistingClient(firstName: string, lastName: string): Promise<Client | false>
    }

    /**
     * Extends the auth repository by assigning the result of the 'extendAuthRepository' method to the '_authRepository' and '_clientRepository' properties
     * 
     * @async
     * @method extendAuthRepository
     * @memberof AuthService
     * @throws {Error} If there is an error extending the auth repository
     * @returns {Promise<void>} A promise that resolves if the auth repository is successfully extended
     */
    private async extendAuthRepository(): Promise<void> {
        try {
            const returnedObject = await this._customAuthRepository.extendAuthRepository()

            this._authRepository = returnedObject.authRepository
            this._clientRepository = returnedObject.clientRepository
        } catch (error) {
            console.error('Error extending auth repository: ', error)
            throw new Error('Error extending auth repository')
        }
    }

    /**
     * Registers a new user
     * 
     * @async
     * @method register
     * @memberof AuthService
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * @param {string} firstName - The first name of the user
     * @param {string} lastName - The last name of the user
     * @throws {CustomAPIError} If the email or password is not provided, if the first or last name is not provided, if the email already exists, if the client already exists, if the user could not be created, or if the client could not be linked to the user or if there is an error registering the user
     * @returns {Promise<{ id: number, email: string}>} A promise that resolves with the id and email of the new user
     */
    public async register(email: string, password: string, firstName: string, lastName: string, token: string): Promise<{ id: number, email: string }>{
        if (!this._authRepository) {
            await this.extendAuthRepository()
        }

        try {
            await this.validateEntity({ first_name: firstName, last_name: lastName }, Client)
            await this.validateEntity({ email, password, verification_token: token }, User)

            return await this._authRepository.manager.transaction(async transactionalEntityManager => {
                // Check if user already exists
                const userExists: boolean = await this._authRepository.isUserAlreadyRegistered(email)
                    .catch((error: any) => {
                        console.error('Error checking if user exists: ', error)
                        throw new CustomAPIError('Error checking if user exists', 500)
                    })

                if (userExists) {
                    throw new CustomAPIError(`User with email ${email} already exists`, 400)
                }

                // Check if a client with the same first and last name exists
                let client: Client | false = await this._clientRepository.isExistingClient(firstName, lastName)
                    .catch((error: any) => {
                        console.error('Error checking if client exists: ', error)
                        throw new CustomAPIError('Error checking if client exists', 500)
                    })

                // If a client is found and has an associated user
                if (client && client.user) {
                    throw new CustomAPIError('An account with this name already exists', 400)
                }

                // If no client is found create one
                if (!client) {
                    client = await this._clientService.createClient({ first_name: firstName, last_name: lastName })
                        .catch((error: any) => {
                            console.error('Error creating client: ', error)
                            throw new CustomAPIError('Error creating client', 500)
                        })
                }

                // Create a new user with the client id
                const newUser: { id: number, email: string } = await this._authRepository.registerUser(email, password, token, client)
                    .catch((error: any) => {
                        console.error('Error registering user: ', error)
                        throw new CustomAPIError('Error registering user', 500)
                    })

                // Link the client with the user
                if (client.id) {
                    const linkedClient: Client | UpdateResult | undefined = await this._clientService.getClientById(client.id.toString()) ? await this._clientService.updateClient(client.id.toString(), { user: newUser } as Partial<Client>) : undefined

                    if (!linkedClient) {
                        throw new CustomAPIError('Client could not be linked to user', 500)
                    }
                }

                return newUser
            })
        } catch (error: any) {
            throw error
        }
    }

    /**
     * Logs in a user
     * 
     * @async
     * @method login
     * @memberof AuthService
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * @throws {CustomAPIError} If the email or password is not provided or if there is an error logging in the user
     * @returns {Promise<{ user: Partial<User> | false, message: string }>} A promise that resolves with the user and a message
     */
    public async login(email: string, password: string): Promise<{ user: false | Partial<User>, message: string }> {
        if (!this._authRepository) {
            await this.extendAuthRepository()
        }

        try {
            const { user, message }: { user: false | Partial<User>, message: string } = await this._authRepository.authenticateUser(email, password)

            return { user, message }
        } catch (error: any) { 
            console.error('Error logging in user: ', error)
            throw new CustomAPIError('Error logging in user', 500)
        }
    }

    public async verifyUser(email: string, token: string): Promise<boolean> {
        if (!this._authRepository) {
            await this.extendAuthRepository()
        }

        try {
            const user: User | null = await this._userService.getUserByEmail(email)

            if (!user) {
                throw new CustomAPIError('User not found', 404)
            }

            if (user.verification_token !== token) {
                throw new CustomAPIError('Invalid token', 400)
            }

            return await this._authRepository.manager.transaction(async transactionalEntityManager => {
                return await transactionalEntityManager.update(User, user.id, { verified: true, verification_token: '' }) ? true : false
            })
        } catch (error: any) {
            throw error
        }
    }

    /**
     * Resets the password of a user
     * 
     * @async
     * @method resetPassword
     * @memberof AuthService
     * @param {string} email - The email of the user
     * @param {number} otp - The OTP to verify
     * @param {string} password - The new password of the user
     * @throws {CustomAPIError} If the user is not found, if the OTP is invalid, or if there is an error resetting the password
     * @returns {Promise<UpdateResult>} A promise that resolves with the result of the password reset
     */
    public async resetPassword(email: string, otp: number, password: string): Promise<UpdateResult> {
        if (!this._authRepository) {
            await this.extendAuthRepository()
        }

        try {
            await this.validateEntity({ email, password, otp: otp }, User)

            return this._authRepository.manager.transaction(async transactionalEntityManager => {
                const user: User | null = await this._userService.getUserByEmail(email)
                    .catch((error: any) => {
                        console.error('Error getting user by email: ', error)
                        throw new CustomAPIError('Error getting user by email', 500)
                    })

                if (!user) {
                    throw new CustomAPIError('User not found', 404)
                }

                if (!this._otpService.checkOTP(otp.toString())) {
                    throw new CustomAPIError('Invalid OTP', 400)
                }

                const otpVerification: { isValid: boolean, message: string } = this._otpService.verifyOTP(user, otp)

                if (!otpVerification.isValid) {
                    throw new CustomAPIError(otpVerification.message, 401)
                }

                return await this._authRepository.resetPassword(email, otp, password, user.salt)
            }) 
        } catch (error: any) {
            throw error
        }
    }
}