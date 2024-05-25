import { IsDateString, IsMobilePhone, IsNotEmpty, IsOptional, IsPostalCode, IsString, Length, ValidateIf } from 'class-validator'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import ValidationMessages from '../utils/validationMessages.generator.js'
import Appointment from './Appointment.entity.js'
import Preferences from './Preferences.entity.js'
import User from './User.entity.js'

/**
 * Interface for Client
 * 
 * @interface IClient
 */
export interface IClient {
    id: number
    first_name: string
    last_name: string
    phone_number?: string
    birth_date?: string
    address?: string
    postal_code?: string
    city?: string
    shared_notes?: string
    private_notes?: string
    profile_picture?: string
    created_at: Date
    updated_at: Date
    deleted_at: Date
    user?: User | null
    preferences?: Preferences | null
    appointments?: Appointment[]
}

/**
 * Client entity
 * 
 * @class Client
 * @extends BaseEntity
 * @implements IClient
 * @property {number} id - The id of the client
 * @property {string} first_name - The first name of the client
 * @property {string} last_name - The last name of the client
 * @property {string} phone_number - The phone number of the client
 * @property {Date} birth_date - The birth date of the client
 * @property {string} address - The address of the client
 * @property {string} postal_code - The postal code of the client
 * @property {string} city - The city of the client
 * @property {string} shared_notes - The shared notes of the client
 * @property {string} private_notes - The private notes of the client
 * @property {string} profile_picture - The profile picture of the client
 * @property {Date} created_at - The date the client was created
 * @property {Date} updated_at - The date the client was last updated
 * @property {User | null} user - The user associated with the client
 * @property {Preferences | null} preferences - The preferences associated with the client
 * @property {Appointment[]} appointments - The appointments associated with the client
 */
@Entity('client')
export default class Client extends BaseEntity implements IClient {
    @PrimaryGeneratedColumn()
        id!: number 

    @Column({ type: 'varchar', length: 50 }) 
    @IsNotEmpty({ message: ValidationMessages.getMessage('First name', 'isEmpty') })
    @IsString({ message: ValidationMessages.getMessage('First name', 'type', 'string') })
    @Length(1, 50, { message: ValidationMessages.getMessage('First name', 'length', 50) })
        first_name!: string

    @Column({ type: 'varchar', length: 50 }) 
    @IsNotEmpty({ message: ValidationMessages.getMessage('Last name', 'isEmpty') })
    @IsString({ message: ValidationMessages.getMessage('Last name', 'type', 'string') })
    @Length(1, 50, { message: ValidationMessages.getMessage('Last name', 'length', 50) })
        last_name!: string

    @Column({ nullable: true, type: 'varchar', length: 10 })
    @IsOptional() 
    @ValidateIf(o => o.phone_number !== '')
    @IsString({ message: ValidationMessages.getMessage('Phone number', 'type', 'string') })
    @IsMobilePhone('fr-FR', {}, { message: ValidationMessages.getMessage('Phone number', 'isPhoneNumber') })
    @Length(10, 10, { message: ValidationMessages.getMessage('Phone number', 'definedLength', 10) })
        phone_number?: string

    @Column({ nullable: true, type: 'date', 
        transformer: { 
            to: (value: Date) => value, 
            from: (value: string) => value !== null ? new Date(value) : null
        }
    })
    @IsOptional() 
    @ValidateIf(o => o.birth_date !== '')
    @IsDateString({ strict: true }, { message: ValidationMessages.getMessage('Birth date', 'date', 'yyyy-MM-dd') })
        birth_date?: string

    @Column({ type: 'varchar', length: 255, nullable: true }) 
    @IsOptional() 
    @IsString({ message: ValidationMessages.getMessage('Address', 'type', 'string') })
    @Length(0, 255, { message: ValidationMessages.getMessage('Address', 'length', 255) })
        address?: string

    @Column({ nullable: true, type: 'varchar', length: 5 })
    @IsOptional() 
    @ValidateIf(o => o.postal_code !== '')
    @IsString({ message: ValidationMessages.getMessage('Postal code', 'type', 'string') })
    @IsPostalCode('FR', { message: ValidationMessages.getMessage('Postal code', 'isPostalCode') })
    @Length(5, 5, { message: ValidationMessages.getMessage('Postal code', 'definedLength', 5) })
        postal_code?: string

    @Column({ type: 'varchar', length: 50, nullable: true })
    @IsOptional() 
    @IsString({ message: ValidationMessages.getMessage('City', 'type', 'string') })
    @Length(0, 50, { message: ValidationMessages.getMessage('City', 'length', 50) })
        city?: string

    @Column({ type: 'varchar', length: 1020, nullable: true })
    @IsOptional() 
    @IsString({ message: ValidationMessages.getMessage('Shared notes', 'type', 'string') })
    @Length(0, 1020, { message: ValidationMessages.getMessage('Shared notes', 'length', 1020) })
        shared_notes?: string

    @Column({ type: 'varchar', length: 1020, nullable: true })
    @IsOptional() 
    @IsString({ message: ValidationMessages.getMessage('Private notes', 'type', 'string') })
    @Length(0, 1020, { message: ValidationMessages.getMessage('Private notes', 'length', 1020)})
        private_notes?: string 

    @Column({ type: 'varchar', length: 255, nullable: true })
    @IsOptional() 
    @IsString({ message: ValidationMessages.getMessage('Profile picture', 'type', 'string')})
    @Length(0, 255, { message: ValidationMessages.getMessage('Profile picture', 'length', 255)})
        profile_picture?: string 

    @CreateDateColumn() 
        created_at!: Date

    @UpdateDateColumn() 
        updated_at!: Date

    @DeleteDateColumn({ nullable: true })
        deleted_at!: Date

    // Foreign key for users
    @OneToOne(() => User, user => user.client, { nullable: true })
    @JoinColumn({ name: 'user_id' })
        user: User | null = null 

    // Foreign key for preferences
    @OneToOne(() => Preferences, preferences => preferences.client, { nullable: true })
    @JoinColumn({ name: 'preferences_id' })
        preferences: Preferences | null = null
    
    // Foreign key for appointments
    @OneToMany(() => Appointment, appointment => appointment.client, { nullable: true })
    @JoinColumn({ name: 'client_id' })
        appointments: Appointment[] | undefined

}