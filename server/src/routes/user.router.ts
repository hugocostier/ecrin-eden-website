import express, { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import UserController from '../controllers/user.controller.js'

const router: Router = express.Router()

const userController: UserController = new UserController() 
const authController: AuthController = new AuthController()

router.route('/') 
    .get(authController.isAdmin, userController.getAllUsers)

router.route('/:id')
    .get(authController.isLoggedIn, userController.getUser)
    .patch(authController.isLoggedIn, userController.updateUser)

router.route('/delete-account')
    .delete(authController.isLoggedIn, userController.deleteUser)

router.route('/email/:email')
    .get(authController.isAdmin, userController.getUserByEmail)

export default router 