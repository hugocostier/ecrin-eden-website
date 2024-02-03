import datasource from '../config/mysql.config.js'
import { Service } from '../entities/Service.js'

export const ServiceRepository = datasource.getRepository(Service).extend({
    async findById(id: number) {
        return await this.findOneBy({ id })
    }
})