import express, { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import ClientController from '../controllers/client.controller.js'

const router: Router = express.Router() 

const clientController: ClientController = new ClientController()
const authController: AuthController = new AuthController()

router.route('/')
    .get(authController.isAdmin, clientController.getAllClients)
    .post(authController.isAdmin, clientController.addClient)

router.route('/:id')
    .get(authController.isLoggedIn, authController.isAuthorized, clientController.getClient)
    .patch(authController.isLoggedIn, authController.isAuthorized, clientController.updateClient)
    .delete(authController.isAdmin, clientController.deleteClient)

router.route('/user/:id') 
    .get(clientController.getClientByUser)

router.route('/client/:id/personal-info')
    .get(authController.isLoggedIn, authController.isAuthorized, clientController.getClientPersonalInfo)
    .delete(authController.isLoggedIn, authController.isAuthorized, clientController.deleteClientPersonalInfo)

export default router 