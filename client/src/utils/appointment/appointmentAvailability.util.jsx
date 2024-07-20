import { fetchAllAppointments } from '../../data/appointments/appointments.fetch'

export const checkAvailability = async (service, date, currentAppointmentID = null) => {
    const serviceDuration = parseInt(service.duration)
    const appointments = await fetchAllAppointments({ day: date })
        .then(appointments => appointments.data)
        .catch(error => {
            console.error('Error fetching appointments:', error)
            return []
        })

    return getAvailableTimes(appointments, serviceDuration, date, currentAppointmentID)
}

const OPENING_HOURS = {
    monday: { start: 'closed', end: 'closed' },
    tuesday: { start: 'closed', end: 'closed' },
    wednesday: { start: 17, end: 19 },
    thursday: { start: 17, end: 19 },
    friday: { start: 17, end: 19 },
    saturday: { start: 10, end: 19 },
    sunday: { start: 'closed', end: 'closed' },
}

const TIME_INCREMENT = 30

const getAvailableTimes = (appointments, serviceDuration, date, currentAppointmentID) => {
    let availableTimes = []

    const selectedDayName = new Date(date).toLocaleDateString('en-EN', { weekday: 'long' }).toLowerCase()

    const openingTime = OPENING_HOURS[selectedDayName].start
    const closingTime = OPENING_HOURS[selectedDayName].end

    if (openingTime === 'closed' || closingTime === 'closed') {
        return availableTimes
    }

    for (let hour = openingTime; hour <= closingTime; hour++) {
        for (let minute = 0; minute < 60; minute += TIME_INCREMENT) {
            const currentTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`

            availableTimes.push(currentTime)
        }
    }

    const filteredAppointments = appointments.filter(appointment => appointment.status !== 'cancelled' && appointment.id !== currentAppointmentID)

    return filterConflictingTimes(date, availableTimes, filteredAppointments, serviceDuration)
}

const isConflicting = (start1, end1, start2, end2) => {
    return (start1 < end2 && start2 < end1)
}

const filterConflictingTimes = (date, availableTimes, appointments, serviceDuration) => {
    return availableTimes.filter(time => {
        const [availableHour, availableMinute] = time.split(':').map(time => parseInt(time))

        const availableStart = new Date(date)
        availableStart.setHours(availableHour, availableMinute, 0, 0)

        const availableEnd = new Date(availableStart.getTime() + serviceDuration * 60000)

        return !appointments.some(appointment => {
            const [appointmentHour, appointmentMinute] = appointment.time.split(':').map(time => parseInt(time))

            const appointmentStart = new Date(appointment.date)
            appointmentStart.setHours(appointmentHour, appointmentMinute, 0, 0)

            const appointmentEnd = new Date(appointmentStart.getTime() + appointment.service.duration * 60000)

            return isConflicting(availableStart, availableEnd, appointmentStart, appointmentEnd)
        })
    })
}