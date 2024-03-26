export const fetchAccount = (userId, clientId) => {
    const API_URL = 'http://localhost:3000/api/v1'

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
