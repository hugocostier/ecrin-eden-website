const API_URL = `${import.meta.env.VITE_APP_API_URL}/appointments`

export const fetchAllAppointments = (options) => {
    const { show, rangeStart, rangeEnd, day } = options

    const body = {
        ...(show === 'showAll' && { showAll: true }),
        ...(show === 'showUpcoming' && { showUpcoming: true }),
        ...(show === 'showHistory' && { showHistory: true }),
        ...(rangeStart && { rangeStart }),
        ...(rangeEnd && { rangeEnd }),
        ...(day && { day }),
    }

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((appointments) => {
                resolve(appointments)
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error)
                reject([])
            })
    })
}

export const fetchAppointments = (options) => {
    const { clientId, show, rangeStart, rangeEnd, day } = options

    const body = {
        ...(show === 'showAll' && { showAll: true }),
        ...(show === 'showUpcoming' && { showUpcoming: true }),
        ...(show === 'showHistory' && { showHistory: true }),
        ...(rangeStart && { rangeStart }),
        ...(rangeEnd && { rangeEnd }),
        ...(day && { day }),
    }

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/client/${clientId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((appointments) => {
                resolve(appointments)
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error)
                reject([])
            })
    })
}

export const fetchAppointment = (appointmentID) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/${appointmentID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((appointment) => {
                resolve(appointment)
            })
            .catch((error) => {
                console.error('Error fetching appointment:', error)
                reject({})
            })
    })
}

export const countUserAppointments = (options) => {
    const { clientId, firstDayOfWeek, lastDayOfWeek, today } = options

    const body = {
        ...(firstDayOfWeek && { startDate: firstDayOfWeek }),
        ...(lastDayOfWeek && { endDate: lastDayOfWeek }),
        ...(today && { date: today }),
    }

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/count/${clientId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((count) => {
                resolve(count)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                reject([])
            })
    })
}

export const countAllAppointments = (date) => {
    const body = {
        ...(date && { date }),
    }

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/count`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((count) => {
                resolve(count)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                reject([])
            })
    })
}

export const updateAppointment = (appointmentID, data) => {
    const { date, time, status, isAway, privateNotes } = data

    const body = {
        ...(date && { date }),
        ...(time && { time }),
        ...(status && { status }),
        ...(isAway === 'true' ? { is_away: true } : { is_away: false }),
        ...(privateNotes && { private_notes: privateNotes }),
    }

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/${appointmentID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((appointment) => {
                resolve(appointment)
            })
            .catch((error) => {
                console.error('Error updating appointment:', error)
                reject({})
            })
    })
}
