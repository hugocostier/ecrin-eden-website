import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { RecoveryContext } from '../../context/passwordRecovery.context'

export const PrivateLogin = () => {
    const { accessFromLogin } = useContext(RecoveryContext)
    const { state } = useLocation()

    if (!accessFromLogin && state?.from !== 'settings') {
        console.log('redirecting to login')
        return <Navigate to='/login' replace />
    }

    return <Outlet />
}