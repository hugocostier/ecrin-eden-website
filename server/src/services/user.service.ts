import { User } from '../entities/User.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import { UserRepository } from '../repositories/user.repository.js'


export class UserService {
    private _userRepository = UserRepository

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
        const user = await this._userRepository.findById(parseInt(id))

        if (!user) {
            throw new CustomAPIError(`No user found with id ${id}`, 404)
        }

        return await this._userRepository.delete(id)
    }
}