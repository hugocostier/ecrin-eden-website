import { Request, Response } from 'express'
import { QueryFailedError } from 'typeorm'
import { CustomAPIError } from '../errors/custom-errors.js'

const errorHandlerMiddleware = (err: Error, req: Request, res: Response) => {
    console.error(err)
    
    if (err instanceof QueryFailedError) {
        return res.status(400).json({
            msg: 'Invalid data provided', 
            success: false
        })
    }

    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({
            msg: err.message, 
            success: false 
        })
    }

    return res.status(500).json({
        msg: 'Something went wrong, please try again later.', 
        success: false
    })
}

export default errorHandlerMiddleware