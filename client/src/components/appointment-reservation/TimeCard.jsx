export const TimeCard = ({ time, searchParams, setSearchParams, handleSelect }) => {
    const { id, start } = time

    const handleClick = () => {
        handleSelect(searchParams.date, id)
    }

    return (
        <div className='time-card' onClick={handleClick}>
            <p>{start}</p>
        </div>
    )
}