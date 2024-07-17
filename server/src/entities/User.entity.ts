import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, Matches } from 'class-validator'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from 'typeorm'
import ValidationMessages from '../utils/validationMessages.generator.js'
import Client from './Client.entity.js'

/**
 * Enum for UserRole
 * 
 * @enum {string} The role of the user
 */
enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}

/**
 * Interface for User
 * 
 * @interface IUser
 */
export interface IUser {
    id: string
    email: string
    password: string
    role?: string
    salt?: string
    otp?: number | null
    otpExpires?: Date | null
    verification_token: string | undefined
    verified: boolean
    created_at: Date
    updated_at: Date
    client: Client | undefined
}

/**
 * User entity
 * 
 * @class User
 * @extends BaseEntity
 * @implements IUser
 * @property {string} id - The id of the user
 * @property {string} email - The email of the user
 * @property {string} password - The password of the user
 * @property {UserRole} role - The role of the user
 * @property {string} salt - The salt of the user
 * @property {number} otp - The one-time password of the user
 * @property {Date} otpExpires - The expiration date of the one-time password
 * @property {Date} created_at - The date the user was created
 * @property {Date} updated_at - The date the user was last updated
 * @property {Client} client - The client of the user
 */
@Entity('user')
export default class User extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn('uuid')
        id!: string

    @Column({ unique: true, type: 'varchar', length: 255 }) 
    @Unique('Email', ['email']) 
    @IsNotEmpty({ message: ValidationMessages.getMessage('Email', 'isEmpty') })
    @IsString({ message: ValidationMessages.getMessage('Email', 'type', 'string') })
    @IsEmail({}, { message: ValidationMessages.getMessage('Email', 'isEmail') }) 
    @Length(0, 255, { message: ValidationMessages.getMessage('Email', 'length', 255)})
        email!: string

    @Column({ type: 'varchar', length: 255 })
    @IsOptional()
    @IsNotEmpty({ message: ValidationMessages.getMessage('Password', 'isEmpty') })
    @IsString({ message: ValidationMessages.getMessage('Password', 'type', 'string') })
    @Length(8, 100, { message: ValidationMessages.getMessage('Password', 'lengthRange', 8, 100) }) 
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' })
        password!: string

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    @IsOptional()
    @IsNotEmpty({ message: ValidationMessages.getMessage('Role', 'isEmpty') })
    @IsEnum(UserRole, { message: ValidationMessages.getMessage('Role', 'isEnum') }) 
        role: UserRole = UserRole.USER

    @Column({ type: 'varchar', length: 255 })
    @IsOptional() 
    @IsNotEmpty({ message: ValidationMessages.getMessage('Salt', 'isEmpty') })
    @IsString({ message: ValidationMessages.getMessage('Salt', 'type', 'string') })
    @Length(0, 255, { message: ValidationMessages.getMessage('Salt', 'length', 255)})
        salt!: string

    @Column({ type: 'numeric', nullable: true })
    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: ValidationMessages.getMessage('OTP', 'isNumber') })
    @IsPositive({ message: ValidationMessages.getMessage('OTP', 'isPositive') })
        otp: number | null = null 

    @Column({ type: 'datetime', nullable: true })
    @IsOptional()
    @IsDate({ message: ValidationMessages.getMessage('OTP expiration date', 'isDate') })
        otpExpires: Date | null = null 

    @Column({ type: 'varchar', length: 255, nullable: true })
    @IsOptional()
    @IsString({ message: ValidationMessages.getMessage('Verification token', 'type', 'string') })
    @Length(0, 255, { message: ValidationMessages.getMessage('Verification token', 'length', 255)})
        verification_token: string | undefined

    @Column({ type: 'boolean', default: false })
    @IsOptional()
    @IsBoolean({ message: ValidationMessages.getMessage('Verified', 'type', 'string') })
        verified: boolean = false

    @CreateDateColumn() 
        created_at!: Date

    @UpdateDateColumn() 
        updated_at!: Date

    // Foreign key for clients
    @OneToOne(() => Client, client => client.user)
    @JoinColumn({ name: 'client_id'})
        client: Client | undefined 
}