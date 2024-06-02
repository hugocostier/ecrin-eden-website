export const CalendarCard = ({ date, searchParams, setSearchParams }) => {
    const { id, day, month, year } = date

    const handleSelect = () => {
        setSearchParams({ ...searchParams, date: id })
    }

    return (
        <div className='calendar-card' onClick={handleSelect}>
            <p>{day}</p>
            <p>{month}</p>
            <p>{year}</p>
        </div>
    )
}