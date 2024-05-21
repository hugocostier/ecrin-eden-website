import { IsDefined, IsNotEmpty, IsNumber, IsPositive, IsString, Length, Max, Min } from 'class-validator'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import ValidationMessages from '../utils/validationMessages.generator.js'
import Appointment from './Appointment.entity.js'

/**
 * Interface for Service
 * 
 * @interface IService 
 */
export interface IService {
    id: number
    name: string
    duration: number
    price: number
    created_at: Date
    updated_at: Date
    deleted_at: Date
    appointments?: Appointment[]
}

/**
 * Service entity
 * 
 * @class Service
 * @extends BaseEntity
 * @implements IService
 * @property {number} id - The id of the service
 * @property {string} name - The name of the service
 * @property {number} duration - The duration of the service
 * @property {number} price - The price of the service
 * @property {Date} created_at - The date the service was created
 * @property {Date} updated_at - The date the service was last updated
 * @property {Appointment[]} appointments - The appointments associated with the service
 */
@Entity('service')
export default class Service extends BaseEntity implements IService {
    @PrimaryGeneratedColumn() 
        id!: number

    @Column({ type: 'varchar', length: 100 })
    @IsNotEmpty({ message: ValidationMessages.getMessage('Name', 'isEmpty') })
    @IsString({ message: ValidationMessages.getMessage('Name', 'type', 'string') })
    @Length(0, 100, { message: ValidationMessages.getMessage('Name', 'length', '100') })
        name!: string 

    @Column({ type: 'numeric' }) 
    @IsNotEmpty({ message: ValidationMessages.getMessage('Duration', 'isEmpty') })
    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: ValidationMessages.getMessage('Duration', 'type', 'number') })
    @Min(1, { message: ValidationMessages.getMessage('Duration', 'min', '1') })
    @Max(180, { message: ValidationMessages.getMessage('Duration', 'max', '180') })
        duration!: number 

    @Column({ type: 'numeric' })
    @IsNotEmpty({ message: ValidationMessages.getMessage('Price', 'isEmpty') })
    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: ValidationMessages.getMessage('Price', 'type', 'number') })
    @IsPositive({ message: ValidationMessages.getMessage('Price', 'isPositive')})
        price!: number

    @CreateDateColumn() 
        created_at!: Date

    @UpdateDateColumn() 
        updated_at!: Date

    @DeleteDateColumn({ nullable: true })
        deleted_at!: Date 

    // Foreign key for appointments
    @OneToMany(() => Appointment, appointment => appointment.service, { nullable: true })
        appointments: Appointment[] | undefined

}