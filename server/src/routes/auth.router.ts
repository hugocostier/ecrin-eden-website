import express from 'express'
import passport from 'passport'
import auth from '../controllers/auth.controller.js'

const router = express.Router() 

// Google authentication 
// router.route('/login/google') 
//     .get(passport.authenticate('google', { scope: ['profile', 'email'] }))

// router.route('/login/google/callback')
//     .get(passport.authenticate('google', { 
//         session: true, 
//         successRedirect: '/', 
//         failureRedirect: '/login', 
//         failureMessage: true
//     }), auth.googleLogin)

// Local authentication 
router.route('/login/password') 
    .post(auth.loginWithPassword)

// Register a new user
router.route('/register')
    .post(auth.register)

// Check if user is logged in
router.route('/current-user')
    .get(auth.currentUser) 

// Logout the user 
router.route('/logout')
    .get(auth.logout)

export default router 