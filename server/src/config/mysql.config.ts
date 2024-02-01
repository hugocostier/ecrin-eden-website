import dotenv from 'dotenv';
import { dirname } from 'path';
import 'reflect-metadata';
import { DataSource } from "typeorm";
import { fileURLToPath } from 'url';
import { Appointment } from '../entities/Appointment.js';
import { Client } from '../entities/Client.js';
import { Service } from '../entities/Service.js';
import { User } from '../entities/User.js';

dotenv.config() 

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const AppDataSource = new DataSource({
    type: 'mysql', 
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT ?? '3306'),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    synchronize: true,
    logging: true, 
    entities: [User, Client, Service, Appointment], 
    migrations: [__dirname + '/../migrations/*.ts'],
    subscribers: [__dirname + '/../subscribers/*.ts'],
})

export default AppDataSource