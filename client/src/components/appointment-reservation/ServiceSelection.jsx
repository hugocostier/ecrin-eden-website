export const ServiceSelection = ({ searchParams, setSearchParams }) => {
    const [services, setServices] = useState([])

    useEffect(() => {
        const fetchServices = async () => {
            const response = await fetch('/api/services')
            const data = await response.json()
            setServices(data)
        }

        fetchServices()
    }, [])

    return (
        <div className='service-selection'>
            <h2>Choisissez un service</h2>
            <div className='service-list'>
                {services.map(service => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                    />
                ))}
            </div>
        </div>
    )
}