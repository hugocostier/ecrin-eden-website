import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User } from '../entities/User.js';
import { CustomAPIError } from '../errors/custom-errors.js';
import { UserRepository } from '../repositories/user.repository.js';
import { AuthService } from '../services/auth.service.js';
import EmailController from './email.controller.js';

class AuthController {
    private _authService = new AuthService()
    private _userRepository = UserRepository
    private _emailController = EmailController

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password, first_name, last_name } = req.body

            const user = await this._authService.register(email, password, first_name.toLowerCase(), last_name.toLowerCase())

            return res.status(201).json({
                data: user, 
                message: 'User registered successfully'
            })
        } catch (error) {
            if (error instanceof CustomAPIError) {
                return res.status(error.statusCode).json({ 
                    message: error.message 
                })
            }
            next(error)
        }
    }

    public loginWithPassword = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (err: Error, user: User | false, info: { message: string }) => {
            if (err) {
                return next(err)
            }

            if (!user) {
                console.log(info)
                return res.status(401).json({ message: info.message })
            }

            req.logIn(user, (err: Error) => {
                if (err) {
                    return next(err)
                }

                if (req.body.remember_me) {
                    // Set the session to expire in 14 days
                    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 14
                }

                return res.status(201).json({ user: req.user })
            })
        }) (req, res, next)       
    }

    public loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
        // TODO
    }

    public logout = async (req: Request, res: Response, next: NextFunction) => {
        req.logout(() => {
            res.status(200).json({ message: 'Logged out' })
            res.end()
        })
    }

    public currentUser = async (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            return res.status(200).json({ user: req.user, message: 'You are authenticated on the server'})
        }

        return res.status(401).json({ error: 'Not authenticated' })
    }

    public isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            return next() 
        } 

        return res.status(401).json({ error: 'Not authenticated' })
    }

    public isAdmin = async (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated() && req.user?.role === 'admin') {
            return next()
        }

        return res.status(401).json({ error: 'Not authorized' })
    }

    public isAuthorized = async (req: Request, res: Response, next: NextFunction) => {
        // Get the id of the authenticated user
        const userId = req.user?.id

        // Get the id of the ressource owner
        const ressourceId = parseInt(req.params.id)

        // Compare the ids
        if (userId === ressourceId || req.user?.role === 'admin') {
            // If they match, call next()
            return next()
        }
        
        // If they don't match, return 401
        return res.status(401).json({ error: 'Not authorized' })
    }

    public sendOTP = async (req: Request, res: Response, next: NextFunction) => {
        const { recipient_email: email, otp } = req.body 

        // Find the user by email
        const user = await this._userRepository.findOneBy({ email })
            .catch((error) => {
                return next(error)
            }) 

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        if (!this.checkOTP(otp)) {
            return res.status(401).json({ message: 'Invalid OTP' })
        }

        // Generate an expiration date for the OTP
        const otpExpires = new Date(Date.now() + 600000) // 10 minutes

        // Save the OTP and the expiration date to the user
        user.otp = otp.toString()
        user.otpExpires = otpExpires

        // Save the user
        await this._userRepository.save(user)
            .catch((error) => {
                return next(error)
            })

        // Send an email with the otp to the user
        await this._emailController.sendResetPasswordOTP(email, otp)
            .catch((error) => {
                return next(error)
            })

        return res.status(200).json({ message: 'OTP sent to email' })
    }

    public resetUserPassword = async (req: Request, res: Response, next: NextFunction) => {
        const { email, otp, new_password: password } = req.body

        const user = await this._userRepository.findOneBy({ email })
            .catch((error) => {
                return next(error)
            })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        if (!this.checkOTP(otp) || !this.verifyOTP(user, otp)) {
            return res.status(401).json({ message: 'Invalid OTP' })
        }

        // Get user salt
        const salt = user.salt ? user.salt : crypto.randomBytes(16).toString('hex')

        // Hash the new password with the salt
        crypto.scrypt(password, Buffer.from(salt, 'hex'), 32, (err, hashedPassword) => {
            if (err) {
                return next(err)
            }

            // Convert the hashed password to a hex string
            const hashedPasswordString = hashedPassword.toString('hex')

            // Save the new password to the user
            user.password = hashedPasswordString
            user.salt = salt
            user.otp = null
            user.otpExpires = null

            // Save the user
            this._userRepository.save(user)
                .catch((error) => {
                    return next(error)
                })
        }) 

        return res.status(200).json({ message: 'Password reset' })
    }

    private checkOTP = (otp: string) => {
        const otpRegex = /^[0-9]{4}$/ // Regex for a 4-digit OTP
    
        // Check if the OTP is valid
        return otpRegex.test(otp)
    }

    private verifyOTP = (user: User, otp: string) => {        
        // Check if the user has an OTP and an OTP expiration date
        if (!user.otp || !user.otpExpires) {
            return false
        }

        const now = Date.now() // Get the current time
        const otpTime = new Date(user.otpExpires).getTime() // Get the time the token expires

        // Check if the OTP has expired (10 minutes)
        if (otpTime - now <= 0) {
            return false && { message: 'OTP expired' }
        }

        // Check if the OTP matches the user's OTP
        return user.otp === otp.toString()
    }
}

export default new AuthController() 