import { Link } from "react-router-dom"

const getBackgroundColor = (status) => {
    switch (status) {
        case 'pending':
            return { background: 'var(--pending)' }
        case 'confirmed':
            return { background: 'var(--confirmed)' }
        case 'cancelled':
            return { background: 'var(--cancelled)' }
        case 'completed':
            return { background: 'var(--completed)' }
        default:
            return { background: 'var(--grey-500)' }
    }
}

const getAppointmentLink = (appointment, userRole) => {
    const linkPath = userRole
        ? `/admin/appointments/${appointment.id}`
        : `/user/appointments/${appointment.id}`

    return (
        <Link to={linkPath} className="appointment-link">
            {appointment.time.slice(0, 5)}
        </Link>
    )
}

export const renderMonth = (date, appointments, userRole, setSearchParams) => {
    const daysInPreviousMonth = new Date(date.year, date.month, 0).getDate()
    const daysInMonth = new Date(date.year, date.month + 1, 0).getDate()
    const firstDay = new Date(date.year, date.month, 0).getDay()
    const today = new Date()
    let currentDay = 1
    const calendar = []

    for (let i = 0; i < 6; i++) {
        const week = [];

        for (let j = 0; j < 7; j++) {
            let dayOfMonth = ''

            // If it's the first week and the first day of the month hasn't been reached
            if ((i === 0 && j < firstDay)) {
                // Calculate the day of the previous month
                dayOfMonth = daysInPreviousMonth - (firstDay - 1) + j
                // Push the day of the previous month
                week.push(
                    <td key={j} className='inactive'>
                        <div className='day-number'>{dayOfMonth}</div>
                    </td>
                )
            }
            // If it's the last week and the last day of the month has been reached
            else if (currentDay <= daysInMonth) {
                // Filter appointments for the current day
                const appointmentsForDay = appointments.filter(appointment => {
                    return new Date(appointment.date).getDate() === currentDay
                })

                const dayOfWeek = new Date(date.year, date.month, currentDay).getDate()

                if (appointmentsForDay.length > 2) {
                    week.push(
                        <td
                            key={j}
                            onClick={() => {
                                setSearchParams(prev => {
                                    prev.set('day', dayOfWeek)
                                    return prev
                                })
                            }}
                        >
                            <div className={`day-number ${currentDay === today.getDate() && date.month === today.getMonth() && date.year === today.getFullYear() ? 'today' : ''}`}>{currentDay}</div>
                            {appointmentsForDay.slice(0, 1).map((appointment, index) => (
                                <div
                                    className='appointment-info'
                                    key={index}
                                    style={getBackgroundColor(appointment.status)}
                                >
                                    {getAppointmentLink(appointment, userRole)}
                                </div>
                            ))}
                            <div className='more-appointments'>{appointmentsForDay.length - 1} de plus...</div>
                        </td>
                    )
                } else {
                    // Push the current day and increment it
                    week.push(
                        <td
                            key={j}
                            onClick={() => {
                                setSearchParams(prev => {
                                    prev.set('day', dayOfWeek)
                                    return prev
                                })
                            }}
                        >
                            <div className={`day-number ${currentDay === today.getDate() && date.month === today.getMonth() && date.year === today.getFullYear() ? 'today' : ''}`}>{currentDay}</div>
                            {appointmentsForDay.map((appointment, index) => (
                                <div
                                    className='appointment-info'
                                    key={index}
                                    style={getBackgroundColor(appointment.status)}
                                >
                                    {getAppointmentLink(appointment, userRole)}
                                </div>
                            ))}
                        </td>
                    )
                }

                currentDay++
            }
            // If it's the last week and the last day of the month hasn't been reached
            else {
                // Calculate the day of the next month
                dayOfMonth = currentDay - daysInMonth
                // Push the day of the next month
                week.push(
                    <td key={j} className='inactive'>
                        <div className='day-number'>{dayOfMonth}</div>
                    </td>
                )
                // And increment it 
                currentDay++
            }
        }

        calendar.push(<tr key={i} className='month-view'>{week}</tr>)
    }

    return calendar
}

export const renderWeek = (date, appointments, userRole, setSearchParams) => {
    const firstDayOfWeek = new Date(date.week.firstDay)
    const today = new Date()

    const currentDay = new Date(firstDayOfWeek)

    const calendar = []

    const week = []

    for (let j = 0; j < 7; j++) {
        const dayOfWeek = currentDay.getDate()
        const isInMonth = currentDay.getMonth() == date.month

        let appointmentsForDay = []
        if (isInMonth) {
            appointmentsForDay = appointments.filter(appointment => new Date(appointment.date).getDate() === dayOfWeek)
        }

        week.push(
            <td
                key={j}
                className={!isInMonth ? 'inactive' : ''}
                onClick={() => {
                    if (isInMonth) {
                        setSearchParams(prev => {
                            prev.set('day', dayOfWeek)
                            return prev
                        })
                    }
                }}
            >
                {isInMonth && (
                    <>
                        <div className={`day-number ${dayOfWeek === today.getDate() && date.month === today.getMonth() && date.year === today.getFullYear() ? 'today' : ''}`}>
                            {dayOfWeek}
                        </div>
                        {appointmentsForDay.map((appointment, index) => (
                            <div
                                className="appointment-info"
                                key={index}
                                style={getBackgroundColor(appointment.status)}
                            >
                                {getAppointmentLink(appointment, userRole)}
                            </div>
                        ))}
                    </>
                )}
            </td>
        )

        currentDay.setDate(dayOfWeek + 1)
    }

    calendar.push(<tr key='week1' className='week-view'>{week}</tr>)

    return calendar
}

export const renderDay = (date, appointments, userRole) => {
    const workingHours = {
        start: 10,
        end: 20
    }

    const hours = []

    const appointmentsForDay = appointments.filter(appointment => {
        return new Date(appointment.date).getDate() === date.day
    })

    for (let i = workingHours.start; i <= workingHours.end; i++) {
        const hour = i < 10 ? `0${i}` : i // Add a leading zero if the hour is less than 10

        // Filter appointments for the current hour
        const appointmentsForHour = appointmentsForDay.filter(appointment => {
            const appointmentTime = appointment.time.split(':')[0]
            return parseInt(appointmentTime) === i
        })

        hours.push(
            <tr key={i} className='day-view'>
                <td className='day-time'>{hour}:00</td>
                <td className='appointment-info'>
                    {appointmentsForHour.map((appointment, index) => (
                        <Link
                            to={userRole ? `/admin/appointments/${appointment.id}` : `/user/appointments/${appointment.id}`}
                            key={index}
                            style={getBackgroundColor(appointment.status)}
                            className='appointment-link'
                        >
                            {appointment.time.slice(0, 5)} - {appointment.service?.name} - {appointment.status}
                        </Link>
                    ))}
                </td>
            </tr>
        )
    }

    return hours
}