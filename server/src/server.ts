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

// Other 
import cors, { CorsOptions } from 'cors'
import 'express-async-errors'
import morgan from 'morgan'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// Middleware
import errorHandlerMiddleware from './middlewares/error-handler.js'
import notFoundMiddleware from './middlewares/not-found.js'

// Routers
import appointmentRouter from './routes/appointment.router.js'
import authRouter from './routes/auth.router.js'
import clientRouter from './routes/client.router.js'
import contentRouter from './routes/content.router.js'
import serviceRouter from './routes/service.router.js'
import userRouter from './routes/user.router.js'


/**
 * ############### GENERAL SETUP ###############
 */
// Morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// CORS policy
const corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}
app.use(cors(corsOptions))

// JSON parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static files
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(path.resolve(__dirname, '../../client')))


/**
 * ############### ROUTES ###############
 */
app.use('/api/v1/content', contentRouter)
app.use('/api/v1/clients', clientRouter)
app.use('/api/v1/appointments', appointmentRouter)
app.use('/api/v1/services', serviceRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../../client', 'index.html'))
})

// Error handling
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)


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