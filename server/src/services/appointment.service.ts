import { Repository, UpdateResult } from 'typeorm'
import { DeleteResult } from 'typeorm/browser'
import Appointment from '../entities/Appointment.entity.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import { AppointmentRepository } from '../repositories/appointment.repository.js'
import BaseService from './base.service.js'

/**
 * Service class for appointments.
 * 
 * @class AppointmentService
 * @extends BaseService
 * @property {AppointmentRepository} _customRepository - The custom repository for appointments.
 * @property {Repository<Appointment> & { findAll(): Promise<Appointment[]>; findById(id: number): Promise<Appointment | null>; findByDay(day: Date): Promise<Appointment[]>; findByDateRange(rangeStart: Date, rangeEnd: Date): Promise<Appointment[]>; findUpcoming(): Promise<Appointment[]>; findPast(): Promise<Appointment[]>; findByClient(clientId: number): Promise<Appointment[]>; findByClientForDay(clientId: number, day: Date): Promise<Appointment[]>; findByDateRangeForClient(rangeStart: Date, rangeEnd: Date, clientId: number): Promise<Appointment[]>; findUpcomingByClient(clientId: number): Promise<Appointment[]>; findPastByClient(clientId: number): Promise<Appointment[]>; findByService(serviceId: number): Promise<Appointment[]>; findUpcomingByService(serviceId: number): Promise<Appointment[]>; countForDay(date: Date): Promise<number>; countForWeek(startDate: Date, endDate: Date, clientId: number): Promise<number>; }} _appointmentRepository - The extended repository for appointments.
 **/
class AppointmentService extends BaseService {
    private _customRepository = new AppointmentRepository()
    private _appointmentRepository!: Repository<Appointment> & {
        findAll(): Promise<Appointment[]>;
        findById(id: number): Promise<Appointment | null>;
        findByDay(day: Date): Promise<Appointment[]>;
        findByDateRange(rangeStart: Date, rangeEnd: Date): Promise<Appointment[]>;
        findUpcoming(): Promise<Appointment[]>;
        findPast(): Promise<Appointment[]>;
        findByClient(clientId: number): Promise<Appointment[]>;
        findByClientForDay(clientId: number, day: Date): Promise<Appointment[]>;
        findByDateRangeForClient(rangeStart: Date, rangeEnd: Date, clientId: number): Promise<Appointment[]>;
        findUpcomingByClient(clientId: number): Promise<Appointment[]>;
        findPastByClient(clientId: number): Promise<Appointment[]>;
        findByService(serviceId: number): Promise<Appointment[]>;
        findUpcomingByService(serviceId: number): Promise<Appointment[]>;
        countForDay(date: Date): Promise<number>;
        countForWeek(startDate: Date, endDate: Date, clientId: number): Promise<number>;
    }

    /**
     * Extends the appointment repository by assigning the result of the 'extendAppointmentRepository' method to the '_appointmentRepository' property.
     * 
     * @async
     * @method extendServiceRepository
     * @memberof AppointmentService
     * @throws {Error} If there is an error extending the appointment repository.
     * @returns {Promise<void>} A promise that resolves when the appointment repository is successfully extended.
     */
    private async extendServiceRepository(): Promise<void> {
        try {
            this._appointmentRepository = await this._customRepository.extendAppointmentRepository()
        } catch(error: any) {
            console.error('Error extending appointment repository: ', error)
            throw new Error(error)
        }
    }

    /**
     * Retrieves an appointment by its id.
     * 
     * @async
     * @method getAppointmentById
     * @memberof AppointmentService
     * @param {string} id - The id of the appointment to retrieve.
     * @throws {CustomAPIError} If there is no appointment found with the provided id or if there is an error getting the appointment.
     * @returns {Promise<Appointment>} The appointment with the provided id.
     */
    public async getAppointmentById(id: string): Promise<Appointment> {
        if (!this._appointmentRepository) {
            await this.extendServiceRepository()
        }

        try {
            const appointment: Appointment | null = await this._appointmentRepository.findById(parseInt(id))
                .catch((error: any) => {
                    console.error('Error getting appointment: ', error)
                    throw new CustomAPIError('Error getting appointment', 500)
                }) 

            if (!appointment) {
                throw new CustomAPIError(`No appointment found with id ${id}`, 404)
            }

            return appointment
        } catch(error: any) {
            throw error
        }
    }

