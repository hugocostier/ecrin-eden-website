import { IsBoolean, IsDate, IsDateString, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./Client.js";
import { Service } from "./Service.js";

export enum AppointmentStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed'
}

@Entity('appointment')
export class Appointment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column({ type: 'date' })
    @IsDateString() 
    date: Date | undefined

    @Column({ type: 'boolean' })
    @IsBoolean({ message: 'Is away must be a boolean'}) 
    is_away: boolean = false

    @Column({
        type: 'enum', 
        enum: AppointmentStatus, 
        default: AppointmentStatus.PENDING, 
        nullable: true
    })
    @IsOptional()
    @IsEnum(AppointmentStatus, { message: 'Invalid appointment status' })
    status: string = AppointmentStatus.PENDING

    @Column({ 
        type: 'varchar', 
        length: 1020, 
        nullable: true 
    })
    @IsOptional() 
    @IsString({ message: 'Client notes must be a string' })
    @Length(0, 1020, { message: 'Client notes cannot exceed 1020 characters' })
    client_notes: string | undefined 

    @Column({ 
        type: 'varchar', 
        length: 1020,
        nullable: true 
    }) 
    @IsOptional() 
    @IsString({ message: 'Private notes must be a string' })
    @Length(0, 1020, { message: 'Private notes cannot exceed 1020 characters' })
    private_notes: string | undefined 

    @CreateDateColumn() 
    created_at: Date | undefined

    @UpdateDateColumn() 
    updated_at: Date | undefined

    // Foreign key for services
    @ManyToOne(() => Service, service => service.appointments)
    @JoinColumn({ name: 'service_id' })
    service: Service | undefined

    // Foreign key for clients
    @ManyToOne(() => Client, client => client.appointments)
    @JoinColumn({ name: 'client_id' })
    client: Client | undefined

}