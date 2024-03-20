import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { RecoveryContext } from '../../context/passwordRecovery.context'

export const PrivateLogin = () => {
    const { accessFromLogin } = useContext(RecoveryContext)

    if (!accessFromLogin) {
        return <Navigate to='/login' replace />
    }

    return <Outlet />
}