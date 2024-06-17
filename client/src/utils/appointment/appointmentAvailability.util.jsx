import { fetchAllAppointments } from '../../data/appointments/appointments.fetch'

export const checkAvailability = async (service, date) => {
    const serviceDuration = parseInt(service.duration)
    const appointments = await fetchAllAppointments({ day: date })
        .then(appointments => appointments.data)
        .catch(error => {
            console.error('Error fetching appointments:', error)
            return []
        })

    return getAvailableTimes(appointments, serviceDuration, date)
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

const getAvailableTimes = (appointments, serviceDuration, date) => {
    const availableTimes = []

    const selectedDayName = new Date(date).toLocaleDateString('en-EN', { weekday: 'long' }).toLowerCase()

    const openingTime = OPENING_HOURS[selectedDayName].start
    const closingTime = OPENING_HOURS[selectedDayName].end

    if (openingTime === 'closed' || closingTime === 'closed') {
        return availableTimes
    }

    for (let hour = openingTime; hour <= closingTime; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const currentTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`

            if (isTimeAvailable(date, currentTime, appointments, serviceDuration)) {
                availableTimes.push(currentTime)
            }
        }
    }

    return availableTimes
}

const isTimeAvailable = (date, startTime, appointments, serviceDuration) => {
    // Parse and set start time 
    const [startHour, startMinutes] = startTime.split(':').map(time => parseInt(time))
    const newAppointmentStart = new Date(date)
    newAppointmentStart.setHours(startHour, startMinutes, 0, 0)

    // Calculate end time
    const newAppointmentEnd = new Date(newAppointmentStart.getTime() + serviceDuration * 60000)

    for (const appointment of appointments) {
        // Parse and set appointment start time
        const [appointmentHour, appointmentMinutes] = appointment.time.split(':').map(time => parseInt(time))
        const appointmentStart = new Date(appointment.date)
        appointmentStart.setHours(appointmentHour, appointmentMinutes, 0, 0)

        // Calculate appointment end time
        const appointmentEnd = new Date(appointmentStart.getTime() + appointment.service.duration * 60000)

        console.log('Appointment:', appointment)
        // Check if new appointment overlaps with existing appointment
        if (appointment.status !== 'cancelled' &&
            (
                (newAppointmentStart >= appointmentStart && newAppointmentStart < appointmentEnd) ||
                (newAppointmentEnd > appointmentStart && newAppointmentEnd <= appointmentEnd)
            )
        ) {
            return false
        }
    }

    return true
}