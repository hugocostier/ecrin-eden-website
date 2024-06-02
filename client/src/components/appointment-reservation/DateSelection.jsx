export const DateSelection = ({ dates, searchParams, setSearchParams }) => {
    const handleSelect = (dateId) => {
        setSearchParams({ ...searchParams, date: dateId })
    }

    return (
        <div className='date-selection'>
            {dates.map(date => (
                <CalendarCard key={date.id} date={date} searchParams={searchParams} setSearchParams={setSearchParams} handleSelect={handleSelect} />
            ))}
        </div>
    )
}