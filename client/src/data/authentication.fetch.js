import DOMPurify from 'dompurify'

const API_URL = import.meta.env.VITE_APP_API_URL

export const verifyEmail = async (token, email) => {
    const cleanToken = DOMPurify.sanitize(token.trim())
    const cleanEmail = DOMPurify.sanitize(email.trim())

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/auth/verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: cleanToken, email: cleanEmail }),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                resolve(data.success)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                reject([])
            })
    })
}

export const forgetPassword = async (email, otp) => {
    const cleanEmail = DOMPurify.sanitize(email.trim())
    const cleanOtp = parseInt(DOMPurify.sanitize(otp))

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipient_email: cleanEmail,
                otp: cleanOtp,
            }),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                reject([])
            })
    })
}

export const resetPassword = async (email, otp, newPassword) => {
    const cleanEmail = DOMPurify.sanitize(email.trim())
    const cleanOtp = parseInt(DOMPurify.sanitize(otp))
    const cleanPassword = DOMPurify.sanitize(newPassword.trim())

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: cleanEmail,
                otp: cleanOtp,
                new_password: cleanPassword,
            }),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                reject([])
            })
    })
}

export const verifyOTP = async (email, otp) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/auth/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                otp,
            }),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                reject(error)
            })
    })
}

export const updateEmail = async (email, newEmail) => {
    console.log('email', email)
    console.log('newEmail', newEmail)
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/auth/update-email`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                new_email: newEmail,
            }),
            credentials: 'include',
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                reject(error)
            })
    })
}

export const updatePassword = async (email, currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/auth/update-password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                current_password: currentPassword,
                new_password: newPassword,
            }),
            credentials: 'include',
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                reject(error)
            })
    })
}
