/**
 * Custom Error class to handle custom errors
 * 
 * @class CustomAPIError
 * @property {number} statusCode - the status code of the error
 * @extends Error
 */
class CustomAPIError extends Error {
    statusCode: number
    
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}

/**
 * Function to create a custom error
 * 
 * @param {string} msg - the error message
 * @param {number} statusCode - the status code of the error
 * @returns {never} A new CustomAPIError
 */
const createCustomError = (msg: string, statusCode: number): never => {
    throw new CustomAPIError(msg, statusCode) 
}

export { CustomAPIError, createCustomError }
