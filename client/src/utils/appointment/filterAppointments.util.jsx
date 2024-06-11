export const filterAppointments = (filter, show, appointments) => {
    switch (filter) {
        case 'date':
            if (show === 'showUpcoming') {
                return appointments.sort((a, b) => new Date(a.date) - new Date(b.date))
            } else {
                return appointments.sort((a, b) => new Date(b.date) - new Date(a.date))
            }
        case 'time':
            return appointments.sort((a, b) => a.time.localeCompare(b.time))
        case 'status':
            return appointments.sort((a, b) => a.status.localeCompare(b.status))
        case 'service':
            return appointments.sort((a, b) => a.service.name.localeCompare(b.service.name))
        case 'duration':
            return appointments.sort((a, b) => a.service.duration - b.service.duration)
        default:
            return appointments.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
}