    /**
     * Retrieves all appointments.
     * 
     * @async
     * @method getAppointments
     * @memberof AppointmentService
     * @param {boolean} showHistory - If true, returns all past appointments.
     * @param {boolean} showAll - If true, returns all appointments.
     * @param {string} rangeStart - The start date of the range of appointments to retrieve.
     * @param {string} rangeEnd - The end date of the range of appointments to retrieve.
     * @param {Date} day - The date of the appointments to retrieve.
     * @throws {CustomAPIError} If there the date or date range is invalid or if there is an error getting appointments.
     * @returns {Promise<Appointment[]>} The appointments that match the provided criteria.
     */
    public async getAppointments(showHistory?: boolean, showAll?: boolean, rangeStart?: string, rangeEnd?: string, day?: Date): Promise<Appointment[]> {
        if (!this._appointmentRepository) {
            await this.extendServiceRepository()
        }

        try {
            // Return all appointments for a day 
            if (day) {
                // Check if day is a valid date
                if (isNaN(new Date(day).getTime())) {
                    throw new CustomAPIError(`Invalid date ${day}`, 400)
                }

                return await this._appointmentRepository.findByDay(day) 
            } 
            // Return all appointments between a date range
            else if (rangeStart && rangeEnd) {
                const rangeStartDate: Date = new Date(rangeStart)
                const rangeEndDate: Date = new Date(rangeEnd)

                // Check if rangeStart and rangeEnd are valid dates
                if (isNaN(rangeStartDate.getTime()) || isNaN(rangeEndDate.getTime())) {
                    throw new CustomAPIError(`Invalid date range ${rangeStart} - ${rangeEnd}`, 400)
                }

                return await this._appointmentRepository.findByDateRange(rangeStartDate, rangeEndDate) 
            } 
            // Return all past appointments
            else if (showHistory) {
                return await this._appointmentRepository.findPast()
            } 
            // Return all appointments
            else if (showAll) {
                return await this._appointmentRepository.findAll()
            } 
            // Return all upcoming appointments
            else {
                return await this._appointmentRepository.findUpcoming()
            } 
        } catch(error: any) {
            if (error instanceof CustomAPIError && error.statusCode === 400) {
                throw error
            }

            console.error('Error getting appointments: ', error)
            throw new CustomAPIError('Error getting appointments', 500)
        }
    }

    /**
     * Retrieves all appointments for a client.
     * 
     * @async
     * @method getAppointmentsByClient
     * @memberof AppointmentService
     * @param {string} clientId - The id of the client to retrieve appointments for.
     * @param {boolean} showHistory - If true, returns all past appointments for the client.
     * @param {boolean} showAll - If true, returns all appointments for the client.
     * @param {string} rangeStart - The start date of the range of appointments to retrieve.
     * @param {string} rangeEnd - The end date of the range of appointments to retrieve.
     * @param {Date} day - The date of the appointments to retrieve.
     * @throws {CustomAPIError} If there the date or date range is invalid or if there is an error getting appointments for the client.
     * @returns {Promise<Appointment[]>} The appointments that match the provided criteria.
     */
    public async getAppointmentsByClient(clientId: string, showHistory?: boolean, showAll?: boolean, rangeStart?: string, rangeEnd?: string, day?: Date): Promise<Appointment[]> {
        if (!this._appointmentRepository) {
            await this.extendServiceRepository()
        }

        try {
            // Return all appointments for a day 
            if (day) {
                // Check if day is a valid date
                if (isNaN(new Date(day).getTime())) {
                    throw new CustomAPIError(`Invalid date ${day}`, 400)
                }

                return await this._appointmentRepository.findByClientForDay(parseInt(clientId), day) 
            } 
            // Return all appointments between a date range
            else if (rangeStart && rangeEnd) {
                const rangeStartDate: Date = new Date(rangeStart)
                const rangeEndDate: Date = new Date(rangeEnd)
                
                // Check if rangeStart and rangeEnd are valid dates
                if (isNaN(rangeStartDate.getTime()) || isNaN(rangeEndDate.getTime())) {
                    throw new CustomAPIError(`Invalid date range ${rangeStart} - ${rangeEnd}`, 400)
                }

                return await this._appointmentRepository.findByDateRangeForClient(rangeStartDate, rangeEndDate, parseInt(clientId)) 
            } 
            // Return all past appointments
            else if (showHistory) {
                return await this._appointmentRepository.findPastByClient(parseInt(clientId))
            } 
            // Return all appointments
            else if (showAll) {
                return await this._appointmentRepository.findByClient(parseInt(clientId))
            } 
            // Return all upcoming appointments
            else {
                return await this._appointmentRepository.findUpcomingByClient(parseInt(clientId))
            } 
        } catch (error: any) {
            if (error instanceof CustomAPIError && error.statusCode === 400) {
                throw error
            }

            console.error('Error getting appointments by client: ', error)
            throw new CustomAPIError('Error getting appointments by client', 500)
        }
    }

