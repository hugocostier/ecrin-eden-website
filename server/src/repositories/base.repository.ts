import { DataSource } from 'typeorm'
import { getExpressAppInstance } from '../appInstance.js'
import DatabaseManager from '../config/databaseManager.config.js'

/**
 * Base class for all repositories.
 *
 * @abstract
 * @class BaseRepository
 * @property {DataSource} dataSource - The data source for the repository.
 * @property {DatabaseManager} dbManager - The database manager for the repository.
 */
export default abstract class BaseRepository {
    protected dataSource!: DataSource
    private dbManager!: DatabaseManager

    /**
     * Initializes the data source for the repository by getting the database manager and the data source.
     * If the database manager is not available, it will attempt to retrieve it from the express app instance.
     *
     * @async
     * @method initializeDataSource
     * @memberof BaseRepository
     * @returns {Promise<void>} A promise that resolves once the data source is initialized.
     */
    protected async initializeDataSource(): Promise<void> {
        if (!this.dbManager) {
            this.dbManager = getExpressAppInstance()?.dbManager
        }

        if (!this.dataSource) {
            this.dataSource = this.dbManager.getDataSource()
        }
    }
}