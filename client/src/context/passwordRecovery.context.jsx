import { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'

export const RecoveryContext = createContext()

export const PasswordRecoveryProvider = () => {
    const [email, setEmail] = useState()
    const [otp, setOtp] = useState()
    const [accessFromLogin, setAccessFromLogin] = useState(false)

    return (
        <RecoveryContext.Provider value={{ email, setEmail, otp, setOtp, accessFromLogin, setAccessFromLogin }}>
            <Outlet />
        </RecoveryContext.Provider>
    )
}

