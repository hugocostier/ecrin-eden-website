import { IsEmail, IsEnum, Length, Matches } from 'class-validator'
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Client } from './Client.js'

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}

@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
        id: number | undefined

    @Column({ 
        unique: true, 
        type: 'varchar',
        length: 255
    }) 
    @IsEmail() 
        email: string | undefined

    @Column({ 
        type: 'varchar',
        length: 100
    })
    @Length(8, 100, { message: 'Password must be at least 8 characters long'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' })
        password: string | undefined

    @Column({ 
        type: 'enum', 
        enum: UserRole, 
        default: UserRole.USER
    })
    @IsEnum(UserRole)
        role: string = UserRole.USER

    @Column({
        type: 'varchar',
        length: 100,
    })
    salt: string | undefined

    @CreateDateColumn() 
        created_at: Date | undefined

    @UpdateDateColumn() 
        updated_at: Date | undefined

    // Foreign key for clients
    @OneToOne(() => Client, client => client.user)
    @JoinColumn({ name: 'client_id'})
        client: Client | undefined 
        
}