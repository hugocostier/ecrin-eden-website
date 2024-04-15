import { Preferences } from '../entities/Preferences.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import { PreferencesRepository } from '../repositories/preferences.repository.js'

export class PreferencesService {
    private _preferencesRepository = PreferencesRepository

    async getPreferencesForClient(clientId: string) {
        const preferences = await this._preferencesRepository.findPreferencesForClient(parseInt(clientId))

        if (!preferences) {
            throw new CustomAPIError(`No preferences found for client with id ${clientId}`, 404)
        }

        return preferences
    }

    async updatePreferences(clientId: string, preferences: Partial<Preferences>) {
        const updatedPreferences = await this._preferencesRepository.updatePreferences(parseInt(clientId), preferences)

        return updatedPreferences
    }

    async addPreferences(clientId: string, preferences: Partial<Preferences>) {
        const newPreferences = await this._preferencesRepository.create(preferences).save()

        return newPreferences
    }
}