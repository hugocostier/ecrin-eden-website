export const TimeSelection = ({ searchParams, setSearchParams }) => {
    const [times, setTimes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTimes = async () => {
            const response = await fetch(`/api/times?date=${searchParams.date}&service=${searchParams.service}`)
            const data = await response.json()
            setTimes(data)
            setLoading(false)
        }

        fetchTimes()
    }, [searchParams.date, searchParams.service])

    const handleSelect = (date, time) => {
        setSearchParams({ ...searchParams, date, time })
    }

    return (
        <>
            <h2>Choisissez une heure</h2>
            {loading ? <p>Loading...</p> : (
                <div className='time-selection'>
                    {/* {times.map(time => (
                        <TimeCard key={time.id} time={time} searchParams={searchParams} setSearchParams={setSearchParams} handleSelect={handleSelect} />
                    ))} */}
                </div>
            )}
        </>
    )
}