import { useLoaderData } from 'react-router-dom'
import { Loading } from '../../components/Loading'
import { useLoader } from '../../hooks/useLoader.hook'

export const ServicesPage = () => {
    const { serviceContent } = useLoaderData() 

    const loading = useLoader(serviceContent)

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                serviceContent ? (
                    <>
                        {serviceContent.header && serviceContent.header.map((header, index) => (
                            <div className='service-title' key={index + 1}>
                                <h1>{header.title}</h1>
                                {header.images.map((images, index) => (
                                    <img key={index} src={images} alt={`service ${index + 1}`}/>
                                ))}
                            </div>
                        ))}

                        <div className='service-main'>
                            {serviceContent.main.map((main, index) => (
                                <div className='card' key={index + 1}>
                                    <h3>{main.title}</h3>
                                    <p>{main.text}</p>
                                </div>
                            ))}
                        </div>

                        {serviceContent.services.map((services, index) => (
                            <div className='service-infos' key={index + 1}>
                                <h3>{services.title}</h3>
                                <p>{services.time}</p>
                                <p>{services.text}</p>
                                <img src={services.image} alt={`service ${index + 1}`}/>
                            </div>
                        ))}
                    </>
                ) : null 
            )}
        </div>
    )
}