import { createContext, useContext, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('site'))

    const navigate = useNavigate()

    const logIn = async (data) => {
        try {
            console.log('Data: ' + JSON.stringify(data))

            const response = await fetch('http://localhost:3000/api/v1/auth/login/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const res = await response.json()
                console.log('Response: ' + JSON.stringify(res))

                setUser(res)
                setLoggedIn(true)

                navigate('/user')
                return

                // if (res.data) {
                //     console.log('Data: ' + res.data)
                //     setUser(res.data.user)

                //     setToken(res.token)
                //     localStorage.setItem('site', res.token)

                //     navigate('/user')

                //     return
                // } else {
                //     throw new Error(res.message)
                // }

            } else {
                const text = await response.text()
                throw new Error(`HTTP Error : ${response.status}, ${text}`)
            }

        } catch (err) {
            console.error('Error logging in :', err + ' ' + data)
        }
    }

    const logOut = async () => {
        const response = await fetch('http://localhost:3000/api/v1/auth/logout', {
            method: 'GET',
            credentials: 'include'
        })

        if (response.ok) {
            setUser(null)
            setToken('')
            setLoggedIn(false)
            localStorage.removeItem('site')
            navigate('/')
        } else {
            console.error('Error logging out')
        }
    }

    const register = async (data) => {
        try {
            console.log('Data: ' + JSON.stringify(data))

            const response = await fetch('http://localhost:3000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const password = data.password
                const username = data.email

                logIn({ username, password })
            } else {
                const text = await response.text()
                throw new Error(`HTTP Error : ${response.status}, ${text}`)
            }
        } catch (err) {
            console.error('Error registering :', err + ' ' + data)
        }
    }

    return (
        <AuthContext.Provider value={{ token, user, loggedIn, logIn, logOut, register }}>
            <Outlet />
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}