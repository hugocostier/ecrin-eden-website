import { Request, Response } from 'express'
import asyncHandler from '../middlewares/async.js'
import { UserService } from '../services/user.service.js'

class UserController {
    private _userService = new UserService

    public getAllUsers = asyncHandler(async (req: Request, res: Response) => {
        const users = await this._userService.getAllUsers()

        const usersList = users.map((user) => {
            return {
                email: user.email, 
                role: user.role
            }
        })

        res.status(200).json({
            success: true,
            data: usersList
        })
    })

    public getUser = asyncHandler(async (req: Request, res: Response) => {
        const { id: userId } = req.params

        const user = await this._userService.getUser(userId)

        res.status(200).json({
            success: true,
            data: user
        })
    })

    public getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.params

        const user = await this._userService.getUserByEmail(email)

        res.status(200).json({
            success: true,
            data: user
        })
    }) 

    public updateUser = asyncHandler(async (req: Request, res: Response) => {
        const { id: userId } = req.params

        const user = await this._userService.updateUser(userId, req.body)

        res.status(200).json({
            success: true,
            data: user
        })
    })

    public deleteUser = asyncHandler(async (req: Request, res: Response) => {
        const { id: userId } = req.params

        await this._userService.deleteUser(userId)

        res.status(200).json({
            success: true,
            msg: 'User deleted successfully'
        })
    }) 
}

export default new UserController()