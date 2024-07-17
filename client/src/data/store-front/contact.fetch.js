import DOMPurify from 'dompurify'

const API_URL = `${import.meta.env.VITE_APP_API_URL}/mail`

export const sendForm = (data) => {
    const formData = new FormData()
    const fields = [
        { key: 'lastName', value: data.lastName !== '' ? data.lastName.toLowerCase().trim() : undefined },
        { key: 'firstName', value: data.firstName !== '' ? data.firstName.toLowerCase().trim() : undefined },
        { key: 'phone', value: data.phone !== '' ? data.phone : undefined },
        { key: 'email', value: data.email !== '' ? data.email.trim() : undefined },
        { key: 'message', value: data.message !== '' ? data.message.trim() : undefined },
    ]

    fields.forEach((field) => {
        if (field.value !== undefined) {
            formData.append(field.key, DOMPurify.sanitize(field.value))
        }
    })

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
