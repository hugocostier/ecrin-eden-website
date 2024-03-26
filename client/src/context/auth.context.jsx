import { createContext, useCallback, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

export const AuthProvider = () => {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()

    const logInPromise = (data, remember) => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/v1/auth/login/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
                .then(async response => {
                    if (response.status === 401) {
                        const data = await response.json()
                        data.status = response.status

                        return data
                    }

                    if (!response.ok) {
                        throw new Error('HTTP Error ! Status: ' + response.status)
                    }

                    return response.json()
                })
                .then(res => {
                    if (res.message && res.status === 401) {
                        reject({ message: res.message })
                    }

                    if (!res.user) {
                        // reject({ message: 'Email or password incorrect' })
                        throw new Error('Email or password incorrect')
                    }

                    setUser(res.user)
                    setLoggedIn(true)

                    // Set expiration date to 7 days or 14 days if remember me is checked
                    const expiration = remember ? new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 14) : new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)

                    localStorage.setItem('user', JSON.stringify(res.user))
                    localStorage.setItem('expiration', expiration)

                    if (res.user.role === 'admin') navigate('/admin')
                    else navigate('/user')

                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    const logIn = (data, remember) => {
        toast.promise(logInPromise(data, remember), {
            pending: 'Connexion...',
            success: 'Connexion réussie !',
            error: {
                render({ data }) {
                    let errorMessage

                    if (data.message === 'User not found') {
                        errorMessage = 'Email incorrect !'
                    } else if (data.message === 'Incorrect password') {
                        errorMessage = 'Mot de passe incorrect !'
                    } else {
                        errorMessage = 'Erreur lors de la connexion, veuillez réessayer ultérieurement !'
                    }

                    return errorMessage
                }
            }
        }, { containerId: 'action-status' })
    }

    const logOutPromise = useCallback(() => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/v1/auth/logout', {
                method: 'GET',
                credentials: 'include'
            })
                .then(async response => {
                    if (!response.ok) {
                        throw new Error('HTTP Error ! Status: ' + response.status)
                    }

                    return response.json()
                })
                .then(res => {
                    setUser(null)
                    setLoggedIn(false)
                    localStorage.removeItem('user')
                    localStorage.removeItem('expiration')

                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }, [])

    const logOut = useCallback(() => {
        toast.promise(logOutPromise(), {
            pending: 'Déconnexion...',
            success: 'Déconnexion réussie !',
            error: {
                render({ data }) {
                    let errorMessage

                    if (data.message === 'User not found') {
                        errorMessage = 'Utilisateur introuvable !'
                    } else {
                        errorMessage = 'Erreur lors de la déconnexion, veuillez réessayer ultérieurement !'
                    }

                    return errorMessage
                }
            }
        }, { containerId: 'action-status' })
    }, [logOutPromise])

    const registerPromise = (data) => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
                .then(async response => {
                    if (response.status === 400 || response.status === 500) {
                        const data = await response.json()
                        data.status = response.status

                        return data
                    }

                    if (!response.ok) {
                        throw new Error('HTTP Error !', response.status + ' ' + response.statusText)
                    }

                    return response.json()
                })
                .then(res => {
                    console.log('Response:', res)
                    if (res.message && (res.status === 400 || res.status === 500)) {
                        reject({ message: res.message })
                    }

                    if (!res.data) {
                        throw new Error('Error registering')
                    }

                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })

        })
    }

    const register = (data) => {
        toast.promise(registerPromise(data), {
            pending: 'Inscription...',
            success: 'Inscription réussie ! Vous pouvez maintenant vous connecter.',
            error: {
                render({ data }) {
                    let errorMessage

                    if (data.message === 'Email already exists') {
                        errorMessage = 'Email déjà utilisé !'
                    } else if (data.message === 'Client already exists') {
                        errorMessage = 'Un compte existe déjà avec ce nom et prénom. Veuillez vous connecter !'
                    } else {
                        errorMessage = 'Erreur lors de l\'inscription, veuillez réessayer ultérieurement !'
                    }

                    return errorMessage
                }
            }
        }, { containerId: 'action-status' })
    }

    useEffect(() => {
        const userStorage = localStorage.getItem('user')
        const expiration = new Date(localStorage.getItem('expiration'))
        const currentTime = new Date()

        if (userStorage && expiration) {
            if (currentTime > expiration) {
                logOut()
            } else {
                setUser(JSON.parse(userStorage))
                setLoggedIn(true)
            }
        }
    }, [logOut])

    return (
        <AuthContext.Provider value={{ user, loggedIn, logIn, logOut, register }}>
            <Outlet />
        </AuthContext.Provider>
    )
}