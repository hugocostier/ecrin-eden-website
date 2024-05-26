const TEN_MINUTES = 600000;
const OPENING_HOURS = {
    monday: { start: 'closed', end: 'closed' },
    tuesday: { start: 'closed', end: 'closed' },
    wednesday: { start: '17:00', end: '19:00' },
    thursday: { start: '17:00', end: '19:00' },
    friday: { start: '17:00', end: '19:00' },
    saturday: { start: '10:00', end: '19:00' },
    sunday: { start: 'closed', end: 'closed' },
}

const setOpeningHours = (date) => {
    const availableTimes = []

    const selectedDayName = new Date(date).toLocaleDateString('en-EN', { weekday: 'long' }).toLowerCase()

    const start = OPENING_HOURS[selectedDayName].start
    const end = OPENING_HOURS[selectedDayName].end

    if (start === 'closed' || end === 'closed') {
        return availableTimes
    }

    const startTime = new Date(`01/01/2000 ${start}`)
    const endTime = new Date(`01/01/2000 ${end}`)
    const endTimePlusOneHour = new Date(`01/01/2000 ${end}`)
    endTimePlusOneHour.setHours(endTimePlusOneHour.getHours() + 1)

    const currentTime = startTime

    while (currentTime <= endTime) {
        const time = currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

        if (currentTime >= startTime && currentTime <= endTimePlusOneHour) {
            availableTimes.push(time)
        }

        currentTime.setTime(currentTime.getTime() + TEN_MINUTES)
    }

    console.log('opening hours', availableTimes)
    return availableTimes
}

const removeAppointmentsTimes = (availableTimes, appointments) => {
    if (appointments.length === 0) {
        return availableTimes
    }

    const appointmentsTimes = appointments.map(appointment => {
        const time = appointment.time
        const duration = appointment.service.duration

        return { time, duration }
    })

    console.log('appointments times', appointmentsTimes)

    appointmentsTimes.forEach(appointment => {
        const appointmentTime = appointment.time
        const appointmentDuration = appointment.duration

        const appointmentEndTime = new Date(`01/01/2000 ${appointmentTime}`)
        appointmentEndTime.setTime(appointmentEndTime.getTime() + ((appointmentDuration * 60000) + TEN_MINUTES))

        const currentTime = new Date(`01/01/2000 ${appointmentTime}`)

        while (currentTime < appointmentEndTime) {
            const time = currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

            const index = availableTimes.indexOf(time)

            if (index !== -1) {
                availableTimes.splice(index, 1)
            }

            currentTime.setTime(currentTime.getTime() + TEN_MINUTES)
        }
    })

    console.log('remove appointments times', availableTimes)
    return availableTimes
}

const checkServiceDuration = (availableTimes, endTimePlusOneHour, service) => {
    const endTimeMinusOneHour = endTimePlusOneHour
    endTimeMinusOneHour.setHours(endTimeMinusOneHour.getHours() - 1)

    if (!service) {
        return availableTimes
    }

    const serviceDuration = service.duration

    const possibleTimes = availableTimes.filter(time => {
        const endTime = new Date(`01/01/2000 ${time}`)
        endTime.setTime(endTime.getTime() + (serviceDuration * 60000))

        const index = availableTimes.indexOf(endTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }))

        if (index === -1) {
            const startTime = new Date(`01/01/2000 ${time}`)

            if (startTime.getTime() === endTimeMinusOneHour.getTime() && endTime.getTime() >= endTimePlusOneHour.getTime()) {
                return true
            }

            return false
        }

        return true
    })

    console.log('check service duration', possibleTimes)

    return possibleTimes
}

export const setAvailableTimes = (date, appointments, service) => {
    const availableTimes = removeAppointmentsTimes(setOpeningHours(date), appointments)

    const selectedDayName = new Date(date).toLocaleDateString('en-EN', { weekday: 'long' }).toLowerCase()
    const end = OPENING_HOURS[selectedDayName].end
    const endTimePlusOneHour = new Date(`01/01/2000 ${end}`)
    endTimePlusOneHour.setHours(endTimePlusOneHour.getHours() + 1)

    const possibleTimes = checkServiceDuration(availableTimes, endTimePlusOneHour, service)

    return possibleTimes
}