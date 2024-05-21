import crypto from 'crypto'
import { InsertResult, UpdateResult } from 'typeorm'
import Client from '../entities/Client.entity.js'
import User from '../entities/User.entity.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import BaseRepository from './base.repository.js'

/**
 * Repository for handling authentication
 * 
 * @class AuthRepository
 * @extends BaseRepository
 */
export class AuthRepository extends BaseRepository {
    /**
     * Initializes the data source and returns an object with the extended auth repository and client repository. 
     * 
     * @async
     * @method extendAuthRepository
     * @memberof AuthRepository
     * @throws {Error} If there is an error extending the auth repository.
     * @returns The extended auth repository.
     */
    public async extendAuthRepository() {
        try {
            await this.initializeDataSource()
            return { authRepository: this.authRepository(), clientRepository: this.clientRepository() }
        } catch (error: any) {
            console.error('Error extending auth repository: ', error)
            throw new Error(error)
        }
    }

    /**
     * Add custom request for checking if a client already exists in the client repository.
     * 
     * @method clientRepository
     * @memberof AuthRepository
     * @returns The extended client repository.
     */
    private clientRepository() {
        return this.dataSource.getRepository(Client).extend({
            /**
             * Checks if a client with the provided first and last name already exists.
             * 
             * @async
             * @method isExistingClient
             * @memberof clientRepository
             * @param {string} firstName - The first name of the client to check.
             * @param {string} lastName - The last name of the client to check.
             * @returns {Promise<Client | false>} A promise that resolves with the client if the client exists, and false if the client does not exist.
             */
            async isExistingClient(firstName: string, lastName: string): Promise<Client | false> {
                const client = await this.createQueryBuilder('client')
                    .leftJoinAndSelect('client.user', 'user')
                    .where('client.first_name = :firstName AND client.last_name = :lastName', { firstName, lastName })
                    .getOne()
                
                return client ? client : false 
            }
        })
    }

