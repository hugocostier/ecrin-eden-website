import { Outlet } from 'react-router-dom'
import {
    Footer,
    Navbar
} from '../../components'

export const ClientRoot = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}