import DOMPurify from 'dompurify'

const API_URL = `${import.meta.env.VITE_APP_API_URL}/clients`

export const fetchClient = (id) => {
    const url = `${API_URL}/${id}`

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((res) => {
                if (!res.data) {
                    reject({ message: 'Client not found' })
                }

                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const fetchClients = () => {
    return new Promise((resolve, reject) => {
        fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((res) => {
                if (!res.data) {
                    reject({ message: 'Clients not found' })
                }

                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const addClient = (data) => {
    const formData = new FormData()
    const fields = [
        { key: 'first_name', value: data.firstName.toLowerCase().trim() },
        { key: 'last_name', value: data.lastName.toLowerCase().trim() },
        { key: 'phone_number', value: data.phone === '' ? undefined : data.phone },
        { key: 'birth_date', value: data.birthDate === '' ? undefined : data.birthDate },
        { key: 'address', value: data.address === '' ? undefined : data.address.toLowerCase().trim() },
        { key: 'postal_code', value: data.postalCode === '' ? undefined : data.postalCode },
        { key: 'city', value: data.city === '' ? undefined : data.city.toLowerCase().trim() },
        { key: 'shared_notes', value: data.sharedNotes === '' ? undefined : data.sharedNotes.trim() },
        { key: 'private_notes', value: data.privateNotes === '' ? undefined : data.privateNotes.trim() },
        { key: 'profile_picture', value: data.profilePicture?.length > 0 ? data.profilePicture[0] : undefined },
    ]

    fields.forEach((field) => {
        if (field.value !== undefined) {
            formData.append(field.key, DOMPurify.sanitize(field.value))
        }
    })

    return new Promise((resolve, reject) => {
        fetch(API_URL, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((res) => {
                if (!res.data) {
                    reject({ message: 'Client not added' })
                }

                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const updateClient = (id, data) => {
    const url = `${API_URL}/${id}`

    const formData = new FormData()
    const fields = [
        { key: 'first_name', value: data.firstName ? data.firstName.toLowerCase().trim() : undefined },
        { key: 'last_name', value: data.lastName ? data.lastName.toLowerCase().trim() : undefined },
        { key: 'phone_number', value: data.phone === '' ? undefined : data.phone },
        { key: 'birth_date', value: data.birthDate === '' ? undefined : data.birthDate },
        { key: 'address', value: data.address === '' ? undefined : data.address.toLowerCase().trim() },
        { key: 'postal_code', value: data.postalCode === '' ? undefined : data.postalCode },
        { key: 'city', value: data.city === '' ? undefined : data.city.toLowerCase().trim() },
        { key: 'shared_notes', value: data.sharedNotes === '' ? undefined : data.sharedNotes.trim() },
        {
            key: 'private_notes',
            value: data.privateNotes ? (data.privateNotes === '' ? undefined : data.privateNotes.trim()) : undefined,
        },
        { key: 'profile_picture', value: data.profilePicture?.length > 0 ? data.profilePicture[0] : undefined },
    ]

    fields.forEach((field) => {
        if (field.value !== undefined) {
            if (field.key === 'profile_picture') {
                formData.append(field.key, field.value)
            } else {
                formData.append(field.key, DOMPurify.sanitize(field.value))
            }
        }
    })

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'PATCH',
            credentials: 'include',
            body: formData,
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((res) => {
                if (!res.success) {
                    reject({ message: 'Client not updated' })
                }

                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const deleteClient = (id) => {
    const url = `${API_URL}/delete/${id}`

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                resolve()
            })
            .catch((err) => {
                reject(err)
            })
    })
}
