import { IsNotEmpty, Max, Min, ValidationArguments } from 'class-validator'
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Appointment } from './Appointment.js'

@Entity('service')
export class Service extends BaseEntity {

    @PrimaryGeneratedColumn() 
        id: number | undefined

    @Column({
        type: 'varchar',
        length: 100, 
    })
    @IsNotEmpty({ message: 'Name cannot be empty' })
        name: string | undefined 

    @Column({ type: 'numeric' }) 
    @Min(1, { message: 'Duration must be at least $constraint1 minute, you entered $value' })
    @Max(180, { message: (args: ValidationArguments) => {
        if (typeof args.value === 'number') {
            return `Duration cannot exceed ${args.constraints[0]}, you entered ${args.value}`
        } else {
            return 'Duration must be a number'
        }
    }})
    @IsNotEmpty({ message: 'Duration cannot be empty' })
        duration: number | undefined 

    @Column({ type: 'numeric' })
    @Min(0, { message: (args: ValidationArguments) => {
        if (typeof args.value === 'number') {
            return `Price must be at least ${args.constraints[0]}`
        } else {
            return 'Price must be a number'
        }
    }})
    @IsNotEmpty({ message: 'Price cannot be empty' })
        price: number | undefined

    @OneToMany(() => Appointment, appointment => appointment.service)
        appointments: Appointment[] | undefined

    @CreateDateColumn() 
        created_at: Date | undefined

    @UpdateDateColumn() 
        updated_at: Date | undefined
    
}