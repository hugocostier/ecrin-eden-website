import { Request, Response } from 'express'
import { CustomAPIError } from '../errors/custom-errors.js'
import { isAuthorized } from '../utils/isAuthorized.util.js'

/**
 * Base class for all controllers
 * 
 * @abstract
 * @class BaseController
 */
export default abstract class BaseController {
    /**
     * Filter the request body to keep only the properties present in the entity
     * 
     * @method filterRequestBody
     * @memberof BaseController
     * @param {any} body - The request body
     * @param {any} entity - The entity to filter the request body against
     * @returns {Object} The filtered request body
     */
    protected filterRequestBody(body: any, entity: any): Object {
        // Extract only the properties present in the entity
        const validFields = Object.keys(body).filter(key => key in new entity())

        // Create a new object containing only the valid fields
        return validFields.reduce((obj: { [key: string]: any }, key: string) => {
            obj[key] = body[key]
            return obj
        }, {})
    }

    /**
     * Handle a request
     * 
     * @method handleRequest
     * @memberof BaseController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @param {function} serviceCall - The service call to make
     * @param {string} message - The message to return in the response
     * @returns {Promise<void>} A promise that resolves when the request is handled
     */
    public async handleRequest(
        req: Request, 
        res: Response, 
        serviceCall: () => Promise<any>, 
        message?: string, 
        statusCode?: number
    ): Promise<void> {
        try {
            const result: any = await serviceCall()

            if (result.client && !isAuthorized(req, res, result?.client?.id)) {
                res.status(401).json({ error: 'Not authorized' })
                return 
            }

            res.status(statusCode || 200).json({
                success: true,
                msg: message || 'Request successful',
                data: result,
            })
        } catch (error: any) {
            console.error('Error handling request: ', error)

            const statusCode: number = error instanceof CustomAPIError ? error.statusCode : 500
            const errorMessage: string = error instanceof CustomAPIError ? error.message : 'Internal server error'

            res.status(statusCode).json({
                success: false,
                msg: errorMessage,
                error: error.message,
            })
        }
    }
}