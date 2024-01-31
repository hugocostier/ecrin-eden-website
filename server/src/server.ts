/**
 * ############### IMPORTS ###############
 */
// Dotenv 
import * as dotenv from 'dotenv'
dotenv.config() 

// Express
import express, { Request, Response } from 'express'
const app = express() 

// Database 
import AppDataSource from './config/mysql.config.js'


/**
 * ############### GENERAL SETUP ###############
 */





/**
 * ############### ROUTES ###############
 */
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World') 
})



/**
 * ############### SERVER SETUP ###############
 */
const port = process.env.PORT || 3000 

const startServer = async () => { 
    try { 
        await AppDataSource.initialize() 

        app.listen(port, () => console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

export default { startServer }