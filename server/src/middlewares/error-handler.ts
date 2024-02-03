import { Request, Response } from 'express'
import { QueryFailedError } from 'typeorm'
import { CustomAPIError } from '../errors/custom-errors.js'

const errorHandlerMiddleware = (err: Error, req: Request, res: Response) => {
    console.log(err)

    if (err instanceof QueryFailedError) {
        const errorMessage = err.message || 'Database query failed'

        return res.status(500).json({
            msg: errorMessage, 
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