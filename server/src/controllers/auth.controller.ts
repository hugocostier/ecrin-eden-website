import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User } from '../entities/User.js';
import { CustomAPIError } from '../errors/custom-errors.js';
import { AuthService } from '../services/auth.service.js';

class AuthController {
    private _authService = new AuthService()

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
}

export default new AuthController() 