const API_URL = 'http://localhost:3000/api/v1/preferences'

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
    formData.append('question_1', data.question1)
    formData.append('question_2', data.question2)
    formData.append('question_3', data.question3)
    formData.append('question_4', data.question4)
    formData.append('question_5', data.question5)

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
