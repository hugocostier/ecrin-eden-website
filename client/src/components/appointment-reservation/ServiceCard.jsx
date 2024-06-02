export const ServiceCard = ({ service, searchParams, setSearchParams }) => {
    const { id, name, duration, price } = service

    const handleSelect = () => {
        setSearchParams({ ...searchParams, service: id })
    }

    return (
        <div className='service-card' onClick={handleSelect}>
            <h3>{name}</h3>
            <p>{duration} minutes</p>
            <p>{price} €</p>
        </div>
    )
}