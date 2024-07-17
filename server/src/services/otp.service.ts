import User from '../entities/User.entity.js'
import { CustomAPIError } from '../errors/custom-errors.js'
import BaseService from './base.service.js'
import { UserService } from './user.service.js'

/**
 * Service class for OTP-related operations
 * 
 * @class OTPService
 * @extends BaseService
 * @property {UserService} _userService - The user service
 */
export class OTPService extends BaseService {
    private _userService: UserService = new UserService()   

    /**
     * Sends an OTP to a user's email and updates the user's OTP and OTP expiration date in the database
     *
     * @async
     * @method sendOTP
     * @memberof OTPService
     * @param {string} email - The email address to send the OTP to
     * @param {number} otp - The OTP to send
     * @throws {CustomAPIError} If there is an error sending the OTP or updating the user
     * @returns {Promise<void>} A promise that resolves when the OTP is sent
     */
    public async sendOTP(email: string, otp: number): Promise<void> {
        const user: User | null = await this._userService.getUserByEmail(email)
            .catch((error: any) => {
                console.error('Error getting user by email: ', error)
                throw new CustomAPIError('Error getting user by email', 500)
            })

        if (!user) {
            throw new CustomAPIError('User not found', 404)
        }

        if (!this.checkOTP(otp.toString())) {
            throw new CustomAPIError('Invalid OTP', 401)
        }

        const otpExpires: Date = new Date(Date.now() + 10 * 60 * 1000) // Set the OTP expiration time to 10 minutes from now

        const userData: Partial<User> = {
            otp: otp,
            otpExpires: otpExpires
        }

        await this._userService.updateUser(user.id, userData)
            .catch((error: any) => {
                console.error('Error updating user: ', error)
                throw new CustomAPIError('Error updating user', 500)
            })
    }
    
    /**
     * Checks if an OTP is valid
     *
     * @method checkOTP
     * @memberof OTPService
     * @param {string} otp - The OTP to check
     * @returns {boolean} True if the OTP is valid, false if the OTP is invalid
     */
    public checkOTP(otp: string): boolean {
        const otpRegex: RegExp = /^[0-9]{4}$/ // Regex for a 4-digit OTP

        return otpRegex.test(otp)
    }

    /**
     * Verifies an OTP
     *
     * @method verifyOTP
     * @memberof OTPService
     * @param {User} user - The user to verify the OTP for
     * @param {number} otp - The OTP to verify
     * @returns {Object} An object containing whether the OTP is valid and a message
     */
    public verifyOTP(user: User, otp: number): { isValid: boolean, message: string } {
        // Check if the user has an OTP and an OTP expiration date
        if (!user.otp || !user.otpExpires) {
            return { isValid: false, message: 'No OTP found' }
        }

        const now: number = Date.now() // Get the current time in milliseconds
        const otpTime: number = new Date(user.otpExpires).getTime() // Get the time the OTP expires in milliseconds

        // Check if the OTP has expired (10 minutes)
        if (otpTime - now <= 0) {
            return { isValid: false, message: 'OTP expired' }
        }

        // Convert the user's OTP to a number 
        const userOTP: number = typeof user.otp === 'string' ? parseInt(user.otp) : user.otp

        // Check if the OTP matches the user's OTP
        if (userOTP !== otp) {
            return { isValid: false, message: 'Invalid OTP' }
        }

        return { isValid: true, message: 'Valid OTP' }
    }
}