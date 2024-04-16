import { useState } from 'react';
import StyledComponents from 'styled-components';
import { calculateWeekBounds } from '../../../utils/calculateWeekBounds.util';
import { CalendarBody } from './CalendarBody';
import { CalendarHeader } from './CalendarHeader';

const StyledCalendar = StyledComponents.section`
    background: var(--grey-300); 
    border-radius: 10px;

    height: max-content;
`

export const Calendar = () => {
    const [currentView, setCurrentView] = useState('day');

    const [currentDate, setCurrentDate] = useState({
        day: new Date().getDate(),
        week: calculateWeekBounds(new Date()),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })

    const switchView = (view) => {
        setCurrentView(view);
    }

    const updateDate = (view, direction) => {
        switch (view) {
            case 'month':
                updateMonth(direction);
                break
            case 'week':
                updateWeek(direction);
                break
            case 'day':
                updateDay(direction);
                break
            default:
                break
        }
    }

    const updateMonth = (direction) => {
        const newDate = new Date(currentDate.year, currentDate.month, 1);

        if (direction === 'next') {
            newDate.setMonth(newDate.getMonth() + 1);
        } else if (direction === 'prev') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setMonth(new Date().getMonth());
            newDate.setFullYear(new Date().getFullYear());
        }

        setCurrentDate({
            ...currentDate,
            month: newDate.getMonth(),
            year: newDate.getFullYear(),
            day: newDate.getDate(),
            week: calculateWeekBounds(newDate)
        })
    }

    const updateWeek = (direction) => {
        const newDate = new Date(currentDate.year, currentDate.month, currentDate.day)
        const monthLength = new Date(currentDate.year, currentDate.month + 1, 0).getDate()

        if (direction === 'next') {
            if (newDate.getDate() + 7 > monthLength) {
                const diff = newDate.getDate() + 7 - monthLength
                newDate.setDate(diff)
                newDate.setMonth(newDate.getMonth() + 1)
            } else {
                newDate.setDate(newDate.getDate() + 7);
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
                newDate.setDate(newDate.getDate() - 7);
            }
        } else {
            newDate.setDate(new Date().getDate());
            newDate.setMonth(new Date().getMonth());
            newDate.setFullYear(new Date().getFullYear());
        }

        setCurrentDate({
            ...currentDate,
            day: newDate.getDate(),
            week: calculateWeekBounds(newDate),
            month: newDate.getMonth(),
            year: newDate.getFullYear()
        })
    }

    const updateDay = (direction) => {
        const newDay = new Date(currentDate.year, currentDate.month, currentDate.day)
        const monthLength = new Date(currentDate.year, currentDate.month + 1, 0).getDate()

        if (direction === 'next') {
            if (newDay.getDate() + 1 > monthLength) {
                newDay.setDate(1)
                newDay.setMonth(newDay.getMonth() + 1)
            } else {
                newDay.setDate(newDay.getDate() + 1);
            }
        } else if (direction === 'prev') {
            if (newDay.getDate() === 1) {
                const prevMonthLastDay = new Date(currentDate.year, currentDate.month, 0).getDate()
                newDay.setMonth(newDay.getMonth() - 1)
                newDay.setDate(prevMonthLastDay)
            } else {
                newDay.setDate(newDay.getDate() - 1);
            }
        } else {
            newDay.setDate(new Date().getDate());
            newDay.setMonth(new Date().getMonth());
            newDay.setFullYear(new Date().getFullYear());
        }

        setCurrentDate({
            ...currentDate,
            day: newDay.getDate(),
            month: newDay.getMonth(),
            year: newDay.getFullYear(),
            week: calculateWeekBounds(newDay)
        })
    }

    return (
        <StyledCalendar className='calendar-container'>
            <CalendarHeader currentDate={currentDate} currentView={currentView} prevNextFunction={updateDate} changeView={switchView} />
            <CalendarBody currentDate={currentDate} currentView={currentView} />
        </StyledCalendar>
    )
}