import { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.hook'

export const ClientContext = createContext()

export const ClientProvider = () => {
    const auth = useAuth()

    const [clientInfo, setClientInfo] = useState({
        firstName: '',
        lastName: '',
        profilePicture: '',
        role: '',
        id: ''
    })

    useEffect(() => {
        const getClientInfo = async () => {
            try {
                if (auth.user) {
                    const response = await fetch(`http://localhost:3000/api/v1/clients/user/${auth.user.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include'
                    })

                    const res = await response.json()

                    if (res.data) {
                        console.log('Client', res.data)

                        setClientInfo({
                            id: res.data.id,
                            firstName: res.data.first_name,
                            lastName: res.data.last_name,
                            profilePicture: res.data.profile_picture ? res.data.profile_picture : 'src/assets/images/default-profile-picture.png'
                        })
                    } else {
                        throw new Error(res.message)
                    }
                }
            } catch (err) {
                console.error('Error getting user info :', err)
            }
        }

        getClientInfo()
    }, [auth.user])

    return (
        <ClientContext.Provider value={clientInfo}>
            <Outlet />
        </ClientContext.Provider>
    )
}