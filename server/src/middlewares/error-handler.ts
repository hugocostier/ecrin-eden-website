import { Request, Response } from 'express'
import { QueryFailedError } from 'typeorm'
import { CustomAPIError } from '../errors/custom-errors.js'

/**
 * Middleware to handle errors
 * 
 * @name errorHandlerMiddleware
 * @param {Error} err - error object
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @returns {Response<any, Record<string, any>>} A response with an error message
 */
const errorHandlerMiddleware = (err: Error, req: Request, res: Response): void => {
    console.error(err)
    
    if (err instanceof QueryFailedError) {
        res.status(400).json({
            msg: 'Invalid data provided', 
            success: false
        })
    }

    if (err instanceof CustomAPIError) {
        res.status(err.statusCode).json({
            msg: err.message, 
            success: false 
        })
    }

    res.status(500).json({
        msg: 'Something went wrong, please try again later.', 
        success: false
    })
}

export default errorHandlerMiddleware