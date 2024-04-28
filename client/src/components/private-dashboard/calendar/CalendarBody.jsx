import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import { fetchAllAppointments, fetchAppointments } from '../../../data'
import { useAuth } from '../../../hooks/useAuth.hook'
import { useClientInfo } from '../../../hooks/useClientInfo.hook'
import { renderDay, renderMonth, renderWeek } from '../../../utils/renderCalendar.util'
import { Days } from './Days'
import { Week } from './Week'

export const CalendarBody = ({ currentDate, currentView }) => {
    const client = useClientInfo()
    const [appointments, setAppointments] = useState([])
    const isAdmin = useAuth().user.role === 'admin'

    useEffect(() => {
        if (!client.id) return

        const options = { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }

        if (currentView === 'day') {
            const today = new Date(currentDate.year, currentDate.month, currentDate.day)
            const todayFormatted = today.toLocaleDateString('fr-FR', options).split('/').reverse().join('-')

            if (isAdmin) {
                toast.promise(fetchAllAppointments({ day: todayFormatted }), {
                    pending: 'Chargement...',
                    success: 'Rendez-vous récupérés !',
                    error: 'Erreur lors de la récupération des rendez-vous'
                }, { containerId: 'notification' })
                    .then(fetchedAppointments => {
                        setAppointments(fetchedAppointments.data)
                    })
                    .catch(error => {
                        console.error('Error fetching events:', error)
                    })
            } else {
                toast.promise(fetchAppointments({ day: todayFormatted, clientId: client.id }), {
                    pending: 'Chargement...',
                    success: 'Rendez-vous récupérés !',
                    error: 'Erreur lors de la récupération des rendez-vous'
                }, { containerId: 'notification' })
                    .then(fetchedAppointments => {
                        setAppointments(fetchedAppointments.data)
                    })
                    .catch(error => {
                        console.error('Error fetching events:', error)
                    })
            }
        } else {
            let rangeStart, rangeEnd, rangeStartFormatted, rangeEndFormatted

            if (currentView === 'week') {
                const firstDayOfWeek = new Date(currentDate.week.firstDay)
                const lastDayOfWeek = new Date(currentDate.week.lastDay)

                rangeStart = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate())
                rangeStartFormatted = rangeStart.toLocaleDateString('fr-FR', options).split('/').reverse().join('-')

                rangeEnd = new Date(lastDayOfWeek.getFullYear(), lastDayOfWeek.getMonth(), lastDayOfWeek.getDate())
                rangeEndFormatted = rangeEnd.toLocaleDateString('fr-FR', options).split('/').reverse().join('-')

            } else if (currentView === 'month') {
                const lastDayOfMonth = new Date(currentDate.year, currentDate.month + 1, 0).getDate()

                rangeStart = new Date(currentDate.year, currentDate.month, 1)
                rangeStartFormatted = rangeStart.toLocaleDateString('fr-FR', options).split('/').reverse().join('-')

                rangeEnd = new Date(currentDate.year, currentDate.month, lastDayOfMonth)
                rangeEndFormatted = rangeEnd.toLocaleDateString('fr-FR', options).split('/').reverse().join('-')
            }

            if (isAdmin) {
                toast.promise(fetchAllAppointments({ rangeStart: rangeStartFormatted, rangeEnd: rangeEndFormatted }), {
                    pending: 'Chargement...',
                    success: 'Rendez-vous récupérés !',
                    error: 'Erreur lors de la récupération des rendez-vous'
                }, { containerId: 'notification' })
                    .then(fetchedAppointments => {
                        setAppointments(fetchedAppointments.data)
                    })
                    .catch(error => {
                        console.error('Error fetching events:', error)
                    })
            } else {
                toast.promise(fetchAppointments({ rangeStart: rangeStartFormatted, rangeEnd: rangeEndFormatted, clientId: client.id }), {
                    pending: 'Chargement...',
                    success: 'Rendez-vous récupérés !',
                    error: 'Erreur lors de la récupération des rendez-vous'
                }, { containerId: 'notification' })
                    .then(fetchedAppointments => {
                        setAppointments(fetchedAppointments.data)
                    })
                    .catch(error => {
                        console.error('Error fetching events:', error)
                    })
            }
        }

        return () => {
            setAppointments([])
        }
    }, [currentDate, currentView, isAdmin, client.id])

    return (
        <StyledCalendarBody className={currentView}>
            {/* If current view is 'month', render the month */}
            {currentView === 'month' ? (
                <>
                    <Week />
                    <Days render={renderMonth(currentDate, appointments)} />
                </>
            )
                // If current view is 'week', render the week 
                : currentView === 'week' ? (
                    <>
                        <Week />
                        <Days render={renderWeek(currentDate, appointments)} />
                    </>
                )
                    // If current view is 'day', render the day 
                    : currentView === 'day' ? (
                        <>
                            <Days render={renderDay(currentDate, appointments)} />
                        </>
                    )
                        : null
            }
        </StyledCalendarBody>
    )
}

CalendarBody.propTypes = {
    currentDate: PropTypes.object.isRequired,
    currentView: PropTypes.string.isRequired
}

const StyledCalendarBody = StyledComponents.table`
    width: 95%;
    margin: 0 auto;
    border-collapse: collapse;
    margin-bottom: 20px;

    tbody, thead {
        th {
            width: calc(100% / 7); 
        }
    }
`