import { UpdateResult } from 'typeorm'
import Preferences from '../entities/Preferences.entity.js'
import BaseRepository from './base.repository.js'

/**
 * The `PreferencesRepository` class extends the `BaseRepository` class and adds custom requests for preferences data.
 * 
 * @class PreferencesRepository
 * @extends BaseRepository
 */
export class PreferencesRepository extends BaseRepository {
    /**
     * Initializes the data source and returns an extended repository with custom requests for preferences data.
     * 
     * @async
     * @method extendPreferencesRepository
     * @memberof PreferencesRepository
     * @throws {Error} If there is an error extending the preferences repository.
     * @returns The extended preferences repository.
     */
    public async extendPreferencesRepository() {
        try { 
            await this.initializeDataSource() 
            return this.preferencesRepository()
        } catch (error: any) {
            console.error('Error extending preferences repository: ', error)
            throw new Error(error)
        }
    }
    
    /**
     * Adds custom requests to the preferences repository.
     * 
     * @method preferencesRepository
     * @memberof PreferencesRepository
     * @returns The extended preferences repository.
     */
    private async preferencesRepository() {
        return this.dataSource.getRepository(Preferences).extend({
            /**
             * Finds the preferences for a client by their id and returns the data.
             * 
             * @async
             * @method findPreferencesForClient
             * @memberof preferencesRepository
             * @param {string} clientId - The id of the client to find preferences for.
             * @returns {Promise<Preferences | null>} The preferences data or null if the preferences are not found.
             */
            async findPreferencesForClient(clientId: string): Promise<Preferences | null> {
                return await this.createQueryBuilder('preferences') 
                    .leftJoin('preferences.client', 'client')
                    .select([
                        'preferences',
                        'client.id'
                    ])
                    .where('client.id = :clientId', { clientId })
                    .getOne()
            }, 
        
            /**
             * Updates the preferences for a client by their id and returns the result.
             * 
             * @async
             * @method updatePreferences
             * @memberof preferencesRepository
             * @param {string} clientId - The id of the client to update preferences for.
             * @param {Partial<Preferences>} preferences - The preferences to update.
             * @returns {Promise<UpdateResult>} The result of the update operation.
             */
            async updatePreferences(clientId: string, preferences: Partial<Preferences>): Promise<UpdateResult> {
                return await this.createQueryBuilder('preferences')
                    .update()
                    .set(preferences)
                    .where('client_id = :clientId', { clientId })
                    .execute()
            }
        })
    }
}