export const ConfirmationForm = ({ searchParams }) => {
    const { service, date, time, name, email, phone } = searchParams

    return (
        <div className='confirmation-form'>
            <h2>Review and Confirm</h2>
            <div className='confirmation-card'>
                <h3>Service</h3>
                <p>{service.name}</p>
            </div>
            <div className='confirmation-card'>
                <h3>Date</h3>
                <p>{date.day} {date.month} {date.year}</p>
            </div>
            <div className='confirmation-card'>
                <h3>Time</h3>
                <p>{time.start}</p>
            </div>
            <div className='confirmation-card'>
                <h3>Name</h3>
                <p>{name}</p>
            </div>
            <div className='confirmation-card'>
                <h3>Email</h3>
                <p>{email}</p>
            </div>
            <div className='confirmation-card'>
                <h3>Phone</h3>
                <p>{phone}</p>
            </div>
        </div>
    )
}