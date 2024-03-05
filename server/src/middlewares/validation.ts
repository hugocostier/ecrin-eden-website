import { ValidationError, validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

export const validationMiddleware = <T extends object>(type: new () => T) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const instance = new type() 

        Object.keys(req.body).forEach((key: string) => {        
            instance[key as keyof T] = req.body[key]
        }) 

        const errors: ValidationError[] = await validate(instance, { stopAtFirstError: true })

        if (errors.length > 0) {
            const relevantErrors: { [key: string]: string } = {}

            errors.forEach(error => {
                const constraints = error.constraints

                if (constraints) {
                    relevantErrors[error.property] = Object.values(constraints).join(', ')
                }
            })

            return res.status(400).json({
                msg: relevantErrors, 
                success: false
            })
        }

        next() 
    }
}