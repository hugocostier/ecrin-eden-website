import { Outlet } from 'react-router-dom'
import {
    Footer,
    Navbar
} from '../../components'

export const StoreRoot = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}