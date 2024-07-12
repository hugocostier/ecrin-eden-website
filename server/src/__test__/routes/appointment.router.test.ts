import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals'
import request from 'supertest'
import Appointment from '../../entities/Appointment.entity'
import Client from '../../entities/Client.entity'
import Service from '../../entities/Service.entity'
import TestApp from '../helper/testRunner'

const testApp = new TestApp() 

describe('Appointment Router', () => {
    beforeAll(async () => {
        process.env.NODE_ENV = 'test'
        await testApp.startApp() 

        const serviceRepository = testApp.getRepository(Service)
        await serviceRepository.save([
            { name: 'Service 1', price: 20, duration: 50 }
        ])

        const clientRepository = testApp.getRepository(Client)
        await clientRepository.save([
            {
                first_name: 'john',
                last_name: 'doe',
                phone_number: '1234567890',
            }
        ])

        const appointmentRepository = testApp.getRepository(Appointment)
        await appointmentRepository.save([
            {
                client: { id: 1 },
                service: { id: 1 },
                date: '2024-06-28',
                time: '17:00',
                is_away: false
            }
        ])
    })

    afterAll(async () => {
        await testApp.cleanUpDatabase(Appointment)
        await testApp.cleanUpDatabase(Client)
        await testApp.cleanUpDatabase(Service)
        await testApp.stopApp() 
    }) 

    it('should test nothing', () => {
        expect(1).toBe(1)
    })

    it('should get all appointments and return them', () => { 
        return request(testApp.getApp())
            .post('/api/v1/appointments')
            .send({
                showAll: true
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(response => {
                expect(response.body.success).toBe(true)
                expect(response.body.data).toBeDefined()
                expect(response.body.data.length).toBe(1)
                expect(response.body.data[0]).toMatchObject({
                    id: 1,
                    client: {
                        id: 1,
                    }, 
                    service: {
                        name: 'Service 1',
                        duration: '50'
                    },
                    date: '2024-06-28',
                    time: '17:00:00',
                    status: null,
                    is_away: false,
                    private_notes: null,
                })
            })
    })

    it('should add an appointment and return it', async () => {
        return request(testApp.getApp())
            .post('/api/v1/appointments/add')
            .send({
                client: {
                    first_name: 'john',
                    last_name: 'doe',
                    phone: '1234567890',
                    email: 'john.doe@example.com'
                },
                service: { id: 1 },
                date: '2024-06-28',
                time: '17:00',
                status: 'pending',
                is_away: false,
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(response => {
                expect(response.body.success).toBe(true)
                expect(response.body.msg).toBe('Appointment created successfully')
                expect(response.body.data).toBeDefined()
            })
    })
})