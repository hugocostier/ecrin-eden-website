import express from 'express'
import auth from '../controllers/auth.controller.js'
import user from '../controllers/user.controller.js'

const router = express.Router()

router.route('/') 
    .get(auth.isAdmin, user.getAllUsers)

router.route('/:id')
    .get(auth.isLoggedIn, auth.isAuthorized, user.getUser)
    .patch(auth.isLoggedIn, auth.isAuthorized, user.updateUser)
    .delete(auth.isLoggedIn, auth.isAuthorized, user.deleteUser)

router.route('/email/:email')
    .get(auth.isAdmin, user.getUserByEmail)

export default router 