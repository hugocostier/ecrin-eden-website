import { NextFunction, Request, Response } from 'express'

/**
 * Wrapper for async functions
 * 
 * @function asyncWrapper
 * @param {Function} fn - The async function to wrap
 * @returns {Function} A function that wraps the async function
 */
const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>): Function => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next) 
        } catch (error) {
            next(error)
        }
    }
}

export default asyncWrapper