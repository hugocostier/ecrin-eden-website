import AppDataSource from '../config/mysql.config.js'
import { User } from '../entities/User.js'

export const UserRepository = AppDataSource.getRepository(User).extend({
    async findById(id: number) {
        const user = await this.createQueryBuilder('user')
            .leftJoinAndSelect('user.client', 'client')
            .where('user.id = :id', { id })
            .getOne()

        console.log('User', user)

        const dataToReturn = user ? {
            email: user.email, 
            password: user.password, 
            firstName: user.client?.first_name, 
            lastName: user.client?.last_name,
            phone: user.client?.phone_number, 
            address: user.client?.address,
            postalCode: user.client?.postal_code,
            city: user.client?.city,
            sharedNotes: user.client?.shared_notes,
            privateNotes: user.client?.private_notes,
            profilePicture: user.client?.profile_picture,
        } : null

        return dataToReturn
    }, 

    async findByEmail(email: string) {
        const user = await this.findOneBy({ email })

        return user ? { email: user.email, role: user.role } : null
    }, 

})