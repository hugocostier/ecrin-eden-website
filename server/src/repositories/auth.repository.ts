import crypto from 'crypto'
import AppDataSource from '../config/mysql.config.js'
import { Client } from '../entities/Client.js'
import { User } from '../entities/User.js'

export const AuthRepository = AppDataSource.getRepository(User).extend({
    async registerUser(email: string, password: string, client: Client) {
        return new Promise((resolve, reject) => {
            // Generate a random salt
            crypto.randomBytes(16, (err, salt) => {
                if (err) {
                    reject(err)
                }

                // Hash the password with the salt
                crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                    if (err) {
                        reject(err)
                    }

                    // Convert the hashed password and salt to hex strings
                    const hashedPasswordString = hashedPassword.toString('hex')
                    const saltString = salt.toString('hex')

                    // Insert the user into the database
                    const request = 'INSERT INTO user (email, password, salt, client_id) VALUES (?, ?, ?, ?)'

                    AppDataSource.query(request, [email, hashedPasswordString, saltString, client.id])
                        .catch((err) => reject(err))
                        .then((result) => {
                            // Return the user id and email
                            resolve({ id: result.insertId, email: email })
                        }) 
                })
            })
        })
    },

    // Authenticate user with email and password
    async authenticateUser(email: string, password: string): Promise<{ user: Partial<User> | false, message: string }> {
        return new Promise((resolve, reject) => {
            // Find the user by email
            const request = 'SELECT * FROM user WHERE email = ?'

            AppDataSource.query(request, [email])
                .catch((err) => reject(err))
                .then((result) => {
                    // If the user is not found, return false
                    if (!result || result.length === 0) {
                        resolve({ user: false, message: 'User not found' })
                    } else {
                        const user = { id: result[0].id, username: result[0].email, role: result[0].role }

                        // Hash the provided password with the salt
                        crypto.scrypt(password, Buffer.from(result[0].salt, 'hex'), 32, (err, hashedPassword) => {
                            if (err) {
                                reject({ error: err, message: 'Error hashing password' })
                            }

                            // Compare the hashed password with the stored password
                            if (!crypto.timingSafeEqual(Buffer.from(result[0].password, 'hex'), hashedPassword)) {
                                // If the passwords do not match, return false
                                resolve({ user: false, message: 'Incorrect password' })
                            } else {
                                // If the passwords match, return the user
                                resolve({ user: user, message: 'User authenticated' })
                            }
                        })
                    }
                })
        })
    }
})