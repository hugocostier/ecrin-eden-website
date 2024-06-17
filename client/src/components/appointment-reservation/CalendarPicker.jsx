import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router-dom'
import StyledComponents from 'styled-components'
import { CalendarPickerBody } from './CalendarPickerBody'
import { CalendarPickerHeader } from './CalendarPickerHeader'

export const CalendarPicker = ({ register, setValue, selectedDate }) => {
    const getMonth = (selectedDate) => {
        return selectedDate ? new Date(selectedDate).getMonth() : new Date().getMonth()
    }

    const getYear = (selectedDate) => {
        return selectedDate ? new Date(selectedDate).getFullYear() : new Date().getFullYear()
    }

    const [searchParams, setSearchParams] = useSearchParams({
        month: getMonth(selectedDate),
        year: getYear(selectedDate)
    })

    const date = {
        month: parseInt(searchParams.get('month')),
        year: parseInt(searchParams.get('year'))
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

        setSearchParams(prev => {
            prev.set('month', newDate.getMonth())
            prev.set('year', newDate.getFullYear())
            return prev
        }, { replace: true })
    }

    return (
        <CalendarPickerContainer>
            <CalendarPickerHeader currentDate={date} updateMonth={updateMonth} />
            <CalendarPickerBody register={register} date={date} setValue={setValue} selectedDate={selectedDate} />
        </CalendarPickerContainer>
    )
}

CalendarPicker.propTypes = {
    register: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    selectedDate: PropTypes.string,
}

const CalendarPickerContainer = StyledComponents.section`
    user-select: none;
    margin: 1rem auto;
`