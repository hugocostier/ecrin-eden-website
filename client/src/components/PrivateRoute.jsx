import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const PrivateRoute = () => {
    const user = useAuth()
    
    console.log('User: ' + JSON.stringify(user))
    console.log('User.loggedIn: ' + user.loggedIn)

    if (!user.loggedIn) {
        return <Navigate to='/login' />
    }

    return <Outlet />
}