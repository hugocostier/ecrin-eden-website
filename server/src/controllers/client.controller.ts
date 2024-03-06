import { Request, Response } from 'express'
import asyncHandler from '../middlewares/async.js'
import { ClientService } from '../services/client.service.js'

class ClientController {
    private _clientService = new ClientService

    // Get all clients
    public getAllClients = asyncHandler(async (req: Request, res: Response) => {
        const clients = await this._clientService.getAllClients() 

        res.status(200).json({
            success: true, 
            data: clients
        })
    })

    // Get a client
    public getClient = asyncHandler(async (req: Request, res: Response) => {
        const { id: clientId } = req.params

        const client = await this._clientService.getClient(clientId)

        res.status(200).json({
            success: true, 
            data: client
        })
    })

    // Get a client by name
    public getClientByName = asyncHandler(async (req: Request, res: Response) => {
        const { first_name, last_name } = req.body 

        const client = await this._clientService.getClientByName(first_name, last_name)

        res.status(200).json({
            success: true, 
            data: client
        })
    })

    // Get a client by it's related user
    public getClientByUser = asyncHandler(async (req: Request, res: Response) => {
        const { id: userId } = req.params 

        const client = await this._clientService.getClientByUser(userId)

        res.status(200).json({
            success: true, 
            data: client
        })
    })

    // Add a client
    public addClient = asyncHandler(async (req: Request, res: Response) => {
        const {
            first_name, 
            last_name, 
            phone_number, 
            address, 
            postal_code, 
            city, 
            shared_notes, 
            private_notes
        } = req.body
        
        const client = await this._clientService.createClient({
            first_name, 
            last_name, 
            phone_number, 
            address, 
            postal_code, 
            city, 
            shared_notes, 
            private_notes
        })

        res.status(201).json({
            success: true, 
            data: client, 
            msg: 'Client created successfully'
        })
    })

    // Update a client
    public updateClient = asyncHandler(async (req: Request, res: Response) => {
        const { id: clientId } = req.params 

        const client = await this._clientService.updateClient(clientId, req.body)

        res.status(200).json({
            success: true, 
            data: client, 
            msg: 'Client updated successfully'
        })
    })

    // Delete a client
    public deleteClient = asyncHandler(async (req: Request, res: Response) => {
        const { id: clientId } = req.params 

        const client = await this._clientService.deleteClient(clientId)

        res.status(200).json({
            success: true, 
            data: client, 
            msg: 'Client deleted successfully'
        })
    })

    // Get client address
    // public getClientAddress = asyncHandler(async (req: Request, res: Response) => {
    //     const { id: clientId } = req.params 

    //     const address = await this._clientService.getAddress(clientId)

    //     res.status(200).json({
    //         success: true, 
    //         data: address
    //     })
    // }) 

    // Get client profile picture
    public getClientProfilePicture = asyncHandler(async (req: Request, res: Response) => {
        const { id: clientId } = req.params 

        const profilePicture = await this._clientService.getProfilePicture(clientId)

        res.status(200).json({
            success: true, 
            data: profilePicture
        })
    })

    // Get client shared notes
    // public getClientSharedNotes = asyncHandler(async (req: Request, res: Response) => {
    //     const { id: clientId } = req.params 

    //     const sharedNotes = await this._clientService.getSharedNotes(clientId)

    //     res.status(200).json({
    //         success: true, 
    //         data: sharedNotes
    //     })
    // })

    // Get client personal information
    public getClientPersonalInfo = asyncHandler(async (req: Request, res: Response) => {
        const { id: clientId } = req.params 

        const personalInfo = await this._clientService.getClientPersonalInfo(clientId)

        res.status(200).json({
            success: true, 
            data: personalInfo
        })
    }) 

    // Delete client personal information
    public deleteClientPersonalInfo = asyncHandler(async (req: Request, res: Response) => { 
        const { id: clientId } = req.params 

        const personalInfo = await this._clientService.deletePersonalInfo(clientId)

        res.status(200).json({
            success: true, 
            data: personalInfo
        })
    })

}

export default new ClientController()