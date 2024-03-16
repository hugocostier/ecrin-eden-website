export const fetchAppointments = (rangeStart, rangeEnd, clientId) => {
    const API_URL = 'http://localhost:3000/api/v1'

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/appointments/client/${clientId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                rangeStart,
                rangeEnd,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((appointments) => {
                setTimeout(() => {
                    resolve(appointments)
                }, 500)
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error)
                reject([])
            })
    })
}

export const fetchDayAppointments = (day, clientId) => {
    const API_URL = 'http://localhost:3000/api/v1'

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/appointments/client/${clientId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                day,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((appointments) => {
                setTimeout(() => {
                    resolve(appointments)
                }, 500)
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error)
                reject([])
            })
    })
}
