import express, { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import UserController from '../controllers/user.controller.js'

const router: Router = express.Router()

const userController: UserController = new UserController() 
const authController: AuthController = new AuthController()

router.route('/') 
    .get(authController.isAdmin, userController.getAllUsers)

router.route('/:id')
    .get(authController.isLoggedIn, authController.isAuthorized, userController.getUser)
    .patch(authController.isLoggedIn, authController.isAuthorized, userController.updateUser)
    .delete(authController.isLoggedIn, authController.isAuthorized, userController.deleteUser)

router.route('/email/:email')
    .get(authController.isAdmin, userController.getUserByEmail)

export default router 