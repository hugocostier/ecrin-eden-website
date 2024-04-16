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

// Authentication 
import MongoDBStoreFactory from 'connect-mongodb-session'
import session from 'express-session'
import passport from 'passport'
import passportConfig from './config/auth.config.js'

// Other 
import cors, { CorsOptions } from 'cors'
import 'express-async-errors'
import morgan from 'morgan'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// Middleware
import multer from './config/multer.config.js'
import errorHandlerMiddleware from './middlewares/error-handler.js'
import notFoundMiddleware from './middlewares/not-found.js'

// Routers
import appointmentRouter from './routes/appointment.router.js'
import authRouter from './routes/auth.router.js'
import clientRouter from './routes/client.router.js'
import contentRouter from './routes/content.router.js'
import formRouter from './routes/form.router.js'
import preferencesRouter from './routes/preferences.router.js'
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
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// JSON parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Multer 
app.use(multer.single('profile_picture'))

// Static files
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

// Authentication 
app.use(passportConfig.initialize())

// Store 
const MongoDBStore = MongoDBStoreFactory(session)

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI ? process.env.MONGODB_URI : '', 
    databaseName: 'ecrin-eden-website', 
    collection: 'sessions', 
    expires: 1000 * 60 * 60 * 24 * 7,
}, (error) => {
    if (error) {
        console.log(error)
    }
})

app.use(session({
    secret: process.env.SESSION_SECRET ? process.env.SESSION_SECRET : '', 
    resave: false, 
    saveUninitialized: false, 
    store: store, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, 
        secure: process.env.NODE_ENV === 'production' ? true : 'auto', 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
        httpOnly: true
    }, 
}))

app.use(passport.authenticate('session'))

/**
 * ############### ROUTES ###############
 */
app.use('/api/v1/content', contentRouter)
app.use('/api/v1/clients', clientRouter)
app.use('/api/v1/appointments', appointmentRouter)
app.use('/api/v1/services', serviceRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/form', formRouter)
app.use('/api/v1/preferences', preferencesRouter)

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