import { Repository } from 'typeorm'
import { UpdateResult } from 'typeorm/browser'
import Preferences from '../entities/Preferences.entity.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import { PreferencesRepository } from '../repositories/preferences.repository.js'
import BaseService from './base.service.js'

/**
 * Service for handling preferences
 * 
 * @class Preferences
 * @extends BaseService
 * @property {PreferencesRepository} _customRepository - Instance of the custom repository for preferences
 * @property {Repository<Preferences> & { findPreferencesForClient(clientId: number): Promise<Preferences | null>; updatePreferences(clientId: number, preferences: Partial<Preferences>): Promise<UpdateResult>; }} _preferencesRepository - The extended preferences repository
 */
export class PreferencesService extends BaseService {
    private _customRepository: PreferencesRepository = new PreferencesRepository()
    private _preferencesRepository!: Repository<Preferences> & {
        findPreferencesForClient(clientId: number): Promise<Preferences | null>;
        updatePreferences(clientId: number, preferences: Partial<Preferences>): Promise<UpdateResult>;
    }

    /**
     * Extends the preferences repository by assigning the result of the 'extendPreferencesRepository' method to the '_preferencesRepository' property
     * 
     * @async
     * @method extendPreferencesRepository
     * @memberof PreferencesService
     * @throws {Error} If there is an error extending the preferences repository
     * @returns {Promise<void>} A promise that resolves if the preferences repository is successfully extended
     */
    private async extendPreferencesRepository(): Promise<void> {
        try {
            this._preferencesRepository = await this._customRepository.extendPreferencesRepository()
        } catch(error: any) {
            console.error('Error extending preferences repository: ', error)
            throw new CustomAPIError('Error extending preferences repository', 500)
        }
    }

    /**
     * Retrieves all preferences for a client
     * 
     * @async
     * @method getPreferencesForClient
     * @memberof PreferencesService
     * @param {string} clientId - The id of the client
     * @throws {CustomAPIError} If there is an error getting the preferences
     * @returns {Promise<Preferences>} A promise that resolves with the preferences for the client
     */
    public async getPreferencesForClient(clientId: string): Promise<Preferences | null> {
        if (!this._preferencesRepository) {
            await this.extendPreferencesRepository()
        }

        try {
            return await this._preferencesRepository.findPreferencesForClient(parseInt(clientId))
        } catch (error: any) {
            console.error('Error getting preferences: ', error)
            throw new CustomAPIError('Error getting preferences', 500)
        }
    }

    /**
     * Adds preferences for a client
     * 
     * @async
     * @method addPreferences
     * @memberof PreferencesService
     * @param {Partial<Preferences>} preferences - The preferences to add
     * @returns {Promise<Preferences>} A promise that resolves with the newly added preferences
     */
    public async addPreferences(preferences: Partial<Preferences>): Promise<Preferences> {
        if (!this._preferencesRepository) {
            await this.extendPreferencesRepository()
        }

        try {
            await this.validateEntity(preferences, Preferences)

            return await this._preferencesRepository.save(preferences)
                .catch((error: any) => {
                    console.error('Error adding preferences: ', error)
                    throw new CustomAPIError('Preferences could not be added', 400)
                }) 
        } catch (error: any) {
            throw error 
        }
    }

    /**
     * Updates preferences for a client
     * 
     * @async
     * @method updatePreferences
     * @memberof PreferencesService
     * @param {string} clientId - The id of the client
     * @param {Partial<Preferences>} preferences - The preferences to update
     * @returns {Promise<UpdateResult>} A promise that resolves with the result of the update operation
     */
    public async updatePreferences(clientId: string, preferences: Partial<Preferences>): Promise<UpdateResult> {
        if (!this._preferencesRepository) {
            await this.extendPreferencesRepository()
        }
        
        try {
            await this.validateEntity(preferences, Preferences)
            
            return await this._preferencesRepository.manager.transaction(async transactionalEntityManager => {
                if (!await this.checkIfPreferencesExist(clientId)) {
                    throw new CustomAPIError('Preferences do not exist for this client', 404)
                }

                return await transactionalEntityManager.update(Preferences, { client: { id: parseInt(clientId) } }, preferences)
                    .catch((error: any) => {
                        console.error('Error updating preferences: ', error)
                        throw new CustomAPIError(`Preferences for client ${clientId} could not be updated`, 400)
                    }) 
            })
        } catch (error: any) {
            throw error 
        }
    }

    /**
     * Checks if preferences exist for a client
     * 
     * @async
     * @method checkIfPreferencesExist
     * @memberof PreferencesService
     * @param {string} clientId - The id of the client
     * @returns {Promise<boolean>} A promise that resolves with true if preferences exist for the client, false otherwise
     */
    private async checkIfPreferencesExist(clientId: string): Promise<boolean> {
        if (!this._preferencesRepository) {
            await this.extendPreferencesRepository()
        }

        try { 
            const preferences: number = await this._preferencesRepository.countBy({ client: { id: parseInt(clientId) } })

            return preferences > 0 
        
        } catch (error: any) {
            console.error('Error checking if preferences exist: ', error)
            throw new CustomAPIError('Error checking if preferences exist', 500)
        }
    }
}