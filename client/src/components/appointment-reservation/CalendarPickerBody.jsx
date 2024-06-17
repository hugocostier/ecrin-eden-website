import PropTypes from 'prop-types'
import StyledComponents from 'styled-components'

export const CalendarPickerBody = ({ register, date, setValue, selectedDate }) => {
    const renderMonth = (date) => {
        const daysInPreviousMonth = new Date(date.year, date.month, 0).getDate()
        const daysInMonth = new Date(date.year, date.month + 1, 0).getDate()
        const firstDay = new Date(date.year, date.month, 0).getDay()
        const today = new Date()
        let currentDay = 1
        const calendar = []

        for (let i = 0; i < 6; i++) {
            const week = []

            for (let j = 0; j < 7; j++) {
                let dayOfMonth = ''

                if ((i === 0 && j < firstDay)) {
                    dayOfMonth = daysInPreviousMonth - (firstDay - 1) + j
                    week.push(
                        <td key={j} className='inactive'>
                            <div className='day-number'>{dayOfMonth}</div>
                        </td>
                    )
                } else if (currentDay <= daysInMonth) {
                    const monthString = date.month < 9 ? `0${date.month + 1}` : date.month + 1
                    const dayString = currentDay < 10 ? `0${currentDay}` : currentDay
                    const formattedDate = `${date.year}-${monthString}-${dayString}`

                    const isSelected = selectedDate === formattedDate

                    week.push(
                        <td
                            key={j}
                            onClick={() => setValue('date', `${formattedDate}`)}
                            className={`day-time ${isSelected ? 'selected' : ''}`}
                            {...register('date', { required: 'Veuillez choisir une date' })}
                        >
                            <div className={`day-number ${currentDay == today.getDate() && date.month == today.getMonth() && date.year == today.getFullYear() ? 'today' : ''}`}>{currentDay}</div>
                        </td>
                    )

                    currentDay++
                } else {
                    dayOfMonth = currentDay - daysInMonth
                    week.push(
                        <td key={j} className='inactive'>
                            <div className='day-number'>{dayOfMonth}</div>
                        </td>
                    )

                    currentDay++
                }
            }

            calendar.push(
                <tr key={i}>
                    {week}
                </tr>
            )
        }

        return calendar
    }

    return (
        <CalendarPickerBodyContainer>
            <Week>
                <tr>
                    <th>Lun</th>
                    <th>Mar</th>
                    <th>Mer</th>
                    <th>Jeu</th>
                    <th>Ven</th>
                    <th>Sam</th>
                    <th>Dim</th>
                </tr>
            </Week>
            <Month>
                {renderMonth(date)}
            </Month>
        </CalendarPickerBodyContainer>
    )
}

CalendarPickerBody.propTypes = {
    register: PropTypes.func.isRequired,
    date: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
    selectedDate: PropTypes.string,
}

const CalendarPickerBodyContainer = StyledComponents.table`
    width: 95%;
    margin: 1rem auto;
    border-collapse: collapse;

    tbody, thead {
        th {
            width: calc(100% / 7); 
        }
    }

    tbody {
        tr {
            &.day-view {
                height: 55px;

                .appointment-link {
                    font-size: 0.8rem; 
                }
            }

            &.week-view {
                height: 570px;
            }

            &.month-view {
                height: 95px;
            }
        }
    }
`

const Week = StyledComponents.thead`
    th {
        width: calc(100% / 7); 
    }
`

const Month = StyledComponents.tbody`
    td {
        vertical-align: top;
        border: 1px solid var(--grey-500);
        padding: 5px; 
        cursor: pointer;

        &:hover {
            background: var(--grey-200); 
        }

        &.inactive {
            color: var(--grey-300);
            cursor: not-allowed;
        }

        &.day-time {
            width: 80px;
            text-align: center;
            align-content: center; 

            &.selected {
                background: var(--grey-200);
            }
        }

        .day-number {
            text-align: right; 
            margin-right: 5px; 
            font-size: 1rem;

            &.today {
                font-weight: bold;
                color: var(--red);
            }
        }   
        
        .appointment-info {
            padding-left: 10px;
            padding-right: 10px; 
            border-radius: 5px; 
            font-size: 0.875rem;
            margin-top: 2px;
            cursor: pointer;
        }

        .appointment-link {
            display: block; 
            width: 100%;
            color: inherit;
            text-decoration: none;
        }
        
        .more-appointments {
            padding-left: 10px;  
            color: var(--grey-600)       
        }
    } 
`