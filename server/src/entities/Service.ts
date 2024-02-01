import { IsInt, IsNotEmpty, Max, Min } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "./Appointment.js";

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
    @IsInt({ message: 'Duration must be a number' })
    @Min(1, { message: 'Duration must be at least 1 minute' })
    @Max(180, { message: "Duration cannot exceed 180 minutes (3 hours)" })
    @IsNotEmpty({ message: 'Duration cannot be empty' })
    duration: number | undefined 

    @Column({ type: 'numeric' })
    @IsInt({ message: 'Price must be a number' })
    @Min(0, { message: 'Price cannot be negative' })
    @IsNotEmpty({ message: 'Price cannot be empty' })
    price: number | undefined

    @OneToMany(() => Appointment, appointment => appointment.service)
    appointments: Appointment[] | undefined

    @CreateDateColumn() 
    created_at: Date | undefined

    @UpdateDateColumn() 
    updated_at: Date | undefined
    
}