    /**
     * Retrieves all appointments for a service.
     * 
     * @async
     * @method getAppointmentsByService
     * @memberof AppointmentService
     * @param {string} serviceId - The id of the service to retrieve appointments for.
     * @param {boolean} showAll - If true, returns all appointments for the service.
     * @throws {CustomAPIError} If there is an error getting appointments for the service.
     * @returns {Promise<Appointment[]>} The appointments that match the provided criteria.
     */
    public async getAppointmentsByService(serviceId: string, showAll?: boolean): Promise<Appointment[]> {
        if (!this._appointmentRepository) {
            await this.extendServiceRepository()
        }

        try {
            // Return all appointments
            if (showAll) {
                return await this._appointmentRepository.findByService(parseInt(serviceId))
            } 
            // Return all upcoming appointments
            else {
                return await this._appointmentRepository.findUpcomingByService(parseInt(serviceId))
            } 
        } catch(error: any) {
            console.error('Error getting appointments by service: ', error)
            throw new CustomAPIError('Error getting appointments by service', 500)
        }
    }

    /**
     * Counts all appointments for a day.
     * 
     * @async
     * @method countAppointmentsForDay
     * @memberof AppointmentService
     * @param {string} date - The date to count appointments for.
     * @throws {CustomAPIError} If the date is invalid or if there is an error counting appointments for the date.
     * @returns {Promise<number>} The number of appointments for the date.
     */
    public async countAppointmentsForDay(date: string): Promise<number> {
        if (!this._appointmentRepository) {
            await this.extendServiceRepository()
        }

        try {
            // Check if date is a valid date
            const validDate = new Date(date)
            if (isNaN(validDate.getTime())) {
                throw new CustomAPIError(`Invalid date ${date}`, 400)
            }

            return await this._appointmentRepository.countForDay(validDate)
                .catch((error: any) => {
                    console.error('Error counting appointments for day: ', error)
                    throw new CustomAPIError(`Cannot count appointments for ${date}`, 404)
                })
        } catch(error: any) {
            throw error 
        }
    }

