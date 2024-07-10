import { Repository, UpdateResult } from 'typeorm'
import { DeleteResult } from 'typeorm/browser'
import EmailController from '../controllers/email.controller.js'
import Appointment from '../entities/Appointment.entity.js'
import Client from '../entities/Client.entity.js'
import Service from '../entities/Service.entity.js'
import User from '../entities/User.entity.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import { AppointmentRepository } from '../repositories/appointment.repository.js'
import BaseService from './base.service.js'
import { ClientService } from './client.service.js'
import { UserService } from './user.service.js'

/**
 * Service class for appointments.
 * 
 * @class AppointmentService
 * @extends BaseService
 * @property {AppointmentRepository} _customRepository - The custom repository for appointments.
 * @property {Repository<Appointment> & { findAll(): Promise<Appointment[]>; findById(id: number): Promise<Appointment | null>; findByDay(day: string): Promise<Appointment[]>; findByDateRange(rangeStart: string, rangeEnd: string): Promise<Appointment[]>; findUpcoming(): Promise<Appointment[]>; findPast(): Promise<Appointment[]>; findByClient(clientId: number): Promise<Appointment[]>; findByClientForDay(clientId: number, day: string): Promise<Appointment[]>; findByDateRangeForClient(rangeStart: string, rangeEnd: string, clientId: number): Promise<Appointment[]>; findUpcomingByClient(clientId: number): Promise<Appointment[]>; findPastByClient(clientId: number): Promise<Appointment[]>; findByService(serviceId: number): Promise<Appointment[]>; findUpcomingByService(serviceId: number): Promise<Appointment[]>; countForDay(date: string): Promise<number>; countForWeek(startDate: string, endDate: string, clientId: number): Promise<number>; }} _appointmentRepository - The extended repository for appointments.
 **/
class AppointmentService extends BaseService {
    private _customRepository: AppointmentRepository = new AppointmentRepository()
    private _clientService: ClientService = new ClientService()
    private _appointmentRepository!: Repository<Appointment> & {
        findAll(): Promise<Appointment[]>
        findById(id: number): Promise<Appointment | null>
        findByDay(day: string): Promise<Appointment[]>
        findByDateRange(rangeStart: string, rangeEnd: string): Promise<Appointment[]>
        findUpcoming(): Promise<Appointment[]>
        findPast(): Promise<Appointment[]>
        findByClient(clientId: number): Promise<Appointment[]>
        findByClientForDay(clientId: number, day: string): Promise<Appointment[]>
        findByDateRangeForClient(rangeStart: string, rangeEnd: string, clientId: number): Promise<Appointment[]>
        findUpcomingByClient(clientId: number): Promise<Appointment[]>
        findPastByClient(clientId: number): Promise<Appointment[]>
        findByService(serviceId: number): Promise<Appointment[]>
        findUpcomingByService(serviceId: number): Promise<Appointment[]>
        countForDay(date: string): Promise<number>
        countForWeek(startDate: string, endDate: string, clientId: number): Promise<number>
    }

    private _userService: UserService = new UserService()
    private _emailController: EmailController = new EmailController()

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
     * @param {string} day - The date of the appointments to retrieve.
     * @throws {CustomAPIError} If there the date or date range is invalid or if there is an error getting appointments.
     * @returns {Promise<Appointment[]>} The appointments that match the provided criteria.
     */
    public async getAppointments(showHistory?: boolean, showAll?: boolean, rangeStart?: string, rangeEnd?: string, day?: string): Promise<Appointment[]> {
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

                return await this._appointmentRepository.findByDateRange(rangeStart, rangeEnd) 
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
     * @param {string} day - The date of the appointments to retrieve.
     * @throws {CustomAPIError} If there the date or date range is invalid or if there is an error getting appointments for the client.
     * @returns {Promise<Appointment[]>} The appointments that match the provided criteria.
     */
    public async getAppointmentsByClient(clientId: string, showHistory?: boolean, showAll?: boolean, rangeStart?: string, rangeEnd?: string, day?: string): Promise<Appointment[]> {
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

                return await this._appointmentRepository.findByDateRangeForClient(rangeStart, rangeEnd, parseInt(clientId)) 
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

            return await this._appointmentRepository.countForDay(date)
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

            return await this._appointmentRepository.countForWeek(startDate, endDate, parseInt(clientId))
                .catch((error: any) => {
                    console.error('Error counting appointments for week and client: ', error)
                    throw new CustomAPIError(`Cannot count appointments for client with id ${clientId} between ${startDate} and ${endDate}`, 404)
                }) 
        } catch(error: any) {
            throw error 
        }
    }

