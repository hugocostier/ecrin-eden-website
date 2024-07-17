import * as crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

export const generateSecret = (length = 64) => {
    const secret = crypto.randomBytes(length).toString('base64').slice(0, length)
    console.log(secret)
}

generateSecret()
