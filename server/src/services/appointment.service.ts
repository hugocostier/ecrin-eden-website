import { UpdateResult } from 'typeorm'
import { DeleteResult } from 'typeorm/browser'
import { Appointment } from '../entities/Appointment.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import { AppointmentRepository } from '../repositories/appointment.repository.js'

class AppointmentService {
    private _appointmentRepository = AppointmentRepository

    // Get an appointment
    async getAppointmentById(id: string) {
        const appointment = await this._appointmentRepository.findById(parseInt(id))

        if (!appointment) {
            throw new CustomAPIError(`No appointment found with id ${id}`, 404)
        }

        return appointment
    }

    // Get appointments with options
    async getAppointments(showHistory?: boolean, showAll?: boolean, rangeStart?: string, rangeEnd?: string, day?: Date) {
        let appointments = undefined

        // Return all appointments for a day 
        if (day) {
            // Check if day is a valid date
            // if (isNaN(day.getTime())) {
            //     throw new CustomAPIError(`Invalid date ${day}`, 400)
            // }

            appointments = await this._appointmentRepository.findByDay(day) 

            if (!appointments) {
                throw new CustomAPIError(`No appointments found for ${day}`, 404)
            }

            return appointments
        } 
        // Return all appointments between a date range
        else if (rangeStart && rangeEnd) {
            const rangeStartDate = new Date(rangeStart)
            const rangeEndDate = new Date(rangeEnd)

            // Check if rangeStart and rangeEnd are valid dates
            if (isNaN(rangeStartDate.getTime()) || isNaN(rangeEndDate.getTime())) {
                throw new CustomAPIError(`Invalid date range ${rangeStart} - ${rangeEnd}`, 400)
            }

            appointments = await this._appointmentRepository.findByDateRange(rangeStartDate, rangeEndDate) 

            if (!appointments) {
                throw new CustomAPIError(`No appointments found between ${rangeStart} and ${rangeEnd}`, 404)
            }

            return appointments
        } 
        // Return all past appointments
        else if (showHistory) {
            appointments = await this._appointmentRepository.findPast()

            if (!appointments) {
                throw new CustomAPIError('No past appointments found', 404)
            }

            return appointments
        } 
        // Return all appointments
        else if (showAll) {
            appointments = await this._appointmentRepository.findAll()

            if (!appointments) {
                throw new CustomAPIError('No appointments found', 404)
            }

            return appointments
        } 
        // Return all upcoming appointments
        else {
            appointments = await this._appointmentRepository.findUpcoming()

            if (!appointments) {
                throw new CustomAPIError('No upcoming appointments found', 404)
            }

            return appointments
        } 
    }

    // Get appointments for a client with options
    async getAppointmentsByClient(clientId: string, showHistory?: boolean, showAll?: boolean, rangeStart?: string, rangeEnd?: string, day?: Date) {
        let appointments = undefined

        // Return all appointments for a day 
        if (day) {
            // const newDay = new Date(day)
            // // Check if day is a valid date
            // if (isNaN(new Date(day).getTime())) {
            //     throw new CustomAPIError(`Invalid date ${day}`, 400)
            // }

            appointments = await this._appointmentRepository.findByClientForDay(parseInt(clientId), day) 

            if (!appointments) {
                throw new CustomAPIError(`No appointment found for client with id ${clientId} for ${day}`, 404)
            }

            return appointments
        } 
        // Return all appointments between a date range
        else if (rangeStart && rangeEnd) {
            const rangeStartDate = new Date(rangeStart)
            const rangeEndDate = new Date(rangeEnd)
            
            // Check if rangeStart and rangeEnd are valid dates
            if (isNaN(rangeStartDate.getTime()) || isNaN(rangeEndDate.getTime())) {
                throw new CustomAPIError(`Invalid date range ${rangeStart} - ${rangeEnd}`, 400)
            }

            appointments = await this._appointmentRepository.findByDateRangeForClient(rangeStartDate, rangeEndDate, parseInt(clientId)) 

            if (!appointments) {
                throw new CustomAPIError(`No appointments found between ${rangeStart} and ${rangeEnd}`, 404)
            }

            return appointments
        } 
        // Return all past appointments
        else if (showHistory) {
            appointments = await this._appointmentRepository.findPastByClient(parseInt(clientId))

            if (!appointments) {
                throw new CustomAPIError(`No past appointments found for client with id ${clientId}`, 404)
            }

            return appointments
        } 
        // Return all appointments
        else if (showAll) {
            appointments = await this._appointmentRepository.findByClient(parseInt(clientId))

            if (!appointments) {
                throw new CustomAPIError(`No appointments found for client with id ${clientId}`, 404)
            }

            return appointments
        } 
        // Return all upcoming appointments
        else {
            appointments = await this._appointmentRepository.findUpcomingByClient(parseInt(clientId))

            if (!appointments) {
                throw new CustomAPIError(`No upcoming appointments found for client with id ${clientId}`, 404)
            }

            return appointments
        } 
    }

    // Get all appointments for a service
    async getAppointmentsByService(serviceId: string, showAll?: boolean): Promise<Appointment[]> {
        let appointments = undefined

        // Return all appointments
        if (showAll) {
            appointments = await this._appointmentRepository.findByService(parseInt(serviceId))

            if (!appointments) {
                throw new CustomAPIError(`No appointments found for service with id ${serviceId}`, 404)
            }

            return appointments
        } 
        // Return all upcoming appointments
        else {
            appointments = await this._appointmentRepository.findUpcomingByService(parseInt(serviceId))

            if (!appointments) {
                throw new CustomAPIError(`No upcoming appointments found for service with id ${serviceId}`, 404)
            }

            return appointments
        } 
    }

    // Count all appointments in a day
    async countAppointmentsForDay(date: Date): Promise<number> {
        const count = await this._appointmentRepository.countForDay(date)

        if (!count) {
            throw new CustomAPIError(`No appointments found for ${date}`, 404)
        }

        return count
    }

    // Count all appointments for a client in a week
    async countAppointmentsForWeekAndClient(startDate: Date, endDate: Date, clientId: string): Promise<number> {
        const count = await this._appointmentRepository.countForWeek(startDate, endDate, parseInt(clientId))

        if (!count) {
            throw new CustomAPIError(`No appointments found between ${startDate} and ${endDate} for client with id ${clientId}`, 404)
        }

        return count
    }

    // Create an appointment
    async addAppointment(appointmentData: Partial<Appointment>): Promise<Appointment> {
        if (!appointmentData.date ||  !appointmentData.service || !appointmentData.client) {
            throw new CustomAPIError('Please provide the date, the service and the client', 400)
        }

        const appointment = await this._appointmentRepository.create(appointmentData).save()

        if (!appointment) {
            throw new CustomAPIError('Appointment could not be created', 500)
        }

        return appointment
    }

    // Update an appointment
    async updateAppointment(id: string, appointmentData: Partial<Appointment>): Promise<UpdateResult> {
        const appointment = await this._appointmentRepository.update(id, appointmentData)

        if (!appointment) {
            throw new CustomAPIError(`Appointment with id ${id} could not be updated`, 500)
        }

        return appointment
    }

    // Delete an appointment
    async deleteAppointment(id: string): Promise<DeleteResult> {
        const appointment = await this._appointmentRepository.delete(id) 
        
        if (!appointment) {
            throw new CustomAPIError(`Appointment with id ${id} could not be deleted`, 500)
        }

        return appointment
    }
}

export default AppointmentService