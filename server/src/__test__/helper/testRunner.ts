import { Express } from 'express'
import { BaseEntity, DataSourceOptions, DeleteResult, Repository } from 'typeorm'
import ExpressApp from '../../app.js'
import { createExpressAppInstance } from '../../appInstance.js'
import DatabaseManager from '../../config/databaseManager.config.js'

export default class TestApp {
    private expressApp: ExpressApp
    private dataSourceOptions: DataSourceOptions = {
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB + '_test', 
        synchronize: true,
        dropSchema: true,
    }
    
    constructor() {
        this.expressApp = createExpressAppInstance(this.dataSourceOptions)
    }
    
    private getPort(): number {
        const min = 3000
        const max = 8000
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    public getDatabaseManager(): DatabaseManager {
        return this.expressApp.dbManager
    }

    public getRepository<T extends BaseEntity>(entity: new () => T): Repository<T> {
        return this.getDatabaseManager().getDataSource().getRepository(entity)
    }

    public getApp(): Express {
        return this.expressApp.app 
    }

    public async cleanUpDatabase<T extends BaseEntity>(entity: new () => T): Promise<DeleteResult> {
        return this.getRepository(entity).createQueryBuilder()
            .delete()
            .from(entity)
            .execute()
    }

    public async startApp() {
        const port = this.getPort()

        if (!this.expressApp) {
            this.expressApp = createExpressAppInstance(this.dataSourceOptions)
        }

        try { 
            await this.expressApp.initializeApp()
            this.expressApp.startListening(port)
        } catch (error: any) {
            console.error(error)
            throw new Error(error)
        }
    }

    public async stopApp() {
        this.expressApp.stopListening() 
        await this.expressApp.dbManager.disconnectDataSource()  
        // await this.expressApp.dbManager.dropDatabaseIfExists()
    }
}