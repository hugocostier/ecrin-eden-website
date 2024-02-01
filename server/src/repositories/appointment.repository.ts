import { Between, LessThan, MoreThanOrEqual } from "typeorm";
import datasource from "../config/mysql.config.js";
import { Appointment } from "../entities/Appointment.js";

export const AppointmentRepository = datasource.getRepository(Appointment).extend({
    // Find an appointment by id
    async findById(id: number) {
        return await this.findOneBy({ id })
    },

    // Find all appointments for a day
    async findByDay(date: Date) {
        return await this.find({ where: { date } })
    },

    // Find all upcoming appointments
    async findUpcoming() {
        return await this.find({ where: { date: MoreThanOrEqual(new Date()) } })
    },

    // Find all past appointments
    async findPast() {
        return await this.find({ where: { date: LessThan(new Date()) } })
    },

    // Find all appointments for a client
    async findByClient(clientId: number) {
        return await this.find({ where: { client: { id: clientId } } })
    },

    // Find all appointments for a client in a day
    async findByClientForDay(clientId: number, date: Date) {
        return await this.find({ where: { client: { id: clientId }, date } })
    },

    // Find all upcoming appointments for a client
    async findUpcomingByClient(clientId: number) {
        return await this.find({ where: { client: { id: clientId }, date: MoreThanOrEqual(new Date()) } })
    },

    // Find all past appointments for a client
    async findPastByClient(clientId: number) {
        return await this.find({ where: { client: { id: clientId }, date: LessThan(new Date()) } })
    },

    // Find all appointments between a date range
    async findByDateRange(startDate: Date, endDate: Date) {
        return await this.find({ where: { date: Between(startDate, endDate) } })
    }, 

    // Find all appointments between a date range for a client 
    async findByDateRangeForClient(startDate: Date, endDate: Date, clientId: number) {
        return await this.find({ where: { date: Between(startDate, endDate), client: { id: clientId } } })
    },

    // Find all appointments for a service
    async findByService(serviceId: number) {
        return await this.find({ where: { service: { id: serviceId } } })
    }, 

    // Find all upcoming appointments for a service
    async findUpcomingByService(serviceId: number) {
        return await this.find({ where: { service: { id: serviceId }, date: MoreThanOrEqual(new Date()) } })
    },

    // Count all appointments in a day
    async countForDay(date: Date) {
        return await this.count({ where: { date } })
    }, 

    // Count all appointments for a client in a week 
    async countForWeek(startDate: Date, endDate: Date, clientId: number) {
        return await this.count({ where: { date: Between(startDate, endDate), client: { id: clientId} } })
    }
})