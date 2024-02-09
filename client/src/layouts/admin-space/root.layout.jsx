import { Outlet } from 'react-router-dom'
import {
    Footer,
    Navbar
} from '../../components'

export const AdminRoot = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}