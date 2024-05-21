import express, { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import PreferencesController from '../controllers/preferences.controller.js'

const router: Router = express.Router() 

const preferencesController: PreferencesController = new PreferencesController() 
const authController: AuthController = new AuthController()

router.route('/:id')
    .get(authController.isLoggedIn, authController.isAuthorized, preferencesController.getPreferencesForClient)
    .patch(authController.isLoggedIn, authController.isAuthorized, preferencesController.updatePreferences)

export default router 