import { User } from '../entities/User.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import { ClientRepository } from '../repositories/client.repository.js'
import { UserRepository } from '../repositories/user.repository.js'

export class UserService {
    private _userRepository = UserRepository
    private _clientRepository = ClientRepository

    async getAllUsers() {
        const allUsers = await this._userRepository.find()

        if (!allUsers || allUsers.length === 0) {
            throw new CustomAPIError('No users found', 404)
        }

        return allUsers
    }

    async getUser(id: string) {
        const user = await this._userRepository.findById(parseInt(id))

        if (!user) {
            throw new CustomAPIError(`No user found with id ${id}`, 404)
        }

        return user
    }

    async getUserByEmail(email: string) {
        const user = await this._userRepository.findByEmail(email)

        if (!user) {
            throw new CustomAPIError(`No user found with email ${email}`, 404)
        }

        return user
    }

    async updateUser(id: string, userData: Partial<User>) {
        const user = await this._userRepository.findById(parseInt(id
        ))

        if (!user) {
            throw new CustomAPIError(`No user found with id ${id}`, 404)
        }

        return await this._userRepository.update(id, userData)
    }

    async deleteUser(id: string) {
        const user = await this._userRepository.createQueryBuilder('user') 
            .leftJoinAndSelect('user.client', 'client') 
            .where('user.id = :id', { id })
            .getOne()

        console.log('User delete:', user)

        if (!user) {
            throw new CustomAPIError(`No user found with id ${id}`, 404)
        }

        if (user.client) {
            const clientId = user.client.id 

            if (clientId === undefined) {
                throw new Error('Client ID is undefined')
            } 

            const client = await this._clientRepository.createQueryBuilder('client')
                .leftJoinAndSelect('client.user', 'user')
                .where('client.id = :id', { id: clientId })
                .getOne()

            console.log('Client to update:', client)

            if (!client) {
                throw new CustomAPIError(`No client found with id ${clientId}`, 404)
            }

            client.user = null 

            const clientUpdated = await this._clientRepository.save(client)

            console.log('Client updated:', clientUpdated)
        }

        return await this._userRepository.delete(id)
    }
}