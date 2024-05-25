const API_URL = `${import.meta.env.VITE_APP_API_URL}/mail`

export const sendForm = (data) => {
    console.log('data:', data)

    const formData = new FormData()
    formData.append('lastName', data.lastName)
    formData.append('firstName', data.firstName)
    formData.append('phone', data.phone)
    formData.append('email', data.email)
    formData.append('message', data.message)

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/send-contact-form`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
