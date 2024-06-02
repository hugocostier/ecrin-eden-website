import { IsBoolean, IsDate, IsDateString, IsEnum, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, Length } from 'class-validator'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import ValidationMessages from '../utils/validationMessages.generator.js'
import Client from './Client.entity.js'
import Service from './Service.entity.js'

/**
 * Enum for AppointmentStatus
 * 
 * @enum {string} The status of the appointment
 */
enum AppointmentStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed'
}

/**
 * Interface for Appointment
 * 
 * @interface IAppointment
 */
export interface IAppointment {
    id: number
    date: string
    time: string
    is_away: boolean
    status?: string
    private_notes?: string
    created_at: Date
    updated_at: Date
    service: Service | undefined
    client: Client | undefined
}

/**
 * Appointment entity
 * 
 * @class Appointment
 * @extends BaseEntity
 * @implements IAppointment
 * @property {number} id - The id of the appointment
 * @property {Date} date - The date of the appointment
 * @property {Date} time - The time of the appointment
 * @property {boolean} is_away - Whether the appointment is away
 * @property {string} status - The status of the appointment
 * @property {string} private_notes - The private notes of the appointment
 * @property {Date} created_at - The date the appointment was created
 * @property {Date} updated_at - The date the appointment was last updated
 * @property {Service} service - The service of the appointment
 * @property {Client} client - The client of the appointment
 */
@Entity('appointment')
export default class Appointment extends BaseEntity implements IAppointment {
    @PrimaryGeneratedColumn()
        id!: number

    @Column({ type: 'date' })
    @IsNotEmpty({ message: ValidationMessages.getMessage('Date', 'isDefined') })
    @IsDateString({ strict: true }, { message: ValidationMessages.getMessage('Date', 'date', 'yyyy-MM-dd') }) 
        date!: string

    @Column({ type: 'time' })
    @IsNotEmpty({ message: ValidationMessages.getMessage('Time', 'isDefined') })
    @IsString({ message: ValidationMessages.getMessage('Time', 'type', 'string') + ValidationMessages.getMessage('Time', 'dateFormat', 'HH:mm')})
        time!: string

    @Column({ type: 'boolean' })
    @IsNotEmpty({ message: ValidationMessages.getMessage('Is away', 'isDefined') })
    @IsBoolean({ message: ValidationMessages.getMessage('Is away', 'type', 'boolean') }) 
        is_away: boolean = false

    @Column({ type: 'enum', enum: AppointmentStatus, nullable: true })
    @IsOptional()
    @IsEnum(AppointmentStatus, { message: ValidationMessages.getMessage('Appointment status', 'isEnum') })
        status: AppointmentStatus = AppointmentStatus.PENDING

    @Column({ type: 'varchar', length: 1020, nullable: true }) 
    @IsOptional() 
    @IsString({ message: ValidationMessages.getMessage('Private notes', 'type', 'string')})
    @Length(0, 1020, { message: ValidationMessages.getMessage('Private notes', 'length', 1020)})
        private_notes?: string 

    @CreateDateColumn() 
        created_at!: Date

    @UpdateDateColumn() 
        updated_at!: Date

    // Foreign key for services
    @ManyToOne(() => Service, service => service.appointments)
    @JoinColumn({ name: 'service_id' })
    @IsNotEmpty({ message: ValidationMessages.getMessage('Service', 'isDefined') })
        service: Service | undefined

    // Foreign key for clients
    @ManyToOne(() => Client, client => client.appointments)
    @JoinColumn({ name: 'client_id' })
    @IsNotEmpty({ message: ValidationMessages.getMessage('Client', 'isDefined') })
        client: Client | undefined

}