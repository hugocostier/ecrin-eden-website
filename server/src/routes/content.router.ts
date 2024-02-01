import express from 'express'
import content from '../controllers/content.controller.js'

const router = express.Router() 

router.route('/:page')
    .get(content.getContent)

router.route('/:page/:section')
    .post(content.addContent)

router.route('/:page/:section/:id')
    .patch(content.updateContent)
    .delete(content.deleteContent)

export default router 