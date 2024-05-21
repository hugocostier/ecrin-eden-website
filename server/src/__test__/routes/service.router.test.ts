import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals'
import { Express, Request, Response } from 'express'
import request, * as from from 'supertest'
import ServiceController from '../../controllers/service.controller'
import Service from '../../entities/Service.entity'
import { initAppAndListen } from '../../index'
import { ServiceService } from '../../services/service.service'
import TestApp from '../helper/testRunner'

const testApp = new TestApp()

const mockService = {
    name: 'Service 1',
    duration: 60,
    price: 100, 
}

describe('Service Router', () => {
    beforeAll(async () => {
        await testApp.startApp()
    })
    
    afterAll(async () => {
        await testApp.stopApp()
    })

    it('should test nothing', () => {
        expect(1).toBe(1)
    })

    it('should get a service and return it', async () => { 
        const response = await request(testApp.getApp())
            .post('/api/v1/services')
            .send(mockService)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')

        expect(response.status).toBe(201)
        expect(response.body.success).toBe(true)
        expect(response.body.data).toBeDefined()
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.name).toBe(mockService.name)
        expect(response.body.data.duration).toBe(mockService.duration)
        expect(response.body.data.price).toBe(mockService.price)
        expect(response.body.msg).toBe('Service created successfully')
    }) 
})