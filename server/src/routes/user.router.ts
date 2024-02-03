import express from 'express'
import user from '../controllers/user.controller.js'

const router = express.Router()

router.route('/') 
    .get(user.getAllUsers)

router.route('/:id')
    .get(user.getUser)
    .put(user.updateUser)
    .delete(user.deleteUser)

router.route('/email/:email')
    .get(user.getUserByEmail)

export default router 