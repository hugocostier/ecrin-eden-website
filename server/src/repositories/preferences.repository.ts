import AppDataSource from '../config/mysql.config.js'
import { Preferences } from '../entities/Preferences.js'

export const PreferencesRepository = AppDataSource.getRepository(Preferences).extend({
    async findPreferencesForClient(clientId: number) {
        const preferences = await this.createQueryBuilder('preferences') 
            .leftJoin('preferences.client', 'client')
            .select([
                'preferences',
                'client.id'
            ])
            .where('client.id = :clientId', { clientId })
            .getOne()

        return preferences
    }, 

    async updatePreferences(clientId: number, preferences: Partial<Preferences>) {
        const updatedPreferences = await this.createQueryBuilder('preferences')
            .update()
            .set(preferences)
            .where('client_id = :clientId', { clientId })
            .execute()

        return updatedPreferences
    }
})