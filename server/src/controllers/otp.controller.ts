import { Request, Response } from 'express'
import User from '../entities/User.entity.js'
import { OTPService } from '../services/otp.service.js'
import { UserService } from '../services/user.service.js'
import BaseController from './base.controller.js'
import EmailController from './email.controller.js'

/**
 * Controller that manages OTP-related operations.
 * 
 * @class OTPController
 * @property {OTPService} _otpService - The `OTPService` instance to manage OTP operations.
 * @property {EmailController} _emailController - The `EmailController` instance to manage email communication.
 */
export default class OTPController extends BaseController {
    private _otpService: OTPService = new OTPService() 
    private _userService: UserService = new UserService()
    private _emailController: EmailController = new EmailController()

    /**
     * Sends an OTP to a user's email
     * 
     * @async
     * @method sendOTP
     * @memberof OTPController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @returns {Promise<void>} A response object with a status code and a message
     */
    public sendOTP = async (req: Request, res: Response): Promise<void> => {
        const { recipient_email: email, otp } = req.body

        await this._otpService.sendOTP(email, otp) 
            .catch((error: any) => {
                res.status(error.statusCode).json({
                    success: false,
                    msg: error.message,
                })
                throw error 
            }) 

        await this._emailController.sendResetPasswordOTP(email, otp)
            .then(() => {
                res.status(200).json({
                    success: true,
                    msg: 'OTP sent successfully',
                })
            })
            .catch((error: any) => {
                res.status(500).json({
                    success: false,
                    msg: 'Error sending OTP',
                    error: error,
                })
                throw error 
            })
    }

    /**
     * Verifies an OTP
     * 
     * @async
     * @method verifyOTP
     * @memberof OTPController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @returns {Promise<void>} A response object with a status code and a message
     */
    public verifyOTP = async (req: Request, res: Response): Promise<void> => {
        const { email, otp } = req.body

        const user: User | null = await this._userService.getUserByEmail(email)
        if (!user) {
            res.status(404).json({
                success: false,
                msg: 'User not found',
            })
            return
        }

        const isOTP = this._otpService.checkOTP(otp)
        if (!isOTP) {
            res.status(400).json({
                success: false,
                msg: 'Invalid OTP',
            })
            return
        }

        const result = this._otpService.verifyOTP(user, parseInt(otp))
        if (!result.isValid) {
            res.status(401).json({
                success: false,
                msg: result.message,
            })
            return
        }

        res.status(200).json({
            success: true,
            msg: result.message,
        })
    }
}