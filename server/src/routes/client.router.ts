import express from 'express'
import client from '../controllers/client.controller.js'
import { Client } from '../entities/Client.js'
import { validationMiddleware } from '../middlewares/validation.js'

const router = express.Router() 

router.route('/')
    .get(client.getAllClients)
    .post(validationMiddleware(Client), client.addClient)

router.route('/:id')
    .get(client.getClient)
    .patch(validationMiddleware(Client), client.updateClient)
    .delete(client.deleteClient)

router.route('/client/:id/address')
    .get(client.getClientAddress)

router.route('/client/:id/personal-info')
    .get(client.getClientPersonalInfo)
    .delete(client.deleteClientPersonalInfo)

router.route('/client/:id/profile-picture')
    .get(client.getClientProfilePicture)

router.route('/client/:id/shared-notes')
    .get(client.getClientSharedNotes)

router.route('/search')
    .get(client.getClientByName)

export default router 