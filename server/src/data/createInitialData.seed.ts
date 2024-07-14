import { DataSource } from 'typeorm'
import Service from '../entities/Service.entity.js'

export const createInitialData = async (appDataSource: DataSource) => {
    const serviceRepository = appDataSource.getRepository(Service)

    const service1 = new Service()
    service1.name = 'Massage Essentiel®'
    service1.price = 60
    service1.duration = 60
    await serviceRepository.save(service1)

    const service2 = new Service()
    service2.name = 'Massage Essentiel®'
    service2.price = 70
    service2.duration = 75
    await serviceRepository.save(service2)

    const service3 = new Service()
    service3.name = 'Massage Essentiel®'
    service3.price = 80
    service3.duration = 90
    await serviceRepository.save(service3)

    const service4 = new Service()
    service4.name = 'Massage Essentiel® - Femme enceinte'
    service4.price = 60
    service4.duration = 60
    await serviceRepository.save(service4)

    const service5 = new Service()
    service5.name = 'Le Sur Mesure'
    service5.price = 40
    service5.duration = 30
    await serviceRepository.save(service5)

    const service6 = new Service()
    service6.name = 'Massage Essentiel®'
    service6.price = 40
    service6.duration = 30
    await serviceRepository.save(service6)
}