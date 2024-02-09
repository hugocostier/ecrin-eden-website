import { useLoaderData } from 'react-router-dom'
import { Loading } from '../../components/Loading'
import { useLoader } from '../../hooks/useLoader.hook'

export const ContactPage = () => {
    const { contactContent } = useLoaderData() 

    const loading = useLoader(contactContent)

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                contactContent ? (
                    <>
                        {contactContent.header && contactContent.header.map((header, index) => (
                            <div className='contact-title' key={index + 1}>
                                <h1>{header.title}</h1>
                                <img src={header.image} alt={`contact ${index + 1}`}/>
                                <p>{header.name}</p>
                                <p>{header.address}</p>
                                <p>{header.zip}</p>
                                <p>{header.city}</p>
                                <p>{header.phone}</p>
                                <p>{header.email}</p>
                            </div>
                        ))}
                    </>
                ) : null 
            )}
        </div>
    )
}