    /**
     * Counts all appointments for a client in a week.
     * 
     * @async
     * @method countAppointmentsForWeekAndClient
     * @memberof AppointmentService
     * @param {string} startDate - The start date of the week to count appointments for.
     * @param {string} endDate - The end date of the week to count appointments for.
     * @param {string} clientId - The id of the client to count appointments for.
     * @throws {CustomAPIError} If the date range is invalid or if there is an error counting appointments for the client in the week.
     * @returns {Promise<number>} The number of appointments for the client in the week.
     */
    public async countAppointmentsForWeekAndClient(startDate: string, endDate: string, clientId: string): Promise<number> {
        if (!this._appointmentRepository) {
            await this.extendServiceRepository()
        }

        try {
            // Check if startDate and endDate are valid dates
            const start = new Date(startDate)
            const end = new Date(endDate)
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                throw new CustomAPIError(`Invalid date range ${startDate} - ${endDate}`, 400)
            }

            return await this._appointmentRepository.countForWeek(start, end, parseInt(clientId))
                .catch((error: any) => {
                    console.error('Error counting appointments for week and client: ', error)
                    throw new CustomAPIError(`Cannot count appointments for client with id ${clientId} between ${startDate} and ${endDate}`, 404)
                }) 
        } catch(error: any) {
            throw error 
        }
    }

    /**
     * Adds an appointment.
     * 
     * @async
     * @method addAppointment
     * @memberof AppointmentService
     * @param {Partial<Appointment>} appointmentData - The data of the appointment to add.
     * @throws {CustomAPIError} If the appointment could not be created.
     * @returns {Promise<Appointment>} The created appointment.
     */    
    public async addAppointment(appointmentData: Partial<Appointment>): Promise<Appointment> {
        if (!this._appointmentRepository) {
            await this.extendServiceRepository()
        }

        try {
            await this.validateEntity(appointmentData, Appointment)
            
            if (!appointmentData.date ||  !appointmentData.service || !appointmentData.client) {
                throw new CustomAPIError('Please provide the date, the service and the client', 400)
            }
            
            return await this._appointmentRepository.save(appointmentData)
                .catch((error: any) => {
                    console.error('Error adding appointment: ', error)
                    throw new CustomAPIError('Appointment could not be created', 500)
                }) 
        } catch(error: any) {
            throw error 
        }
    }

    /**
     * Updates an appointment.
     * 
     * @async
     * @method updateAppointment
     * @memberof AppointmentService
     * @param {string} id - The id of the appointment to update.
     * @param {Partial<Appointment>} appointmentData - The data to update the appointment with.
     * @throws {CustomAPIError} If the appointment could not be updated or if the appointment does not exist.
     * @returns {Promise<UpdateResult>} The result of the update operation.
     */
    public async updateAppointment(id: string, appointmentData: Partial<Appointment>): Promise<UpdateResult> {
        if (!this._appointmentRepository) {
            await this.extendServiceRepository()
        }

        try {
            await this.validateEntity(appointmentData, Appointment)

            return await this._appointmentRepository.manager.transaction(async transactionalEntityManager => {    
                const appointmentExists: boolean = await this.checkIfAppointmentExists(id)
    
                if (!appointmentExists) {
                    throw new CustomAPIError(`Appointment with id ${id} doesn't exists`, 404)
                }

                return await transactionalEntityManager.update(Appointment, parseInt(id), appointmentData)
                    .catch((error: any) => {
                        console.error('Error updating appointment: ', error)
                        throw new CustomAPIError(`Appointment with id ${id} could not be updated`, 500)
                    }) 
            }) 
        } catch(error: any) {
            throw error 
        }
    }

    /**
     * Deletes an appointment.
     * 
     * @async
     * @method deleteAppointment
     * @memberof AppointmentService
     * @param {string} id - The id of the appointment to delete.
     * @throws {CustomAPIError} If the appointment could not be deleted or if the appointment does not exist.
     * @returns {Promise<DeleteResult>} The result of the delete operation.
     */
    public async deleteAppointment(id: string): Promise<DeleteResult> {
        if (!this._appointmentRepository) {
            await this.extendServiceRepository()
        }

        try {
            return await this._appointmentRepository.manager.transaction(async transactionalEntityManager => {
                const appointmentExists: boolean = await this.checkIfAppointmentExists(id)

                if (!appointmentExists) {
                    throw new CustomAPIError(`Appointment with id ${id} doesn't exists`, 404)
                }

                return await transactionalEntityManager.delete(Appointment, parseInt(id))
                    .catch((error: any) => {
                        console.error('Error deleting appointment: ', error)
                        throw new CustomAPIError(`Appointment with id ${id} could not be deleted`, 500)
                    })
            })
        } catch(error: any) {
            throw error
        }
    }

    /**
     * Checks if an appointment exists.
     * 
     * @async
     * @method checkIfAppointmentExists
     * @memberof AppointmentService
     * @param {string} id - The id of the appointment to check.
     * @throws {CustomAPIError} If there is an error checking if the appointment exists.
     * @returns {Promise<boolean>} A boolean indicating if the appointment exists.
     */
    private async checkIfAppointmentExists(id: string): Promise<boolean> {
        if (!this._appointmentRepository) {
            await this.extendServiceRepository()
        }

        try {
            const appointment: number = await this._appointmentRepository.count({ where: { id: parseInt(id) } })
    
            return appointment > 0 
        } catch(error: any) {
            console.error('Error checking if appointment exists: ', error)
            throw new CustomAPIError(`Error checking if appointment with id ${id} exists`, 500)
        }
    }
}

export default AppointmentService