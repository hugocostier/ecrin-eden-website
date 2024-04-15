const API_URL = 'http://localhost:3000/api/v1/clients'

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
    formData.append('first_name', data.firstName)
    formData.append('last_name', data.lastName)
    formData.append('phone_number', data.phone)
    formData.append('birth_date', data.birthDate)
    formData.append('address', data.address)
    formData.append('postal_code', data.postalCode)
    formData.append('city', data.city)
    formData.append('profile_picture', data.profilePicture)
    formData.append('shared_notes', data.sharedNotes)
    formData.append('private_notes', data.privateNotes)

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
    formData.append('first_name', data.firstName)
    formData.append('last_name', data.lastName)
    formData.append('phone_number', data.phone)
    formData.append('birth_date', data.birthDate)
    formData.append('address', data.address)
    formData.append('postal_code', data.postalCode)
    formData.append('city', data.city)
    formData.append('profile_picture', data.profilePicture)
    formData.append('shared_notes', data.sharedNotes)
    formData.append('private_notes', data.privateNotes)

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
    const url = `${API_URL}/${id}`

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'DELETE',
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
                if (!res.success) {
                    reject({ message: 'Client not deleted' })
                }

                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
