import { Request, Response } from 'express'
import asyncHandler from '../middlewares/async.js'
import AppointmentService from '../services/appointment.service.js'

class AppointmentController {
    private _appointmentService = new AppointmentService() 

    // Get an appointment
    public getAppointmentById = asyncHandler(async (req: Request, res: Response) => {
        const { id: appointmentId } = req.params
        
        const appointment = await this._appointmentService.getAppointmentById(appointmentId)

        res.status(200).json({
            success: true, 
            data: appointment
        })
    })
    
    // Get appointments with options
    public getAppointments = asyncHandler(async (req: Request, res: Response) => {
        const { showHistory, showAll, rangeStart, rangeEnd, day } = req.body 

        const appointments = await this._appointmentService.getAppointments(showHistory, showAll, rangeStart, rangeEnd, day)

        res.status(200).json({ 
            success: true, 
            data: appointments 
        })
    }) 

    // Get appointments for a client with options
    public getAppointmentsByClient = asyncHandler(async (req: Request, res: Response) => {
        const { id: clientId } = req.params
        const { showHistory, showAll, rangeStart, rangeEnd, day } = req.body 

        const appointments = await this._appointmentService.getAppointmentsByClient(clientId, showHistory, showAll, rangeStart, rangeEnd, day)

        res.status(200).json({
            success: true, 
            data: appointments
        })
    })

    // Get appointments for a service with options
    public getAppointmentsByService = asyncHandler(async (req: Request, res: Response) => {
        const { id: serviceId } = req.params
        const { showAll } = req.body
        
        const appointments = await this._appointmentService.getAppointmentsByService(serviceId, showAll)

        res.status(200).json({
            success: true, 
            data: appointments
        })
    })

    // Count all appointments in a day
    public countAppointmentsForDay = asyncHandler(async (req: Request, res: Response) => {
        const { date } = req.body
        
        const count = await this._appointmentService.countAppointmentsForDay(date)

        res.status(200).json({
            success: true, 
            data: count
        })
    })

    // Count all appointments for a client in a week
    public countAppointmentsForWeekAndClient = asyncHandler(async (req: Request, res: Response) => {
        const { clientId } = req.params
        const { startDate, endDate } = req.body
        
        const count = await this._appointmentService.countAppointmentsForWeekAndClient(startDate, endDate, clientId)

        res.status(200).json({
            success: true, 
            data: count
        })
    })

    // Add an appointment
    public addAppointment = asyncHandler(async (req: Request, res: Response) => {     
        const {
            date, 
            is_away,
            status,
            client_notes,
            private_notes
        } = req.body

        const appointment = await this._appointmentService.addAppointment({
            date, 
            is_away,
            status,
            client_notes,
            private_notes
        })

        res.status(201).json({
            success: true, 
            data: appointment, 
            msg: 'Appointment created successfully'
        })
    })

    // Update an appointment
    public updateAppointment = asyncHandler(async (req: Request, res: Response) => {
        const { id: appointmentId } = req.params
        
        const appointment = await this._appointmentService.updateAppointment(appointmentId, req.body)

        res.status(200).json({
            success: true, 
            data: appointment, 
            msg: 'Appointment updated successfully'
        })
    })

    // Delete an appointment
    public deleteAppointment = asyncHandler(async (req: Request, res: Response) => {
        const { id: appointmentId } = req.params
        
        const appointment = await this._appointmentService.deleteAppointment(appointmentId)

        res.status(200).json({
            success: true, 
            data: appointment, 
            msg: 'Appointment deleted successfully'
        })
    })
}

export default new AppointmentController()