import { Request, Response } from 'express'
import User from '../entities/User.entity.js'

/**
 * Checks if the user is authorized to access a ressource
 * 
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {number} ownerId - The id of the ressource owner
 * @returns {boolean} A boolean indicating if the user is authorized
 */
export const isAuthorized = (req: Request, res: Response, ownerId: string): boolean => {
    // Get the user from the request
    const user: User = req.user as User

    // Allow access to the add appointment route if the user is not authenticated
    if (req.originalUrl === '/api/v1/appointments/add') {
        return true 
    }

    // Check if the user is authenticated and if the user is the owner of the ressource
    if (req.isAuthenticated() && ((user.client?.id === ownerId) || user.role === 'admin')) {
        return true
    }

    return false
}