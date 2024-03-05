import AppDataSource from '../config/mysql.config.js'
import { User } from '../entities/User.js'

export const UserRepository = AppDataSource.getRepository(User).extend({
    async findById(id: number) {
        const user = await this.findOneBy({ id })

        return user ? { email: user.email, role: user.role } : null
    }, 

    async findByEmail(email: string) {
        const user = await this.findOneBy({ email })

        return user ? { email: user.email, role: user.role } : null
    }, 

})