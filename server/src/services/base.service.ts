import { validate, ValidationError } from "class-validator"
import { CustomAPIError } from "../errors/custom-errors.js"

/**
 * Base class for all services
 * 
 * @abstract
 * @class BaseService   
 */
export default abstract class BaseService {
    /**
     * Validate an entity
     * 
     * @async 
     * @method validateEntity
     * @memberof BaseService
     * @template T
     * @param {Partial<T>} entity - The entity to validate
     * @param {T} entityClass - The entity class
     * @returns {Promise<void>} A promise that resolves when the entity is validated
     */
    protected async validateEntity<T extends object>(entity: Partial<T>, entityClass: new () => T): Promise<void> {
        const instance: T = new entityClass()
        Object.assign(instance, entity)

        const errors: ValidationError[] = await validate(instance, { skipMissingProperties: true })

        if (errors.length > 0) {
            let relevantErrors: string = ''
            
            errors.forEach(error => {
                const constraints = error.constraints

                if (constraints) {
                    relevantErrors += Object.values(constraints).join(', ') + '. '
                }
            })

            throw new CustomAPIError(relevantErrors, 400)
        }
    }
}