import express from 'express'
import auth from '../controllers/auth.controller.js'
import client from '../controllers/client.controller.js'
import { Client } from '../entities/Client.js'
import { validationMiddleware } from '../middlewares/validation.js'

const router = express.Router() 

router.route('/')
    .get(auth.isAdmin, client.getAllClients)
    .post(auth.isAdmin, validationMiddleware(Client), client.addClient)

router.route('/:id')
    .get(auth.isLoggedIn, auth.isAuthorized, client.getClient)
    .patch(auth.isLoggedIn, auth.isAuthorized, validationMiddleware(Client), client.updateClient)
    .delete(auth.isAdmin, client.deleteClient)

// router.route('/client/:id/address')
//     .get(client.getClientAddress)

router.route('/client/:id/personal-info')
    .get(auth.isLoggedIn, auth.isAuthorized, client.getClientPersonalInfo)
    .delete(auth.isLoggedIn, auth.isAuthorized, client.deleteClientPersonalInfo)

router.route('/client/:id/profile-picture')
    .get(auth.isLoggedIn, auth.isAuthorized, client.getClientProfilePicture)

// router.route('/client/:id/shared-notes')
//     .get(client.getClientSharedNotes)

router.route('/search/:firstName/:lastName')
    .get(auth.isAdmin, client.getClientByName)

export default router 