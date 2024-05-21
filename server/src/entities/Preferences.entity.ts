import { IsOptional, IsString, Length } from 'class-validator'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import ValidationMessages from '../utils/validationMessages.generator.js'
import Client from './Client.entity.js'

/**
 * Interface for Preferences
 * 
 * @interface IPreferences 
 */
export interface IPreferences {
    id: number
    question_1?: string
    question_2?: string
    question_3?: string
    question_4?: string
    question_5?: string
    created_at: Date
    updated_at: Date
    client?: Client | null
}

/**
 * Preferences entity
 * 
 * @class Preferences
 * @extends BaseEntity
 * @implements IPreferences
 * @property {number} id - The id of the preferences
 * @property {string} question_1 - The answer to the question
 * @property {string} question_2 - The answer to the question
 * @property {string} question_3 - The answer to the question
 * @property {string} question_4 - The answer to the question
 * @property {string} question_5 - The answer to the question
 * @property {Date} created_at - The date the preferences were created
 * @property {Date} updated_at - The date the preferences were last updated
 * @property {Client | null} client - The client associated with the preferences
 */
@Entity('preferences')
export default class Preferences extends BaseEntity implements IPreferences {
    @PrimaryGeneratedColumn()
        id!: number 

    @Column({ nullable: true, type: 'varchar', length: 255 }) 
    @IsOptional()
    @IsString({ message: ValidationMessages.getMessage('Question 1', 'type', 'string') })
    @Length(0, 255, { message: ValidationMessages.getMessage('Question 1', 'length', '255') })
        question_1?: string

    @Column({ nullable: true, type: 'varchar', length: 255 }) 
    @IsOptional()
    @IsString({ message: ValidationMessages.getMessage('Question 2', 'type', 'string') })
    @Length(0, 255, { message: ValidationMessages.getMessage('Question 2', 'length', '255') })
        question_2?: string

    @Column({ nullable: true, type: 'varchar', length: 255 }) 
    @IsOptional()
    @IsString({ message: ValidationMessages.getMessage('Question 3', 'type', 'string') })
    @Length(0, 255, { message: ValidationMessages.getMessage('Question 3', 'length', '255')})
        question_3?: string

    @Column({ nullable: true, type: 'varchar', length: 255 }) 
    @IsOptional()
    @IsString({ message: ValidationMessages.getMessage('Question 4', 'type', 'string') })
    @Length(0, 255, { message: ValidationMessages.getMessage('Question 4', 'length', '255') })
        question_4?: string

    @Column({ nullable: true, type: 'varchar', length: 1020 }) 
    @IsOptional()
    @IsString({ message: ValidationMessages.getMessage('Question 5', 'type', 'string') })
    @Length(0, 1020, { message: ValidationMessages.getMessage('Question 5', 'length', '1020') })
        question_5?: string

    @CreateDateColumn() 
        created_at!: Date

    @UpdateDateColumn() 
        updated_at!: Date

    // Foreign key for client
    @OneToOne(() => Client, client => client.preferences, { nullable: true })
    @JoinColumn({ name: 'client_id' })
        client: Client | null = null 

}