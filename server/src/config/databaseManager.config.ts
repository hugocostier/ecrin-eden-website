import { ConnectionOptions } from 'mysql2'
import * as mysql from 'mysql2/promise'
import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import { createInitialData } from '../data/createInitialData.seed.js'
import { importModels } from '../entities/entities.js'

class DatabaseManager {
    public dataSource!: DataSource
    public dataSourceOptions!: DataSourceOptions

    constructor(private config: DataSourceOptions) {
        this.dataSourceOptions = config
    }

    getDataSource() {
        return this.dataSource
    }

    public async initializeDataSource() {
        const entities = await importModels() 

        this.dataSource = new DataSource({
            ...this.dataSourceOptions, 
            entities, 
        })

        try {
            await this.dataSource.initialize()
        } catch (error: any) {
            if (error.code === 'ER_BAD_DB_ERROR') {
                await this.createDatabaseIfNotExists()
            } else {
                console.error('Error creating database: ', error)
                throw new Error('Error creating database')
            }
        }
    }

    private async createDatabaseIfNotExists() {
        console.log('DATABASE DOES NOT EXIST, CREATING DATABASE...') 

        const access: ConnectionOptions = {
            user: process.env.ADMIN_USER, 
            password: process.env.ADMIN_PASSWORD,
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT || '3306'),
        }

        await mysql.createConnection(access) 
            .then(async (conn) => {
                const database = this.dataSourceOptions.database
                await conn.query(
                    `CREATE DATABASE IF NOT EXISTS \`${database}\``
                )
                await conn.end()
            })
            .catch((error) => {
                console.error('Error creating database: ', error)
                throw new Error('Error creating database')
            })

        await this.initializeDataSource()
        await this.runSeeds()
    }

    public async dropDatabaseIfExists() {
        console.log('DROPPING DATABASE...') 

        const access: ConnectionOptions = {
            user: process.env.ADMIN_USER, 
            password: process.env.ADMIN_PASSWORD,
            database: process.env.ADMIN_DEFAULT_DB,
            host: process.env.MYSQL_HOST,
        }

        const conn = await mysql.createConnection(access) 
        await conn.query(
            'DROP DATABASE IF EXISTS ?', [this.dataSourceOptions.database]
        )
        await conn.end()
    }

    public async disconnectDataSource() {
        if (this.dataSource) {
            await this.dataSource.destroy()
        }
    }

    private async runSeeds() {
        try {
            await createInitialData(this.dataSource)
        } catch (error) {
            console.error('Error running seeds: ', error)
            throw new Error('Error running seeds')
        }
    }
}

export default DatabaseManager