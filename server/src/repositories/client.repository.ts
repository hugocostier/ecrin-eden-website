import AppDataSource from '../config/mysql.config.js'
import { Client } from '../entities/Client.js'

export const ClientRepository = AppDataSource.getRepository(Client).extend({
    async findById(id: number) {
        return await this.findOneBy({ id })
    }, 

    async findByName(first_name: string, last_name: string) {
        return await this.findOneBy({ first_name, last_name })
    }, 

    async findByUser(user_id: number) {
        return await this.findOneBy({ user : { id: user_id } })
    },

    // async getSharedNotes(id: number) {
    //     return await this.query(`
    //         SELECT shared_notes
    //         FROM client 
    //         WHERE id = ${id}
    //     `)
    // }, 

    // async getAddress(id: number) {
    //     return await this.query(`
    //         SELECT address, postal_code, city
    //         FROM client 
    //         WHERE id = ${id}
    //     `)
    // }, 

    async getProfilePicture(id: number) {
        const request = 'SELECT profile_picture FROM client WHERE id = ?'

        return new Promise((resolve, reject) => {
            AppDataSource.query(request, [id])
                .catch((err) => reject(err))
                .then((result) => {
                    if (result === undefined) {
                        resolve({ error: 'Profile picture not found' })
                    } else {
                        resolve(result)
                    }
                })
        })
    }, 

    async getPersonalInfo(id: number) {
        const request = 'SELECT first_name, last_name, phone_number, address, postal_code, city FROM client WHERE id = ?'

        return new Promise((resolve, reject) => {
            AppDataSource.query(request, [id]) 
                .catch((err) => reject(err))
                .then((result) => {
                    if (result === undefined) {
                        resolve({ error: 'Personal info not found' })
                    } else {
                        resolve(result)
                    }
                })
        })
    }, 

    async getAccount(id: number) {
        const request = 'SELECT user_id FROM client WHERE id = ?' 

        return new Promise((resolve, reject) => {
            AppDataSource.query(request, [id])
                .catch((err) => reject(err))
                .then((result) => {
                    if (result === undefined) {
                        resolve({ error: 'User not found' })
                    } else {
                        resolve(result)
                    }
                })
        })
    }
})
