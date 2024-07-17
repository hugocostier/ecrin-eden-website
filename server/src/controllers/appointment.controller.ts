import { Request, Response } from 'express'
import Appointment from '../entities/Appointment.entity.js'
import AppointmentService from '../services/appointment.service.js'
import BaseController from './base.controller.js'

/**
 * Controller for appointments
 * 
 * @class AppointmentController
 * @extends BaseController
 * @property {AppointmentService} _appointmentService - Instance of AppointmentService
 */
export default class AppointmentController extends BaseController {
    private _appointmentService: AppointmentService = new AppointmentService() 

    /**
     * Get an appointment by ID
     * 
     * @method getAppointmentById
     * @memberof AppointmentController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the appointment is returned.
     * 
     */
    public getAppointmentById = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { id: appointmentId } = req.params

            return await this._appointmentService.getAppointmentById(appointmentId)
        }) 
    }
    
    /**
     * Get all appointments with options
     * 
     * @method getAppointments
     * @memberof AppointmentController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the appointments are returned.
     */
    public getAppointments = async (req: Request, res: Response): Promise<void> => {        
        await this.handleRequest(req, res, async () => {
            const { showHistory, showAll, rangeStart, rangeEnd, day } = req.body 

            return await this._appointmentService.getAppointments(showHistory, showAll, rangeStart, rangeEnd, day)
        }) 
    }

    /**
     * Get all appointments for a client with options
     * 
     * @method getAppointmentsByClient
     * @memberof AppointmentController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the appointments are returned.
     */
    public getAppointmentsByClient = async (req: Request, res: Response): Promise<void> => {        
        await this.handleRequest(req, res, async () => {
            const { id: clientId } = req.params
            const { showHistory, showAll, rangeStart, rangeEnd, day } = req.body 

            return await this._appointmentService.getAppointmentsByClient(clientId, showHistory, showAll, rangeStart, rangeEnd, day)
        }) 
    }

    /**
     * Get all appointments for a service with options
     * 
     * @method getAppointmentsByService
     * @memberof AppointmentController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the appointments are returned.
     */
    public getAppointmentsByService = async (req: Request, res: Response): Promise<void> => {        
        await this.handleRequest(req, res, async () => {
            const { id: serviceId } = req.params
            const { showAll } = req.body

            return await this._appointmentService.getAppointmentsByService(serviceId, showAll)
        })
    }

    /**
     * Count all appointments for a day
     * 
     * @method countAppointmentsForDay
     * @memberof AppointmentController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the count is returned.
     */
    public countAppointmentsForDay = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { date } = req.body

            return await this._appointmentService.countAppointmentsForDay(date)
        })
    }

    /**
     * Count all appointments for a week
     * 
     * @method countAppointmentsForWeekAndClient
     * @memberof AppointmentController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the count is returned.
     */
    public countAppointmentsForWeekAndClient = async (req: Request, res: Response): Promise<void> => {        
        await this.handleRequest(req, res, async () => {
            const { id: clientId } = req.params
            const { startDate, endDate } = req.body

            return await this._appointmentService.countAppointmentsForWeekAndClient(startDate, endDate, clientId)
        })
    }
    
    /**
     * Adds a new appointment.
     *
     * @method addAppointment
     * @memberof AppointmentController
     * @param {Request} req - Request object.
     * @param {Response} res - Response object.
     * @returns {Promise<void>} A promise that resolves when the appointment is added.
     */
    public addAppointment = async (req: Request, res: Response): Promise<void> => {     
        await this.handleRequest(req, res, async () => {
            const validRequestBody: Partial<Appointment> = this.filterRequestBody(req.body, Appointment)

            return await this._appointmentService.addAppointment(validRequestBody, req.body.email || undefined)
        }, 'Appointment created successfully', 201)
    }

    /**
     * Updates an appointment.
     * 
     * @method updateAppointment
     * @memberof AppointmentController
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} A promise that resolves when the appointment is updated.
     */
    public updateAppointment = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { id: appointmentId } = req.params

            const validRequestBody: Partial<Appointment> = this.filterRequestBody(req.body, Appointment)

            return await this._appointmentService.updateAppointment(appointmentId, validRequestBody)
        }, 'Appointment updated successfully') 
    }

    /**
     * Deletes an appointment.
     *
     * @method deleteAppointment
     * @memberof AppointmentController
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} A promise that resolves when the appointment is deleted.
     */
    public deleteAppointment = async (req: Request, res: Response): Promise<void> => {        
        await this.handleRequest(req, res, async () => {
            const { id: appointmentId } = req.params

            return await this._appointmentService.deleteAppointment(appointmentId)
        }, 'Appointment deleted successfully', 204)
    }
}