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
    const { service, date, time, status, isAway, privateNotes } = data

    const body = {
        ...(service && { service: { id: parseInt(service) } }),
        ...(date && { date }),
        ...(time && { time }),
        ...(status ? { status } : { status: 'pending' }),
        ...(isAway && { is_away: isAway === 'true' }),
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

export const addAppointment = (data) => {
    const {
        client,
        service,
        date,
        time,
        status,
        isAway,
        lastName,
        firstName,
        phone,
        address,
        postalCode,
        city,
        email,
    } = data

    const body = {
        ...(client
            ? { client: { id: client } }
            : {
                  client: {
                      last_name: lastName.toLowerCase(),
                      first_name: firstName.toLowerCase(),
                      phone_number: phone,
                      address,
                      postal_code: postalCode,
                      city,
                  },
              }),
        ...(service && { service: { id: parseInt(service) } }),
        ...(date && { date }),
        ...(time && { time }),
        ...(status ? { status } : { status: 'pending' }),
        ...(isAway && { is_away: isAway === 'true' }),
        ...(email && { email }),
    }

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/add`, {
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
            .then((appointment) => {
                resolve(appointment)
            })
            .catch((error) => {
                console.error('Error adding appointment:', error)
                reject({})
            })
    })
}
