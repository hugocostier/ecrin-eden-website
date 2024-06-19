const API_URL = import.meta.env.VITE_APP_API_URL

export const verifyEmail = async (token, email) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/auth/verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, email }),
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
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipient_email: email,
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
                reject([])
            })
    })
}
