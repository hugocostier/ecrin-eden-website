import { CustomAPIError } from '../errors/custom-errors.js'
import { AuthRepository } from '../repositories/auth.repository.js'
import { ClientRepository } from '../repositories/client.repository.js'
import { UserRepository } from '../repositories/user.repository.js'

export class AuthService {
    private _authRepository = AuthRepository
    private _userRepository = UserRepository
    private _clientRepository = ClientRepository

    async register(email: string, password: string, firstName: string, lastName: string) {
        if (!email || !password) {
            throw new CustomAPIError('Please provide both email and password', 400)
        }

        if (!firstName || !lastName) {
            throw new CustomAPIError('Please provide both first and last name', 400)
        }

        // Check if user already exists
        const user = await this._userRepository.findByEmail(email)

        if (user) {
            throw new CustomAPIError('An user with this email already exists', 400)
        }

        // Check if a client with the same first and last name exists
        let client = await this._clientRepository.findByName(firstName, lastName)

        // If no client is found
        if (!client) {
            // Create a new client 
            client = await this._clientRepository.create({ first_name: firstName, last_name: lastName }).save()

            if (!client) {
                throw new CustomAPIError('Client could not be created', 500)
            }
        } 

        // Create a new user with the client id 
        const newUser = await this._authRepository.registerUser(email, password, client) 

        if (!newUser) {
            throw new CustomAPIError('User could not be created', 500)
        }

        // Link the client with the user
        if (client.id) {
            const linkedClient = await this._clientRepository.findById(client.id) ? await this._clientRepository.update(client.id, { user: newUser }) : undefined

            if (!linkedClient) {
                throw new CustomAPIError('Client could not be linked to user', 500)
            }
        }

        return newUser 
    }

}