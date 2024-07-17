import User from '../entities/User.entity.js'
import BaseRepository from './base.repository.js'

/**
 * The `UserRepository` class extends the `BaseRepository` class and adds custom requests for user data.
 * 
 * @class UserRepository
 * @extends BaseRepository
 */
export class UserRepository extends BaseRepository {
    /**
     * Initializes the data source and returns an extended repository with custom requests for user data.
     * 
     * @async
     * @method extendUserRepository
     * @memberof UserRepository
     * @throws {Error} If there is an error extending the user repository.
     * @returns The extended user repository.
     */
    public async extendUserRepository() {
        try {
            await this.initializeDataSource()
            return this.userRepository()
        } catch (error: any) {
            console.error('Error extending user repository: ', error)
            throw new Error(error)
        }
    }

    /**
     * Adds custom requests to the user repository.
     * 
     * @method userRepository
     * @memberof UserRepository
     * @returns The extended user repository.
     */
    private async userRepository() {
        return this.dataSource.getRepository(User).extend({
            /**
             * Finds a user by their id and returns their data.
             * 
             * @async
             * @method findById
             * @memberof userRepository
             * @param {string} id - The id of the user to find.
             * @returns {Promise<User | null>} The user data or null if the user is not found.
             */
            async findById(id: string): Promise<User | null> {        
                return this.createQueryBuilder('user')
                    .leftJoin('user.client', 'client')
                    .select([
                        'user.email',
                        'user.password',
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
                    ])
                    .where('user.id = :id', { id })
                    .getOne()
            }, 
        
            /**
             * Finds a user by their email and returns their email and role.
             * 
             * @async
             * @method findByEmail
             * @memberof userRepository
             * @param {string} email - The email of the user to find.
             * @returns {Promise<{ email: string, role: string } | null>} The user email and role or null if the user is not found.
             */
            async findByEmail(email: string): Promise<{ email: string, role: string } | null> {
                const user: User | null = await this.findOneBy({ email })
        
                return user ? { email: user.email, role: user.role } : null
            }, 

            /**
             * Finds a user by their id and returns their data with the client data.
             * 
             * @async
             * @method findUserWithClient
             * @memberof userRepository
             * @param {string} id - The id of the user to find.
             * @returns {Promise<User | null>} The user data with the client data or null if the user is not found.
             */
            async findUserWithClient(id: string): Promise<User | null> {
                return this.createQueryBuilder('user')
                    .leftJoinAndSelect('user.client', 'client')
                    .where('user.id = :id', { id })
                    .getOne()
            }, 

            /**
             * Finds a user by their client id and returns their data.
             * 
             * @async
             * @method findUserByClient
             * @memberof userRepository
             * @param {string} clientId - The id of the client to find.
             * @returns {Promise<User | null>} The user data or null if the user is not found.
             */
            async findUserByClient(clientId: string): Promise<User | null> {
                return this.createQueryBuilder('user')
                    .leftJoinAndSelect('user.client', 'client')
                    .where('user.client = :clientId', { clientId })
                    .getOne()
            }
        })
    }
}