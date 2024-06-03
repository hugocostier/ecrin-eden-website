import { useSearchParams } from 'react-router-dom'
import StyledComponents from 'styled-components'
import { calculateWeekBounds } from '../../../utils/calculateWeekBounds.util'
import { CalendarBody } from './CalendarBody'
import { CalendarHeader } from './CalendarHeader'

export const Calendar = () => {
    const week = calculateWeekBounds(new Date())

    const [searchParams, setSearchParams] = useSearchParams({
        view: 'month',
        date: new Date().toISOString().split('T')[0],
        day: new Date().getDate(),
        week_first_day: week.firstDay?.toISOString().split('T')[0],
        week_last_day: week.lastDay?.toISOString().split('T')[0],
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })

    const view = searchParams.get('view')

    const date = {
        day: searchParams.get('day'),
        week: {
            firstDay: searchParams.get('week_first_day'),
            lastDay: searchParams.get('week_last_day')
        },
        month: searchParams.get('month'),
        year: searchParams.get('year'),
    }

    const switchView = (view) => {
        setSearchParams(prev => {
            prev.set('view', view)
            return prev
        }, { replace: true })
    }

    const updateDate = (view, direction) => {
        switch (view) {
            case 'month':
                updateMonth(direction)
                break
            case 'week':
                updateWeek(direction)
                break
            case 'day':
                updateDay(direction)
                break
            default:
                break
        }
    }

    const updateMonth = (direction) => {
        const newDate = new Date(date.year, date.month, 1)

        if (direction === 'next') {
            newDate.setMonth(newDate.getMonth() + 1)
        } else if (direction === 'prev') {
            newDate.setMonth(newDate.getMonth() - 1)
        } else {
            newDate.setMonth(new Date().getMonth())
            newDate.setFullYear(new Date().getFullYear())
        }

        const week = calculateWeekBounds(newDate)

        setSearchParams(prev => {
            prev.set('month', newDate.getMonth())
            prev.set('year', newDate.getFullYear())
            prev.set('day', newDate.getDate())
            prev.set('week_first_day', week.firstDay?.toISOString().split('T')[0])
            prev.set('week_last_day', week.lastDay?.toISOString().split('T')[0])
            return prev
        }, { replace: true })
    }

    const updateWeek = (direction) => {
        const newDate = new Date(date.year, date.month, date.day)
        const monthLength = new Date(date.year, date.month + 1, 0).getDate()

        if (direction === 'next') {
            if (newDate.getDate() + 7 > monthLength) {
                const diff = newDate.getDate() + 7 - monthLength
                newDate.setDate(diff)
                newDate.setMonth(newDate.getMonth() + 1)
            } else {
                newDate.setDate(newDate.getDate() + 7)
            }
        } else if (direction === 'prev') {
            if (newDate.getDate() - 7 < 1) {
                const diff = Math.abs(newDate.getDate() - 7)
                const prevMonth = new Date(newDate.getFullYear(), newDate.getMonth() - 1, 1)
                const lastDayOfPrevMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()
                newDate.setMonth(prevMonth.getMonth())
                newDate.setDate(lastDayOfPrevMonth - diff + 1)
                newDate.setFullYear(prevMonth.getFullYear())
            } else {
                newDate.setDate(newDate.getDate() - 7)
            }
        } else {
            newDate.setDate(new Date().getDate())
            newDate.setMonth(new Date().getMonth())
            newDate.setFullYear(new Date().getFullYear())
        }

        const week = calculateWeekBounds(newDate)

        setSearchParams(prev => {
            prev.set('day', newDate.getDate())
            prev.set('week_first_day', week.firstDay?.toISOString().split('T')[0])
            prev.set('week_last_day', week.lastDay?.toISOString().split('T')[0])
            prev.set('month', newDate.getMonth())
            prev.set('year', newDate.getFullYear())
            return prev
        }, { replace: true })
    }

    const updateDay = (direction) => {
        const newDay = new Date(date.year, date.month, date.day)
        const monthLength = new Date(date.year, date.month + 1, 0).getDate()

        if (direction === 'next') {
            if (newDay.getDate() + 1 > monthLength) {
                newDay.setDate(1)
                newDay.setMonth(newDay.getMonth() + 1)
            } else {
                newDay.setDate(newDay.getDate() + 1)
            }
        } else if (direction === 'prev') {
            if (newDay.getDate() === 1) {
                const prevMonthLastDay = new Date(date.year, date.month, 0).getDate()
                newDay.setMonth(newDay.getMonth() - 1)
                newDay.setDate(prevMonthLastDay)
            } else {
                newDay.setDate(newDay.getDate() - 1)
            }
        } else {
            newDay.setDate(new Date().getDate())
            newDay.setMonth(new Date().getMonth())
            newDay.setFullYear(new Date().getFullYear())
        }

        const week = calculateWeekBounds(newDay)

        setSearchParams(prev => {
            prev.set('day', newDay.getDate())
            prev.set('week_first_day', week.firstDay?.toISOString().split('T')[0])
            prev.set('week_last_day', week.lastDay?.toISOString().split('T')[0])
            prev.set('month', newDay.getMonth())
            prev.set('year', newDay.getFullYear())
            return prev
        }, { replace: true })
    }

    return (
        <StyledCalendar className='calendar-container'>
            <CalendarHeader currentDate={date} currentView={view} prevNextFunction={updateDate} changeView={switchView} />
            <CalendarBody currentDate={date} currentView={view} setSearchParams={setSearchParams} />
        </StyledCalendar>
    )
}

const StyledCalendar = StyledComponents.section`
    background: var(--grey-300); 
    border-radius: 10px;

    height: 750px;
    max-height: 750px; 
`