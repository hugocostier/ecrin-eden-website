import { Request, Response } from 'express'
import Preferences from '../entities/Preferences.entity.js'
import { PreferencesService } from '../services/preferences.service.js'
import BaseController from './base.controller.js'

/**
 * Controller for preferences
 * 
 * @class PreferencesController
 * @extends BaseController
 * @property {PreferencesService} _preferencesService - Instance of PreferencesService
 */
export default class PreferencesController extends BaseController {
    private _preferencesService: PreferencesService = new PreferencesService() 

    /**
     * Get a client's preferences
     * 
     * @method getPreferencesForClient
     * @memberof PreferencesController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the preferences are returned.
     */
    public getPreferencesForClient = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { id: clientId } = req.params

            return await this._preferencesService.getPreferencesForClient(clientId)
        })
    }
    
    /**
     * Update a client's preferences
     * 
     * @method updatePreferences
     * @memberof PreferencesController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the preferences are updated.
     */
    public updatePreferences = async (req: Request, res: Response): Promise<void> => {        
        await this.handleRequest(req, res, async () => {
            const { id: clientId } = req.params
    
            const validRequestBody: Partial<Preferences> = this.filterRequestBody(req.body, Preferences)

            return await this._preferencesService.updatePreferences(clientId, validRequestBody)
        }, 'Preferences updated successfully') 
    }
}