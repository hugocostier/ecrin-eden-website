import { IsOptional, IsPhoneNumber, IsPostalCode, IsString, Length } from "class-validator";
import { AfterInsert, AfterUpdate, BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "./Appointment.js";
import { User } from "./User.js";

@Entity('client')
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined 

    @Column({ 
        type: 'varchar',
        length: 255
    }) 
    @IsString({ message: 'First name must be a string' })
    first_name: string | undefined

    @Column({ 
        type: 'varchar',
        length: 255
    }) 
    @IsString({ message: 'Last name must be a string' })
    last_name: string | undefined

    @Column({
        nullable: true, 
        type: 'numeric'
    })
    @IsOptional() 
    @IsPhoneNumber('FR', { message: 'Phone number must be a valid phone number' })
    phone_number: number | undefined

    @Column({ 
        type: 'varchar',
        length: 255, 
        nullable: true 
    }) 
    @IsOptional() 
    @IsString({ message: 'Address must be a string' })
    address: string | undefined

    @Column({ 
        nullable: true, 
        type: 'numeric' 
    })
    @IsOptional() 
    @IsPostalCode('FR', { message: 'Postal code must be a valid postal code' })
    postal_code: number | undefined

    @Column({ 
        type: 'varchar',
        length: 50, 
        nullable: true 
    })
    @IsOptional() 
    @IsString({ message: 'City must be a string' })
    city: string | undefined

    @Column({ 
        type: 'varchar',
        length: 1020, 
        nullable: true 
    })
    @IsOptional() 
    @IsString({ message: 'Shared nodes must be a string' })
    @Length(0, 1020, { message: 'Private notes cannot exceed 1020 characters' })
    shared_notes: string | undefined

    @Column({ 
        type: 'varchar',
        length: 1020, 
        nullable: true 
    })
    @IsOptional() 
    @IsString({ message: 'Private notes must be a string' })
    @Length(0, 1020, { message: 'Private notes cannot exceed 1020 characters' })
    private_notes: string | undefined 

    @Column({ 
        type: 'varchar',
        length: 255, 
        nullable: true 
    })
    @IsOptional() 
    @IsString({ message: 'Invalid profile picture format' })
    profile_picture: string | undefined 

    @CreateDateColumn() 
    created_at: Date | undefined

    @UpdateDateColumn() 
    updated_at: Date | undefined

    // Foreign key for users
    @OneToOne(() => User, user => user.id, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User | undefined
    
    // Foreign key for appointments
    @OneToMany(() => Appointment, appointment => appointment.client)
    appointments: Appointment[] | undefined

}