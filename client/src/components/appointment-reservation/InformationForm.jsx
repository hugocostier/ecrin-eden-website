export const InformationForm = ({ searchParams, setSearchParams }) => {
    const { name, email, phone } = searchParams

    const handleChange = (e) => {
        const { name, value } = e.target
        setSearchParams({ ...searchParams, [name]: value })
    }

    return (
        <div className='information-form'>
            <h2>Enter Your Information</h2>
            <form>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' value={name} onChange={handleChange} />

                <label htmlFor='email'>Email</label>
                <input type='email' name='email' value={email} onChange={handleChange} />

                <label htmlFor='phone'>Phone</label>
                <input type='tel' name='phone' value={phone} onChange={handleChange} />
            </form>
        </div>
    )
}