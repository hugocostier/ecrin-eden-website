import { Between, MoreThanOrEqual } from 'typeorm'
import Appointment from '../entities/Appointment.entity.js'
import BaseRepository from './base.repository.js'

/**
 * Represents a repository for managing appointments.
 * This class extends the BaseRepository class and provides methods for retrieving and manipulating appointment data.
 * 
 * @class AppointmentRepository
 * @extends BaseRepository
 */
export class AppointmentRepository extends BaseRepository {
    /**
     * Extends the appointment repository by initializing the data source and returning the extended repository.
     * 
     * @async
     * @method extendAppointmentRepository
     * @memberof AppointmentRepository
     * @throws {Error} If there is an error extending the appointment repository.
     * @returns A promise of the extended appointment repository.
     */
    public async extendAppointmentRepository() {
        try {
            await this.initializeDataSource() 
            return this.appointmentRepository() 
        }  catch (error: any) {
            console.error('Error extending appointment repository: ', error)
            throw new Error(error)
        }
    }

    /**
     * Retrieves the appointment repository.
     * 
     * @async
     * @method appointmentRepository
     * @memberof AppointmentRepository
     * @returns A promise of the extended appointment repository.
     */
    private async appointmentRepository() {
        return this.dataSource.getRepository(Appointment).extend({
            /**
             * Retrieves an appointment by its ID with related client and service information.
             * 
             * @async
             * @method findById
             * @memberof appointmentRepository
             * @param {number} id - The ID of the appointment to retrieve.
             * @returns {Promise<Appointment | null>} An appointment data object containing the appointment, client, and service details.
             */
            async findById(id: number): Promise<Appointment | null>{
                return this.createQueryBuilder('appointment')
                    .leftJoin('appointment.client', 'client')
                    .leftJoin('appointment.service', 'service')
                    .select([
                        'appointment.id',
                        'appointment.date',
                        'appointment.time',
                        'appointment.status',
                        'appointment.is_away',
                        'appointment.private_notes',
                        'client.last_name',
                        'client.first_name',
                        'client.phone_number',
                        'client.address',
                        'client.city',
                        'client.postal_code',
                        'service.name',
                        'service.price',
                        'service.duration'
                    ])
                    .where('appointment.id = :id', { id })
                    .getOne()
            },

            /**
             * Retrieves all appointments with related client and service information.
             * 
             * @async
             * @method findAll
             * @memberof appointmentRepository
             * @returns {Promise<Appointment[]>} An array of appointment data objects containing the appointment, client, and service details.
             */
            async findAll(): Promise<Appointment[]> {
                return this.createQueryBuilder('appointment')
                    .leftJoin('appointment.client', 'client')
                    .leftJoin('appointment.service', 'service')
                    .select([
                        'appointment.id',
                        'appointment.date',
                        'appointment.time',
                        'appointment.status',
                        'appointment.is_away',
                        'appointment.private_notes',
                        'client.last_name',
                        'client.first_name',
                        'service.name',
                        'service.duration'
                    ])
                    .getMany()
            },

            /**
             * Retrieves all appointments for a given date with related service information.
             * 
             * @async
             * @method findByDay
             * @memberof appointmentRepository
             * @param {Date} date - The date for which to retrieve appointments.
             * @returns {Promise<Appointment[]>} An array of appointment data objects containing the appointment, and service details.
             */
            async findByDay(date: Date): Promise<Appointment[]> {
                return this.createQueryBuilder('appointment')
                    .leftJoin('appointment.service', 'service')
                    .select([
                        'appointment.id',
                        'appointment.date',
                        'appointment.time',
                        'appointment.status',
                        'appointment.is_away',
                        'appointment.private_notes',
                        'service.name',
                        'service.duration'
                    ])
                    .where('appointment.date = :date', { date })
                    .getMany()
            },

            /**
             * Retrieves all upcoming appointments with related client and service information.
             * 
             * @async
             * @method findUpcoming
             * @memberof appointmentRepository
             * @returns {Promise<Appointment[]>} An array of appointment data objects with client and service details.
             */
            async findUpcoming(): Promise<Appointment[]> {
                return this.createQueryBuilder('appointment')
                    .leftJoin('appointment.client', 'client')
                    .leftJoin('appointment.service', 'service')
                    .select([
                        'appointment.id',
                        'appointment.date',
                        'appointment.time',
                        'appointment.status',
                        'appointment.is_away',
                        'appointment.private_notes',
                        'client.last_name',
                        'client.first_name',
                        'service.name',
                        'service.duration'
                    ])
                    .where('appointment.date >= :date', { date: new Date().toISOString().split('T')[0] })
                    .getMany()
            },

            /**
             * Retrieves all past appointments with related client and service information.
             * 
             * @async
             * @method findPast
             * @memberof appointmentRepository
             * @returns {Promise<Appointment[]>} An array of appointment data objects with client and service details.
             */
            async findPast(): Promise<Appointment[]> {
                return this.createQueryBuilder('appointment')
                .leftJoin('appointment.client', 'client')
                .leftJoin('appointment.service', 'service')
                .select([
                    'appointment.id',
                    'appointment.date',
                    'appointment.time',
                    'appointment.status',
                    'appointment.is_away',
                    'appointment.private_notes',
                    'client.last_name',
                    'client.first_name',
                    'service.name',
                    'service.duration'
                ])
                .where('appointment.date < :date', { date: new Date().toISOString().split('T')[0] })
                .getMany()
            },

            /**
             * Retrieves all appointments for a given client with related service information.
             * 
             * @async
             * @method findByClient
             * @memberof appointmentRepository
             * @param {number} clientId - The ID of the client for which to retrieve appointments.
             * @returns {Promise<Appointment[]>} An array of appointment data objects containing the appointment, and service details.
             */
            async findByClient(clientId: number): Promise<Appointment[]> {
                return this.createQueryBuilder('appointment')
                    .leftJoin('appointment.client', 'client')
                    .leftJoin('appointment.service', 'service')
                    .select([
                        'appointment.id',
                        'appointment.date',
                        'appointment.time',
                        'appointment.status',
                        'appointment.is_away',
                        'appointment.private_notes',
                        'service.name',
                        'service.duration'
                    ])
                    .where('client.id = :id', { id: clientId })
                    .getMany()
            }, 

            /**
             * Retrieves all appointments for a given client on a specific date.
             * 
             * @async
             * @method findByClientForDay
             * @memberof appointmentRepository
             * @param {number} clientId - The ID of the client for which to retrieve appointments.
             * @param {Date} date - The date for which to retrieve appointments.
             * @returns {Promise<Appointment[]>} An array of appointments for the client on the given date.
             */
            async findByClientForDay(clientId: number, date: Date): Promise<Appointment[]> {
                return await this.find({ where: { client: { id: clientId }, date } })
            },

            /**
             * Retrieves all upcoming appointments for a given client.
             * 
             * @async
             * @method findUpcomingByClient
             * @memberof appointmentRepository
             * @param {number} clientId - The ID of the client for which to retrieve appointments.
             * @returns {Promise<Appointment[]>} An array of upcoming appointment data objects containing the appointment, and service details.
             */
            async findUpcomingByClient(clientId: number): Promise<Appointment[]> {
                return this.createQueryBuilder('appointment')
                    .leftJoin('appointment.client', 'client')
                    .leftJoin('appointment.service', 'service')
                    .select([
                        'appointment.id',
                        'appointment.date',
                        'appointment.time',
                        'appointment.status',
                        'appointment.is_away',
                        'appointment.private_notes',
                        'service.name',
                        'service.duration'
                    ])
                    .where('client.id = :id', { id: clientId })
                    .andWhere('appointment.date >= :date', { date: new Date().toISOString().split('T')[0] }) 
                    .getMany()
            },

            /**
             * Retrieves all past appointments for a given client.
             * 
             * @async
             * @method findPastByClient
             * @memberof appointmentRepository
             * @param {number} clientId - The ID of the client for which to retrieve appointments.
             * @returns {Promise<Appointment[]>} An array of past appointment data objects containing the appointment, and service details.
             */
            async findPastByClient(clientId: number): Promise<Appointment[]> {
                return this.createQueryBuilder('appointment')
                    .leftJoin('appointment.client', 'client')
                    .leftJoin('appointment.service', 'service')
                    .select([
                        'appointment.id',
                        'appointment.date',
                        'appointment.time',
                        'appointment.status',
                        'appointment.is_away',
                        'appointment.private_notes',
                        'service.name',
                        'service.duration'
                    ])
                    .where('client.id = :id', { id: clientId })
                    .andWhere('appointment.date < :date', { date: new Date().toISOString().split('T')[0] })
                    .getMany()
            },

            /**
             * Retrieves all appointments for a given date range.
             * 
             * @async
             * @method findByDateRange
             * @memberof appointmentRepository
             * @param {Date} startDate - The start date of the range for which to retrieve appointments.
             * @param {Date} endDate - The end date of the range for which to retrieve appointments.
             * @returns {Promise<Appointment[]>} An array of appointments within the given date range.
             */
            async findByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]> {
                return await this.find({ where: { date: Between(startDate, endDate) } })
            }, 

            /**
             * Retrieves all appointments for a given date range for a specific client.
             * 
             * @async
             * @method findByDateRangeForClient
             * @memberof appointmentRepository
             * @param {Date} startDate - The start date of the range for which to retrieve appointments.
             * @param {Date} endDate - The end date of the range for which to retrieve appointments.
             * @param {number} clientId - The ID of the client for which to retrieve appointments.
             * @returns {Promise<Appointment[]>} An array of appointments within the given date range for the client.
             */
            async findByDateRangeForClient(startDate: Date, endDate: Date, clientId: number): Promise<Appointment[]> {
                return await this.find({ where: { date: Between(startDate, endDate), client: { id: clientId } } })
            },

            /**
             * Retrieves all appointments for a given service.
             * 
             * @async
             * @method findByService
             * @memberof appointmentRepository
             * @param {number} serviceId - The ID of the service for which to retrieve appointments.
             * @returns {Promise<Appointment[]>} An array of appointments for the given service.
             */
            async findByService(serviceId: number): Promise<Appointment[]> {
                return await this.find({ where: { service: { id: serviceId } } })
            }, 

            /**
             * Retrieves all upcoming appointments for a given service.
             * 
             * @async
             * @method findUpcomingByService
             * @memberof appointmentRepository
             * @param {number} serviceId - The ID of the service for which to retrieve appointments.
             * @returns {Promise<Appointment[]>} An array of upcoming appointments for the given service.
             */
            async findUpcomingByService(serviceId: number): Promise<Appointment[]> {
                return await this.find({ where: { service: { id: serviceId }, date: MoreThanOrEqual(new Date()) } })
            },

            /**
             *Counts the number of appointments for a given date.
             *
             * @async
             * @method countForDay
             * @memberof appointmentRepository
             * @param {Date} date - The date for which to count appointments.
             * @returns {Promise<number>} The number of appointments on the given date.
             */
            async countForDay(date: Date): Promise<number> {
                return await this.count({ where: { date } })
            }, 

            /**
             * Counts the number of appointments for a given date range.
             * 
             * @async
             * @method countForDateRange
             * @memberof appointmentRepository
             * @param {Date} startDate - The start date of the range for which to count appointments.
             * @param {Date} endDate - The end date of the range for which to count appointments.
             * @returns {Promise<number>} The number of appointments within the given date range.
             */
            async countForWeek(startDate: Date, endDate: Date, clientId: number): Promise<number> {
                return await this.count({ where: { date: Between(startDate, endDate), client: { id: clientId} } })
            }
        })
    }
}