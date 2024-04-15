import { Request, Response } from 'express'
import asyncHandler from '../middlewares/async.js'
import { PreferencesService } from '../services/preferences.service.js'

class PreferencesController {
    private _preferencesService = new PreferencesService

    public getPreferencesForClient = asyncHandler(async (req: Request, res: Response) => {
        const { id: clientId } = req.params

        const preferences = await this._preferencesService.getPreferencesForClient(clientId)

        res.status(200).json({
            success: true, 
            data: preferences
        })
    })

    public updatePreferences = asyncHandler(async (req: Request, res: Response) => {
        const { id: clientId } = req.params

        const preferences = await this._preferencesService.updatePreferences(clientId, req.body)

        res.status(200).json({
            success: true, 
            data: preferences,
            message: 'Preferences updated successfully'
        })
    })

    public addPreferences = asyncHandler(async (req: Request, res: Response) => {
        const { id: clientId } = req.params

        const preferences = await this._preferencesService.addPreferences(clientId, req.body)

        res.status(201).json({
            success: true, 
            data: preferences,
            message: 'Preferences added successfully'
        })
    })
}

export default new PreferencesController() 