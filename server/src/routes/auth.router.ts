import express, { Router } from 'express'
import passport from 'passport'
import AuthController from '../controllers/auth.controller.js'
import OTPController from '../controllers/otp.controller.js'

const router: Router = express.Router() 

const authController: AuthController = new AuthController()
const otpController: OTPController = new OTPController() 

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
    .post(authController.loginWithPassword)

// Register a new user
router.route('/register')
    .post(authController.register)

// Verify user email
router.route('/verify-email')
    .post(authController.verifyUser)

// Check if user is logged in
router.route('/current-user')
    .get(authController.currentUser) 

// Logout the user 
router.route('/logout')
    .get(authController.logout)

// Send OTP to user email
router.route('/forgot-password')
    .post(otpController.sendOTP)

// Reset user password
router.route('/reset-password') 
    .post(authController.resetUserPassword)

export default router 