const API_URL = `${import.meta.env.VITE_APP_API_URL}/preferences`

export const fetchClientPreferences = (id) => {
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
                    reject({ message: 'Preferences not found' })
                }

                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const updateClientPreferences = (id, data) => {
    const url = `${API_URL}/${id}`

    const formData = new FormData()
    const fields = [
        { key: 'question_1', value: data.question1 !== '' ? data.question1 : undefined },
        { key: 'question_2', value: data.question2 !== '' ? data.question2 : undefined },
        { key: 'question_3', value: data.question3 !== '' ? data.question3 : undefined },
        { key: 'question_4', value: data.question4 !== '' ? data.question4 : undefined },
        { key: 'question_5', value: data.question5 !== '' ? data.question5 : undefined },
    ]

    fields.forEach((field) => {
        if (field.value !== undefined) {
            formData.append(field.key, field.value)
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
                    reject({ message: 'Preferences not updated' })
                }

                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
