import { Request, Response } from 'express'
import Client from '../entities/Client.entity.js'
import { ClientService } from '../services/client.service.js'
import BaseController from './base.controller.js'

/**
 * Controller for clients
 * 
 * @class ClientController
 * @extends BaseController
 * @property {ClientService} _clientService - Instance of ClientService
 */
export default class ClientController extends BaseController {
    private _clientService: ClientService = new ClientService()

    /**
     * Get all clients
     * 
     * @method getAllClients
     * @memberof ClientController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the clients are returned.
     */
    public getAllClients = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            return await this._clientService.getAllClients()
        }) 
    }

    /**
     * Get a client
     * 
     * @method getClient
     * @memberof ClientController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the client is returned.
     */
    public getClient = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { id: clientId } = req.params

            return await this._clientService.getClientWithUser(clientId)
        }) 
    }

    /**
     * Get a client by name
     * 
     * @method getClientByName
     * @memberof ClientController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the client is returned.
     */
    public getClientByName = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { first_name, last_name } = req.body 

            return await this._clientService.getClientByName(first_name, last_name)
        })
    }

    /**
     * Get a client by user
     * 
     * @method getClientByUser
     * @memberof ClientController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the client is returned.
     */
    public getClientByUser = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { id: userId } = req.params

            return await this._clientService.getClientByUser(userId)
        }) 
    }
    

    /**
     * Get a client's personal information
     * 
     * @method getClientPersonalInfo
     * @memberof ClientController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the client's personal information is returned.
     */
    public getClientPersonalInfo = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { id: clientId } = req.params 

            return await this._clientService.getClientPersonalInfo(clientId)
        }) 
    }

    /**
     * Delete a client's personal information
     * 
     * @method deleteClientPersonalInfo
     * @memberof ClientController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the client's personal information is deleted.
     */
    public deleteClientPersonalInfo = async (req: Request, res: Response): Promise<void> => { 
        await this.handleRequest(req, res, async () => {
            const { id: clientId } = req.params 

            return await this._clientService.deletePersonalInfo(clientId)
        }, 'Personal information deleted successfully') 
    }

    /**
     * Add a client
     * 
     * @method addClient
     * @memberof ClientController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the client is added.
     */
    public addClient = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const validRequestBody: Partial<Client> = this.filterRequestBody(req.body, Client)

            return await this._clientService.createClient(validRequestBody)
        }, 'Client added successfully', 201) 
    }

    /**
     * Update a client
     * 
     * @method updateClient
     * @memberof ClientController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the client is updated.
     */
    public updateClient = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { id: clientId } = req.params 
        
            if (req.file && req.file.path) {
                req.body.profile_picture = req.file.path
            }
            
            const validRequestBody: Partial<Client> = this.filterRequestBody(req.body, Client)

            return await this._clientService.updateClient(clientId, validRequestBody)
        }, 'Client updated successfully')
    }

    /**
     * Delete a client
     * 
     * @method deleteClient
     * @memberof ClientController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the client is deleted.
     */
    public deleteClient = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { id: clientId } = req.params 

            return await this._clientService.deleteClient(clientId)
        }, 'Client deleted successfully', 204) 
    }
}