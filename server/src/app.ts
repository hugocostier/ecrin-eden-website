// ############## IMPORTS ###############
// Express
import express, { Express } from 'express'

// Database 
import { DataSourceOptions } from 'typeorm'
import DatabaseManager from './config/databaseManager.config.js'

// Authentication 
import MongoDBStoreFactory from 'connect-mongodb-session'
import session from 'express-session'
import passport from 'passport'
import passportConfig from './config/auth.config.js'

// Other 
import cookieParser from 'cookie-parser'
import cors, { CorsOptions } from 'cors'
import 'express-async-errors'
import morgan from 'morgan'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// Middleware
import multer from './config/multer.config.js'
import errorHandlerMiddleware from './middlewares/error-handler.js'
import notFoundMiddleware from './middlewares/not-found.js'

// Routes 
import apiRoutes from './routes/routes.js'

/**
 * Represents an Express application with database management and middleware setup.
 *
 * @class ExpressApp
 * @property {Express} app - The Express application.
 * @property {DatabaseManager} dbManager - The database manager.
 * @property {any} server - The server instance.
 */
class ExpressApp {
    public app: Express 
    public dbManager: DatabaseManager 

    private server: any

    constructor(dataSourceOptions: DataSourceOptions) {
        this.app = express() 
        this.dbManager = new DatabaseManager(dataSourceOptions)
    }

    /**
     * Starts the server and listens on the specified port.
     * 
     * @memberof ExpressApp
     * @method startListening
     * @param {number} port - The port number on which the server should listen.
     * @throws {Error} - If there is an error starting the server.
     * @returns {void}
     */
    public startListening(port: number): void {
        this.server = this.app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    }

    /**
     * Stops the server from listening.
     * 
     * @memberof ExpressApp
     * @method stopListening
     * @returns {void}
     */
    public stopListening(): void {
        if (this.server) {
            this.server.close(() => {}) 
        }
    }

    /**
     * Connects to the database by initializing the data source.
     * 
     * @memberof ExpressApp
     * @async
     * @method connectToDatabase
     * @throws {Error} - If there is an error initializing the data source.
     * @returns {Promise<void>} A promise that resolves when the database connection is established.
     */
    private async connectToDatabase(): Promise<void> {
        try {
            await this.dbManager.initializeDataSource() 
        } catch (error) {
            console.error(error)
            throw new Error('Error connecting to the database')
        }
    }

    /**
     * Sets up the middlewares for the Express app.
     * 
     * @memberof ExpressApp
     * @method setupMiddlewares
     * @returns {void}
     */
    private setupMiddlewares(): void {
        // Morgan
        if (process.env.NODE_ENV === 'development') {
            this.app.use(morgan('dev'))
        }

        // CORS policy
        const corsOptions: CorsOptions = {
            origin: process.env.CLIENT_URL,
            credentials: true,
            optionsSuccessStatus: 200
        }
        this.app.use(cors(corsOptions))

        // JSON parser
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        // Cookie parser 
        this.app.use(cookieParser())

        // Multer 
        this.app.use(multer.single('profile_picture'))

        // Static files
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = dirname(__filename)

        this.app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

        // MongoDB Store 
        const MongoDBStore = MongoDBStoreFactory(session)
        const store = new MongoDBStore({
            uri: process.env.MONGODB_URI ? process.env.MONGODB_URI : '', 
            databaseName: 'ecrin-eden-website', 
            collection: 'sessions', 
            expires: 1000 * 60 * 60 * 24 * 7,
        }, (error) => {
            if (error) {
                console.error(error)
            }
        })

        this.app.use(session({
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

        // Authentication 
        this.app.use(passportConfig.initialize())
        this.app.use(passport.authenticate('session'))
    }

    /**
     * Sets up the routes for the Express app.
     * 
     * @memberof ExpressApp
     * @method setupRoutes
     * @returns {void}
     */
    private setupRoutes(): void {
        this.app.use('/api/v1', apiRoutes) 
    }

    /**
     * Initializes the Express app by connecting to the database, setting up middlewares, routes, and error handling.
     * 
     * @memberof ExpressApp
     * @async
     * @method initializeApp
     * @throws {Error} - If there is an error initializing the database or setting up the middlewares.
     * @returns {Promise<void>} A promise that resolves when the app is fully initialized.
     */
    public async initializeApp(): Promise<void> {
        console.log('Initializing app...')
        await this.connectToDatabase() 
        console.log('Database connected')
        this.setupMiddlewares() 
        console.log('Middlewares set up')
        this.setupRoutes()
        console.log('Routes set up')
        this.app.use(errorHandlerMiddleware)
        this.app.use(notFoundMiddleware)
        console.log('Error handling set up')
        console.log('App initialized')
    }
}

export default ExpressApp