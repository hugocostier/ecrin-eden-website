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
    .get(authController.isLoggedIn, clientController.getClient)
    .patch(authController.isLoggedIn, clientController.updateClient)

router.route('/delete/:id')
    .patch(authController.isAdmin, clientController.deleteClient)

router.route('/user/:id') 
    .get(authController.isLoggedIn, clientController.getClientByUser)

router.route('/delete-personal-info/:id')
    .patch(authController.isLoggedIn, clientController.deleteClientPersonalInfo)

router.route('/personal-info/:id')
    .get(authController.isLoggedIn, clientController.getClientPersonalInfo)

export default router 