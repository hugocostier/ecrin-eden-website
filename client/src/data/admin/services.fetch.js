const API_URL = `${import.meta.env.VITE_APP_API_URL}/services`

export const fetchServices = () => {
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
                    reject({ message: 'Services not found' })
                }

                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
