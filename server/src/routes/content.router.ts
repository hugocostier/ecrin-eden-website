import express from 'express'
import auth from '../controllers/auth.controller.js'
import content from '../controllers/content.controller.js'

const router = express.Router() 

router.route('/:page')
    .get(content.getContent)

router.route('/:page/:section')
    .post(auth.isAdmin, content.addContent)

router.route('/:page/:section/:id')
    .patch(auth.isAdmin, content.updateContent)
    .delete(auth.isAdmin, content.deleteContent)

export default router 