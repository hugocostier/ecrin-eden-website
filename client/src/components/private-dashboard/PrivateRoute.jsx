import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.hook'

export const PrivateRoute = ({ isAllowed, redirectPath, children }) => {
    const user = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [user])

    if (loading) return null

    const allowedUser = isAllowed.includes(user?.user?.role)

    if (!allowedUser) return <Navigate to={redirectPath} replace />

    return children ? children : <Outlet />
}

PrivateRoute.propTypes = {
    isAllowed: PropTypes.array.isRequired,
    redirectPath: PropTypes.string.isRequired,
    children: PropTypes.node
}