    /**
     * Adds an appointment and if the client does not exist, adds him as well.
     * 
     * @async
     * @method addAppointment
     * @memberof AppointmentService
     * @param {Partial<Appointment>} appointmentData - The data of the appointment to add.
     * @throws {CustomAPIError} If the appointment could not be created.
     * @returns {Promise<{ affected: number; generatedMaps: never[]; raw: never[]; }>} The result of the add operation.
     */    
    public async addAppointment(appointmentData: Partial<Appointment>): Promise<{ affected: number; generatedMaps: never[]; raw: never[]; }> {
        if (!this._appointmentRepository) {
            await this.extendServiceRepository()
        }

        const clientData: Partial<Client> = appointmentData.client as Partial<Client>

        try {
            return await this._appointmentRepository.manager.transaction(async transactionalEntityManager => {
                if (!clientData.id) {
                    const clientExists: boolean = await this._clientService.isExistingClient(clientData.first_name as string, clientData.last_name as string)
                    
                    if (!clientExists) {
                        await this.validateEntity(clientData, Client)

                        const newClient: Client = await transactionalEntityManager.save(Client, clientData)
                            .catch((error: any) => {
                                console.error('Error adding client: ', error)
                                throw new CustomAPIError('Client could not be created', 500)
                            })

                        clientData.id = newClient.id
                    } else {
                        const client: Client = await this._clientService.getClientByName(clientData.first_name as string, clientData.last_name as string)
                        clientData.id = client.id
                    }
                    
                    appointmentData.client = clientData as Client
                }

                await this.validateEntity(appointmentData, Appointment)
                
                if (!appointmentData.date ||  !appointmentData.service || !appointmentData.client) {
                    throw new CustomAPIError('Please provide the date, the service and the client', 400)
                }
                
                const newAppointment: Appointment = await transactionalEntityManager.save(Appointment, appointmentData)
                    .catch((error: any) => {
                        console.error('Error adding appointment: ', error)
                        throw new CustomAPIError('Appointment could not be created', 500)
                    }) 

                const service: Service | null = await transactionalEntityManager.findOneBy(Service, { id: newAppointment.service?.id })
                if (!service) {
                    throw new CustomAPIError('Service not found', 400)
                }

                const appointment: Partial<Appointment> = {...newAppointment, service: service}

                await this.sendEmailNotifications(appointment as Appointment, '', appointment.status as string, 'add')

                return { affected: 1, generatedMaps: [], raw: [] }                
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

            const previousAppointment: Appointment = await this.getAppointmentById(id)
            const previousStatus = previousAppointment.status

            const update = await this._appointmentRepository.manager.transaction(async transactionalEntityManager => {    
                return await transactionalEntityManager.update(Appointment, parseInt(id), appointmentData)
                    .catch((error: any) => {
                        console.error('Error updating appointment: ', error)
                        throw new CustomAPIError(`Appointment with id ${id} could not be updated`, 500)
                    }) 

            }) 

            const appointmentUpdated: Appointment = await this.getAppointmentById(id)

            if (this.hasRelevantChanges(previousAppointment, appointmentUpdated)) {
                await this.sendEmailNotifications(appointmentUpdated, previousStatus, appointmentData.status as string, 'update')
            }

            return update
        } catch(error: any) {
            throw error 
        }
    }

    /**
     * Checks if an appointment has relevant changes.
     * 
     * @method hasRelevantChanges
     * @memberof AppointmentService
     * @param {Appointment} oldAppointment - The old appointment.
     * @param {Appointment} newAppointment - The new appointment.
     * @returns {boolean} A boolean indicating if the appointment has relevant changes.
     */
    private hasRelevantChanges(oldAppointment: Appointment, newAppointment: Appointment): boolean {
        const appointmentKeys = Object.keys(newAppointment) as (keyof Appointment)[]

        for (const key of appointmentKeys) {
            if (key === 'service') {
                const serviceKeys = Object.keys(newAppointment.service as Service) as (keyof Service)[]

                for (const key of serviceKeys) {
                    if (newAppointment.service && oldAppointment.service) {
                        if (newAppointment.service[key] !== oldAppointment.service[key]) {
                            return true
                        }
                    }
                }
                return false
            }

            if (key !== 'private_notes' && newAppointment[key] !== oldAppointment[key]) {
                return true
            } 
        }
        return false
    }

    /**
     * Sends email notifications for an appointment.
     * 
     * @async
     * @method sendEmailNotifications
     * @memberof AppointmentService
     * @param {Appointment} appointment - The appointment to send email notifications for.
     * @param {string} previousStatus - The previous status of the appointment.
     * @param {string} newStatus - The new status of the appointment.
     * @param {string} action - The action to take for the appointment.
     * @throws {CustomAPIError} If the client is not found or if there is an error sending the email notifications.
     * @returns {Promise<void>} A promise that resolves when the email notifications are successfully sent.
     */
    public async sendEmailNotifications(appointment: Appointment, previousStatus: string, newStatus: string, action: string): Promise<void> {
        if (!appointment.client) {
            throw new CustomAPIError('Client not found', 400)
        }

        const user: User | null = await this._userService.getUserByClient(appointment.client?.id.toString())

        switch (action) {
            case 'update': 
                if (user) {
                    if (newStatus === 'confirmed' && previousStatus !== newStatus) {
                        await this._emailController.sendAppointmentConfirmation(appointment, user.email)
                            .catch((error: any) => {
                                throw new CustomAPIError('Error sending appointment confirmation email', 500)
                            })
                    } else if (newStatus === 'cancelled' && previousStatus !== newStatus) {
                        await this._emailController.sendAppointmentCancellation(appointment, user.email)
                            .catch((error: any) => {
                                throw new CustomAPIError('Error sending appointment cancellation email', 500)
                            })
                    } else {
                        await this._emailController.sendAppointmentUpdate(appointment, user.email)
                            .catch((error: any) => {
                                throw new CustomAPIError('Error sending appointment update email', 500)
                            })
                    }
                }
                break
            case 'add':
                if (user) {
                    await this._emailController.sendAppointmentRequest(appointment, user.email)
                        .catch((error: any) => {
                            throw new CustomAPIError(`Error sending appointment request email, ${error}`, 500)
                        })
                }
                await this._emailController.sendAppointmentRequestToAdmin(appointment)
                    .catch((error: any) => {
                        throw new CustomAPIError('Error sending appointment update email to admin', 500)
                    })
                break
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