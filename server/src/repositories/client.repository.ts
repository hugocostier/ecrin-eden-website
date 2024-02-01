import datasource from "../config/mysql.config.js";
import { Client } from "../entities/Client.js";

export const ClientRepository = datasource.getRepository(Client).extend({
    async findById(id: number) {
        return await this.findBy({ id })
    }, 

    async findByName(first_name: string, last_name: string) {
        return await this.findBy({ first_name, last_name })
    }, 

    async getSharedNotes(id: number) {
        return await this.query(`
            SELECT shared_notes
            FROM client 
            WHERE id = ${id}
        `)
    }, 

    async getAddress(id: number) {
        return await this.query(`
            SELECT address, postal_code, city
            FROM client 
            WHERE id = ${id}
        `)
    }, 

    async getProfilePicture(id: number) {
        return await this.query(`
            SELECT profile_picture
            FROM client 
            WHERE id = ${id}
        `)
    }, 

    async getPersonalInfo(id: number) {
        return await this.query(`
            SELECT first_name, last_name, phone_number, address, postal_code, city
            FROM client 
            WHERE id = ${id}
        `)
    }, 

    async getAccount(id: number) {
        return await this.query(`
            SELECT id AS user_id
            FROM JOIN client ON client.user_id = user.id
            WHERE id = ${id}
        `)
    }
})
