import { Outlet } from 'react-router-dom'
import {
    Navbar
} from '../../components'

export const ClientRoot = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}