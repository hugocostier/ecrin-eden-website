import DOMPurify from 'dompurify'

const API_URL = `${import.meta.env.VITE_APP_API_URL}/appointments`

export const fetchAllAppointments = (options) => {
    const { show, rangeStart, rangeEnd, day } = options

    const body = {
        ...(show === 'showAll' && { showAll: true }),
        ...(show === 'showUpcoming' && { showUpcoming: true }),
        ...(show === 'showHistory' && { showHistory: true }),
        ...(rangeStart && { rangeStart: DOMPurify.sanitize(rangeStart.trim()) }),
        ...(rangeEnd && { rangeEnd: DOMPurify.sanitize(rangeEnd.trim()) }),
        ...(day && { day: DOMPurify.sanitize(day.trim()) }),
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
        ...(rangeStart && { rangeStart: DOMPurify.sanitize(rangeStart.trim()) }),
        ...(rangeEnd && { rangeEnd: DOMPurify.sanitize(rangeEnd.trim()) }),
        ...(day && { day: DOMPurify.sanitize(day.trim()) }),
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
        ...(firstDayOfWeek && { startDate: DOMPurify.sanitize(firstDayOfWeek.trim()) }),
        ...(lastDayOfWeek && { endDate: DOMPurify.sanitize(lastDayOfWeek.trim()) }),
        ...(today && { date: DOMPurify.sanitize(today.trim()) }),
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
        ...(date && { date: DOMPurify.sanitize(date.trim()) }),
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
        ...(service && { service: { id: parseInt(DOMPurify.sanitize(service.trim())) } }),
        ...(date && { date: DOMPurify.sanitize(date.trim()) }),
        ...(time && { time: DOMPurify.sanitize(time.trim()) }),
        ...(status ? { status: DOMPurify.sanitize(status.toLowerCase().trim()) } : { status: 'pending' }),
        ...(isAway && { is_away: isAway === 'true' }),
        ...(privateNotes && { private_notes: DOMPurify.sanitize(privateNotes.trim()) }),
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
            ? { client: { id: DOMPurify.sanitize(client.trim()) } }
            : {
                  client: {
                      last_name: DOMPurify.sanitize(lastName.toLowerCase().trim()),
                      first_name: DOMPurify.sanitize(firstName.toLowerCase().trim()),
                      phone_number: phone ? DOMPurify.sanitize(phone.trim()) : undefined,
                      address: address ? DOMPurify.sanitize(address.toLowerCase().trim()) : undefined,
                      postal_code: postalCode ? DOMPurify.sanitize(postalCode.trim()) : undefined,
                      city: city ? DOMPurify.sanitize(city.toLowerCase().trim()) : undefined,
                  },
              }),
        ...(service && { service: { id: parseInt(DOMPurify.sanitize(service.trim())) } }),
        ...(date && { date: DOMPurify.sanitize(date.trim()) }),
        ...(time && { time: DOMPurify.sanitize(time.trim()) }),
        ...(status ? { status: DOMPurify.sanitize(status.toLowerCase().trim()) } : { status: 'pending' }),
        ...(isAway && { is_away: isAway === 'true' }),
        ...(email && { email: DOMPurify.sanitize(email.trim()) }),
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
