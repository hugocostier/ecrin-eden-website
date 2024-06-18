import crypto from 'crypto'
import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import User from '../entities/User.entity.js'
import { AuthService } from '../services/auth.service.js'
import { UserService } from '../services/user.service.js'
import BaseController from './base.controller.js'
import EmailController from './email.controller.js'

/**
 * Controller that manages the authentication and authorization of users.
 * 
 * @class AuthController
 * @property {AuthService} _authService - The `AuthService` instance to manage user authentication.
 * @property {UserService} _userService - The `UserService` instance to manage user data.
 * @property {EmailController} _emailController - The `EmailController` instance to manage email communication.
 */
export default class AuthController extends BaseController {
    private _authService: AuthService = new AuthService()
    private _userService: UserService = new UserService()
    private _emailController: EmailController = new EmailController()

    /**
     * Registers a new user
     * 
     * @async
     * @method register
     * @memberof AuthController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @param {NextFunction} next - The next function
     * @returns {Promise<Response<any, Record<string, any>> | undefined>} A response object with a status code and a message or the next function if an error occurs
     */
    public register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        await this.handleRequest(req, res, async () => {
            const { email, password, first_name, last_name } = req.body
            
            const token = crypto.randomBytes(32).toString('hex')
            console.log('Token: ', token)

            const registeredUser: { id: number, email: string } = await this._authService.register(email, password, first_name.toLowerCase(), last_name.toLowerCase(), token) 
            .then(async (user) => {
                await this._emailController.sendVerificationLink(email, token)
                    .catch((error: any) => {
                        return res.status(500).json({ error: 'Error sending verification email' })
                    })

                return user
            }) 

            return registeredUser
        }, 'User registered successfully')
    }

    /**
     * Logs in a user with a password
     * 
     * @async
     * @method loginWithPassword
     * @memberof AuthController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @param {NextFunction} next - The next function
     * @returns {Promise<void>} A response object with a status code and a message or the next function if an error occurs
     */
    public loginWithPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        passport.authenticate('local', (err: Error, user: User | false, info: { message: string }) => {
            if (err) {
                return next(err)
            }

            if (!user) {
                return res.status(401).json({ message: info.message })
            }

            req.logIn(user, (err: Error) => {
                if (err) {
                    return next(err)
                }

                if (req.body.remember_me) {
                    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 14 // Set the session to expire in 14 days
                }

                return res.status(201).json({ user: req.user })
            })
        }) (req, res, next)       
    }

    public loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
        // TODO
    }

    /**
     * Logs out a user
     * 
     * @method logout
     * @memberof AuthController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @param {NextFunction} next - The next function
     * @returns {void} A response object with a status code and a message or the next function if an error occurs
     */
    public logout = (req: Request, res: Response, next: NextFunction): void => {
        req.logout(() => {
            res.status(200).json({ message: 'Logged out' })
            res.end()
        })
    }

    /**
     * Gets the current user
     * 
     * @method currentUser
     * @memberof AuthController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @param {NextFunction} next - The next function
     * @returns {Response<any, Record<string, any>>} A response object with a status code and a message or the next function if the user is logged in
     */
    public currentUser = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> => {
        if (req.isAuthenticated()) {
            return res.status(200).json({ user: req.user, message: 'You are authenticated on the server'})
        }

        return res.status(401).json({ error: 'Not authenticated' })
    }

    /**
     * Verifies a user
     * 
     * @async
     * @method verifyUser
     * @memberof AuthController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @param {NextFunction} next - The next function
     * @returns {Promise<void>} A response object with a status code and a message or the next function if an error occurs
     */
    public verifyUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { token, email } = req.params

            return await this._authService.verifyUser(email, token)
        }, 'User verified successfully')
    }

    /**
     * Checks if the user is logged in
     * 
     * @method isLoggedIn
     * @memberof AuthController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @param {NextFunction} next - The next function
     * @returns {void | Response<any, Record<string, any>>} A response object with a status code and a message or the next function if the user is logged in
     */
    public isLoggedIn = (req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>> => {
        if (req.isAuthenticated()) {
            return next() 
        } 

        return res.status(401).json({ error: 'Not authenticated' })
    }

    /**
     * Checks if the user is an admin
     * 
     * @method isAdmin
     * @memberof AuthController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @param {NextFunction} next - The next function
     * @returns {void | Response<any, Record<string, any>>} A response object with a status code and a message or the next function if the user is an admin
     */
    public isAdmin = (req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>> => {
        const user: User = req.user as User

        if (req.isAuthenticated() && user.role === 'admin') {
            return next()
        }

        return res.status(401).json({ error: 'Not authorized' })
    }

    /**
     * Resets the password of a user
     * 
     * @async
     * @method resetUserPassword
     * @memberof AuthController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @param {NextFunction} next - The next function
     * @returns {Promise<Response<any, Record<string, any>>>} A response object with a status code and a message or the next function if an error occurs
     */
    public resetUserPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { email, otp, new_password: password } = req.body

            return await this._authService.resetPassword(email, otp, password)
        }, 'Password reset successfully')
    }
}