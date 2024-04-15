import { IsISO8601, IsOptional, IsPhoneNumber, IsPostalCode, IsString, Length } from 'class-validator'
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Client } from './Client.js'

@Entity('preferences')
export class Preferences extends BaseEntity {
    @PrimaryGeneratedColumn()
        id: number | undefined 

    @Column({ 
        nullable: true,
        type: 'varchar',
        length: 255
    }) 
    @IsOptional()
    @IsString({ message: 'First name must be a string' })
        question_1: string | undefined

    @Column({ 
        nullable: true,
        type: 'varchar',
        length: 255
    }) 
    @IsOptional()
    @IsString({ message: 'First name must be a string' })
        question_2: string | undefined

    @Column({ 
        nullable: true,
        type: 'varchar',
        length: 255
    }) 
    @IsOptional()
    @IsString({ message: 'First name must be a string' })
        question_3: string | undefined

    @Column({ 
        nullable: true,
        type: 'varchar',
        length: 255
    }) 
    @IsOptional()
    @IsString({ message: 'First name must be a string' })
        question_4: string | undefined

    @Column({ 
        nullable: true,
        type: 'varchar',
        length: 1020
    }) 
    @IsOptional()
    @IsString({ message: 'First name must be a string' })
    @Length(0, 1020, { message: 'Question 5 cannot exceed 1020 characters' })
        question_5: string | undefined

    @CreateDateColumn() 
        created_at: Date | undefined

    @UpdateDateColumn() 
        updated_at: Date | undefined

    // Foreign key for client
    @OneToOne(() => Client, client => client.preferences, { nullable: true })
    @JoinColumn({ name: 'client_id' })
        client: Client | null = null 

}