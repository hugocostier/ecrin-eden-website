import { DataSourceOptions } from 'typeorm'
import ExpressApp from './app.js'

let expressAppInstance: ExpressApp

/**
 * Creates an instance of the ExpressApp class.
 * 
 * @name createExpressAppInstance
 * @param {DataSourceOptions} dataSourceOptions - The options for the data source.
 * @returns {ExpressApp} - The created instance of the ExpressApp class.
 */
export const createExpressAppInstance = (dataSourceOptions: DataSourceOptions): ExpressApp => {
    expressAppInstance = new ExpressApp(dataSourceOptions) 
    return expressAppInstance
}

/**
 * Returns the instance of the ExpressApp class.
 * 
 * @name getExpressAppInstance
 * @returns {ExpressApp} The instance of the ExpressApp class.
 */
export const getExpressAppInstance = (): ExpressApp => {
    return expressAppInstance
}