import express, { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import ContentController from '../controllers/content.controller.js'

const router: Router = express.Router() 

const contentController: ContentController = new ContentController()
const authController: AuthController = new AuthController() 

router.route('/:page')
    .get(contentController.getContent)

router.route('/:page/:section')
    .post(authController.isAdmin, contentController.addContent)

router.route('/:page/:section/:id')
    .patch(authController.isAdmin, contentController.updateContent)
    .delete(authController.isAdmin, contentController.deleteContent)

export default router 