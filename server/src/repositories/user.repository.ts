import datasource from '../config/mysql.config.js'
import { User } from '../entities/User.js'

export const UserRepository = datasource.getRepository(User).extend({
    async findById(id: number) {
        return await this.findOneBy({ id})
    }, 

    async findByEmail(email: string) {
        return await this.findOneBy({ email })
    }
})