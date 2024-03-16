import { useEffect, useState } from 'react'
import { useAuth } from './useAuth.hook'

export const useUserInfo = () => {
    const auth = useAuth()

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        profilePicture: '',
        role: '',
        id: ''
    })

    useEffect(() => {
        const getUserInfo = async () => {
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
                        setUserInfo({
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

        getUserInfo()
    }, [auth.user])

    return userInfo
}