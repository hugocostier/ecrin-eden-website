import dotenv from 'dotenv'
import { DataSourceOptions } from 'typeorm'
import ExpressApp from './app.js'
import { createExpressAppInstance, getExpressAppInstance } from './appInstance.js'
dotenv.config()

// ############### SERVER AND DATABASE SETUP ###############
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000

const dataSourceOptions: DataSourceOptions = {
    type: 'mysql', 
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    synchronize: !!(process.env.DB_SYNCHRONIZE && process.env.DB_SYNCHRONIZE.toLowerCase() === 'true'),
    logging: !!(process.env.DB_LOGGING && process.env.DB_LOGGING.toLowerCase() === 'true'), 
}

/**
 * Initializes the Express app and starts listening on the specified port.
 * 
 * @async
 * @name initAppAndListen
 * @returns {Promise<void>} A promise that resolves when the app has been initialized and is listening.
 * @throws {Error} If there is an error during app initialization.
 */
export const initAppAndListen = async (): Promise<void> => {
    let expressApp: ExpressApp = getExpressAppInstance() 

    if (!expressApp) {
        expressApp = createExpressAppInstance(dataSourceOptions)
         
        try {
            await expressApp.initializeApp()
        } catch (error: any) {
            console.error(error)
            throw new Error(error)
        }
    }

    expressApp.startListening(port)
}

initAppAndListen()