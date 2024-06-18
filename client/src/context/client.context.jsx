import { createContext, useCallback, useEffect, useState } from 'react'
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

    const getClientInfo = useCallback(() => {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:3000/api/v1/clients/user/${auth.user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
                .then(async response => {
                    if (!response.ok) {
                        throw new Error('HTTP Error ! Status: ' + response.status)
                    }

                    return response.json()
                })
                .then(res => {
                    if (!res.data) {
                        reject({ message: 'Client not found' })
                    }

                    setClientInfo({
                        id: res.data.id,
                        firstName: res.data.first_name,
                        lastName: res.data.last_name,
                        profilePicture: res.data.profile_picture
                    })

                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }, [auth])

    useEffect(() => {
        if (auth.user) {
            getClientInfo()
        } else {
            setClientInfo({
                firstName: '',
                lastName: '',
                profilePicture: '',
                role: '',
                id: ''
            })
        }
    }, [getClientInfo, auth.user])

    return (
        <ClientContext.Provider value={clientInfo}>
            <Outlet />
        </ClientContext.Provider>
    )
}