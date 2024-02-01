import { Client } from "../entities/Client.js";
import { CustomAPIError } from "../errors/custom-errors.js";
import { ClientRepository } from "../repositories/client.repository.js";

export class ClientService {
    private _clientRepository = ClientRepository

    // Get all clients
    async getAllClients() {
        const allClients = await this._clientRepository.find()

        if (!allClients || allClients.length === 0) {
            throw new CustomAPIError('No clients found', 404)
        }

        return allClients
    }

    // Get a client 
    async getClient(id: string) {
        const client = await this._clientRepository.findById(parseInt(id))

        if (!client) {
            throw new CustomAPIError(`No client found with id ${id}`, 404)
        }

        return client
    }

    // Get a client by name 
    async getClientByName(first_name: string, last_name: string) {
        const client = await this._clientRepository.findByName(first_name, last_name)

        if (!client) {
            throw new CustomAPIError(`No client found with name ${first_name} ${last_name}`, 404)
        }

        return client
    }
    
    // Get the address of a client 
    async getAddress(clientId: string) {
        const client = await this._checkIfClientExists(clientId)
        
        if (!client) {
            throw new CustomAPIError(`No client found with id ${clientId}`, 404)
        }

        const address = await this._clientRepository.getAddress(parseInt(clientId))

        if (!address) {
            throw new CustomAPIError(`No address found for client with id ${clientId}`, 404)
        }

        return address
    }

    // Get personal info of a client
    async getClientPersonalInfo(clientId: string) {
        const client = await this._checkIfClientExists(clientId)
        
        if (!client) {
            throw new CustomAPIError(`No client found with id ${clientId}`, 404)
        }

        const personalInfo = await this._clientRepository.getPersonalInfo(parseInt(clientId))

        if (!personalInfo) {
            throw new CustomAPIError(`No personal info found for client with id ${clientId}`, 404)
        }

        return personalInfo
    }

    // Get shared notes of a client 
    async getSharedNotes(clientId: string) {
        const client = await this._checkIfClientExists(clientId)
        
        if (!client) {
            throw new CustomAPIError(`No client found with id ${clientId}`, 404)
        }

        const sharedNotes = await this._clientRepository.getSharedNotes(parseInt(clientId))

        if (!sharedNotes) {
            throw new CustomAPIError(`No shared notes found for client with id ${clientId}`, 404)
        }

        return sharedNotes
    }

    // Get profile picture 
    async getProfilePicture(clientId: string) {
        const client = await this._checkIfClientExists(clientId)
        
        if (!client) {
            throw new CustomAPIError(`No client found with id ${clientId}`, 404)
        }
        
        const profilePicture = await this._clientRepository.getProfilePicture(parseInt(clientId))

        if (!profilePicture) {
            throw new CustomAPIError(`No profile picture found for client with id ${clientId}`, 404)
        }

        return profilePicture
    }

    // Create a client 
    async createClient(clientData: Partial<Client>) {
        if (!clientData.first_name || !clientData.last_name) {
            throw new CustomAPIError('Please provide both first and last name', 400)
        }

        const existingClient = await this.getClientByName(clientData.first_name, clientData.last_name)
        console.log(existingClient)
        if (existingClient && existingClient.length > 0) {
            throw new CustomAPIError(`Client with name ${clientData.first_name} ${clientData.last_name} already exists`, 400)
        }

        const client = await this._clientRepository.create(clientData).save() 

        if (!client) {
            throw new CustomAPIError('Client could not be created', 500)
        }

        return client
    }

    // Update a client 
    async updateClient(id: string, clientData: Partial<Client>) {
        await this._checkIfClientExists(id)

        const client = await this._clientRepository.update(id, clientData)

        if (!client) {
            throw new CustomAPIError(`Client with id ${id} could not be updated`, 500)
        }

        return client 
    }

    // Delete a client 
    async deleteClient(id: string) {
        await this._checkIfClientExists(id)

        const result = await this._clientRepository.delete(id)

        if (result.affected === 0) {
            throw new CustomAPIError(`Client with id ${id} could not be deleted`, 404)
        }
    }

    async deletePersonalInfo(id: string) {
        await this._checkIfClientExists(id)

        const result = await this._clientRepository.update(id, {
            phone_number: undefined, 
            address: undefined, 
            postal_code: undefined, 
            city: undefined
        })

        if (!result) {
            throw new CustomAPIError(`Personal info for client with id ${id} could not be deleted`, 404)
        }
    }

    private async _checkIfClientExists(id: string): Promise<boolean> {
        const existingClient = await this._clientRepository.findById(parseInt(id))

        return existingClient ? true : false
    } 
}