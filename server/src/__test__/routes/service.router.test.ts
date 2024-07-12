import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals'
import request from 'supertest'
import Service from '../../entities/Service.entity'
import TestApp from '../helper/testRunner'

const testApp = new TestApp()

describe('Service Router', () => {
    beforeAll(async () => {
        process.env.NODE_ENV = 'test'
        await testApp.startApp()

        const serviceRepository = testApp.getRepository(Service)
        await serviceRepository.save([
            { name: 'Service 1', price: 20, duration: 50 },
            { name: 'Service 2', price: 20, duration: 50 }
        ])
    })
    
    afterAll(async () => {
        await testApp.cleanUpDatabase(Service)
        await testApp.stopApp()
    })

    it('should test nothing', () => {
        expect(1).toBe(1)
    })

    it('should get all services and return them', () => { 
        return request(testApp.getApp())
            .get('/api/v1/services')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(response => {
                expect(response.body.success).toBe(true)
                expect(response.body.data).toBeDefined()
                expect(response.body.data.length).toBe(2)
                expect(response.body.data[0]).toMatchObject({
                    id: 1,
                    name: 'Service 1',
                    price: '20',
                    duration: '50', 
                    created_at: expect.any(String),
                    updated_at: expect.any(String),
                    deleted_at: null
                })
                expect(response.body.data[1]).toMatchObject({
                    id: 2,
                    name: 'Service 2',
                    price: '20',
                    duration: '50', 
                    created_at: expect.any(String),
                    updated_at: expect.any(String),
                    deleted_at: null
                })
            })
    })
})