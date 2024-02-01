import { hash } from 'bcrypt';
import { IsEmail, IsEnum, Length, Matches, validate } from "class-validator";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from './Client.js';

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
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character" })
    password: string | undefined

    @Column({ 
        type: 'enum', 
        enum: UserRole, 
        default: UserRole.USER
    })
    @IsEnum(UserRole)
    role: string = UserRole.USER

    @CreateDateColumn() 
    created_at: Date | undefined

    @UpdateDateColumn() 
    updated_at: Date | undefined

    // Foreign key for clients
    @OneToOne(() => Client, client => client.id)
    client: Client | undefined

    // Validate that email is unique before inserting or updating
    @BeforeInsert() 
    @BeforeUpdate() 
    async validateUniqueEmail() {
        const existingUser = await User.findOne({ where: { email: this.email }})

        if (existingUser && existingUser.id !== this.id) {
            throw new Error('Email already in use')
        }
    }

    // Hash password before inserting or updating
    @BeforeInsert()
    @BeforeUpdate() 
    async hashPassword(): Promise<void> {
        if (this.password) {
            this.password = await hash(this.password, 10);
        }
    }

    // Associate user with existing client or create new client if it doesn't exist
    static async associateWithClient(firstName: string, lastName: string, email: string, password: string): Promise<User> { 
        const existingClient = await Client.findOne({ where: { first_name: firstName, last_name: lastName }})

        const newUser = this.create({ email, password}); 
        
        if (existingClient) {
            newUser.client = existingClient;
        } else {
            const newClient = Client.create({ first_name: firstName, last_name: lastName });
            await newClient.save();

            newUser.client = newClient;
        }
        
        return newUser.save();
    }

}