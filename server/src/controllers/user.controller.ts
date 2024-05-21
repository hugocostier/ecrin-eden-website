import { Request, Response } from 'express'
import User from '../entities/User.entity.js'
import { UserService } from '../services/user.service.js'
import BaseController from './base.controller.js'

/**
 * Controller for users
 * 
 * @class UserController
 * @extends BaseController
 * @property {UserService} _userService - Instance of UserService
 */
export default class UserController extends BaseController {
    private _userService: UserService = new UserService()

    /**
     * Get all users
     * 
     * @method getAllUsers
     * @memberof UserController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the users are returned.
     */
    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const users: User[] = await this._userService.getAllUsers()

            return users.map((user) => {
                return {
                    email: user.email, 
                    role: user.role
                }
            })
        }) 
    }

    /**
     * Get a user by ID
     * 
     * @method getUser
     * @memberof UserController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the user is returned.
     */
    public getUser = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { id: userId } = req.params

            return await this._userService.getUser(userId)
        }) 
    }

    /**
     * Get a user by email
     * 
     * @method getUserByEmail
     * @memberof UserController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the user is returned.
     */
    public getUserByEmail = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { email } = req.params

            return await this._userService.getUserEmailAndRole(email)
        })
    }

    /**
     * Update a user
     * 
     * @method updateUser
     * @memberof UserController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the user is updated.
     */
    public updateUser = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { id: userId } = req.params

            const validRequestBody: Partial<User> = this.filterRequestBody(req.body, User)

            return await this._userService.updateUser(userId, validRequestBody)
        }, 'User updated successfully')
    }

    /**
     * Delete a user
     * 
     * @method deleteUser
     * @memberof UserController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the user is deleted.
     */
    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { id: userId } = req.params

            return await this._userService.deleteUser(userId)
        }, 'User deleted successfully', 204)
    }
}