    /**
     * Adds custom requests to the auth repository.
     * 
     * @method authRepository
     * @memberof AuthRepository
     * @returns The extended auth repository.
     */
    private authRepository() {
        /**
         * Generates a random salt.
         * 
         * @async
         * @method generateSalt
         * @memberof authRepository
         * @throws {Error} If there is an error generating the salt.
         * @returns {Promise<string>} A promise that resolves with a random salt.
         */
        const generateSalt = async (): Promise<string> => {
            return new Promise<string>((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (err) reject(err)
                    resolve(buf.toString('hex'))
                })
            })
        }
        
        /**
         * Hashes a password with a salt.
         * 
         * @async
         * @method hashPassword
         * @memberof authRepository
         * @param {string} password - The password to hash.
         * @param {string} salt - The salt to use for hashing.
         * @throws {Error} If there is an error hashing the password.
         * @returns {Promise<string>} A promise that resolves with the hashed password.
         */
        const hashPassword = async (password: string, salt: string): Promise<string> => {
            return new Promise<string>((resolve, reject) => {
                crypto.scrypt(password, Buffer.from(salt, 'hex'), 32, (err, derivedKey) => {
                    if (err) reject(err)
                    resolve(derivedKey.toString('hex'))
                })
            })
        }

        /**
         * Compares a password with a salt and a user password.
         * 
         * @async
         * @method comparePasswords
         * @memberof authRepository
         * @param {string} password - The password to compare.
         * @param {string} salt - The salt to use for comparison.
         * @param {string} userPassword - The user password to compare.
         * @throws {Error} If there is an error comparing the passwords.
         * @returns {Promise<boolean>} A promise that resolves with true if the passwords match, and false if the passwords do not match.
         */
        const comparePasswords = async (password: string, salt: string, userPassword: string): Promise<boolean> => {
            return new Promise<boolean>((resolve, reject) => {
                crypto.scrypt(password, Buffer.from(salt, 'hex'), 32, (err, derivedKey) => {
                    if (err) reject({ error: err, message: 'Error hashing password' })
                    resolve(crypto.timingSafeEqual(Buffer.from(userPassword, 'hex'), derivedKey)) 
                })
            })
        }

        return this.dataSource.getRepository(User).extend({
            /**
             * Checks if a user with the provided email is already registered.
             * 
             * @async
             * @method isUserAlreadyRegistered
             * @memberof authRepository
             * @param {string} email - The email of the user to check.
             * @returns {Promise<boolean>} A promise that resolves with true if the user is already registered, and false if the user is not registered.
             */
            async isUserAlreadyRegistered(email: string): Promise<boolean> {
                const user = await this.createQueryBuilder('user')
                    .where('user.email = :email', { email })
                    .getOne()

                return !!user
            }, 

            /**
             * Registers a new user with an email, password, and client.
             * 
             * @async
             * @method registerUser
             * @memberof authRepository
             * @param {string} email - The email of the user to register.
             * @param {string} password - The password of the user to register.
             * @param {string} token - The token to associate with the user.
             * @param {Client} client - The client to associate with the user.
             * @returns {Promise<{ id: number, email: string }>} The id and email of the registered user.
             */
            async registerUser(email: string, password: string, token: string, client: Client): Promise<{ id: number, email: string }> {
                // Generate a random salt
                const salt: string = await generateSalt() 
                    .catch((error: any) => {
                        console.error('Error generating salt: ', error)
                        throw new Error(error)
                    }) 

                // Hash the password with the salt
                const hashedPassword: string = await hashPassword(password, salt) 
                    .catch((error: any) => {
                        console.error('Error hashing password: ', error)
                        throw new Error(error)
                    })

                // Insert the user into the database
                const user: InsertResult = await this.createQueryBuilder()
                    .insert()
                    .into(User)
                    .values({ email, password: hashedPassword, salt: salt, verification_token: token, client: client })
                    .execute()
                    .catch((error: any) => {
                        console.error('Error inserting user: ', error)
                        throw new Error(error)
                    })                    

                // Return the id and email of the registered user
                return { id: user.identifiers[0].id, email }
            },
        
            /**
             * Authenticates a user with an email and password.
             * 
             * @async
             * @method authenticateUser
             * @memberof authRepository
             * @param {string} email - The email of the user to authenticate.
             * @param {string} password - The password of the user to authenticate.
             * @returns {Promise<{ user: Object | false, message: string }>} The authenticated user or false if the user is not found or the password is incorrect and a message indicating the result.
             */
            async authenticateUser(email: string, password: string): Promise<{ user: Object | false, message: string }> {
                const user: User | null = await this.createQueryBuilder('user')
                    .leftJoin('user.client', 'client')
                    .select([
                        'user.id', 
                        'user.email', 
                        'user.salt',
                        'user.password',
                        'user.role', 
                        'user.verified',
                        'client.id'
                    ])
                    .where('user.email = :email', { email })
                    .getOne()

                if (!user) {
                    return { user: false, message: 'User not found' }
                } else if (!user.verified) {
                    return { user: false, message: 'User not verified' }
                }

                if (!await comparePasswords(password, user.salt, user.password)) {
                    return { user: false, message: 'Incorrect password' }
                }
                
                const returnedUser: Object = {
                    id: user.id, 
                    username: user.email, 
                    role: user.role, 
                    client: {
                        id: user.client?.id 
                    }
                }

                return { user: returnedUser, message: 'User authenticated' }
            }, 

            /**
             * Resets the password of a user with an email, OTP, password, and salt.
             * 
             * @async
             * @method resetPassword
             * @memberof authRepository
             * @param {string} email - The email of the user to reset the password for.
             * @param {number} otp - The OTP to reset the password with.
             * @param {string} password - The new password of the user.
             * @param {string} salt - The salt to use for hashing the password.
             * @returns {Promise<UpdateResult>} The result of resetting the password.
             */
            async resetPassword(email: string, otp: number, password: string, salt: string): Promise<UpdateResult> {
                const hashedPassword: string = await hashPassword(password, salt)
                    .catch((error: any) => {
                        console.error('Error hashing password: ', error)
                        throw new CustomAPIError('Error hashing password', 500)
                    })

                return await this.createQueryBuilder()
                    .update(User)
                    .set({ password: hashedPassword, otp: null, otpExpires: null })
                    .where('email = :email', { email })
                    .execute()
                    .catch((error: any) => {
                        console.error('Error resetting password: ', error)
                        throw new CustomAPIError('Error resetting password', 500)
                    })
            }
        })
    }
}