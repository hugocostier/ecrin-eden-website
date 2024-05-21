import { Request, Response } from 'express'

/**
 * Middleware to handle 404 errors
 * 
 * @name notFoundMiddleware
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @returns {Response<any, Record<string, any>>} A response with a 404 status code
 */
const notFoundMiddleware = (req: Request, res: Response): Response<any, Record<string, any>> => res.status(404).send('404 - Page Not Found') 

export default notFoundMiddleware