import { useLoaderData } from 'react-router-dom'
import '../../assets/css/store-front/Services.page.css'
import { Loading } from '../../components/Loading'
import { useLoader } from '../../hooks/useLoader.hook'

export const ServicesPage = () => {
    const { serviceContent } = useLoaderData() 

    const loading = useLoader(serviceContent)

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                serviceContent ? (
                    <>
                        <section className='service-title'>
                            <h2>{serviceContent.header[0].title}</h2>
                            {serviceContent.header[0].images.map((images, index) => (
                                <div className="image" key={index} >
                                    <img src={images} alt={`service ${index + 1}`}/>
                                </div>
                            ))}
                        </section>

                        <section className='service-main'>
                            <section className='card card-intro'>
                                <div className='svg-container'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="88.458 89.863 23.063 20.276"><g><path d="m109.66 91.75-.36.35.36-.35a6.25 6.25 0 0 0-4.45-1.84 6.25 6.25 0 0 0-4.45 1.84l-.76.76-.76-.76a6.29 6.29 0 1 0-8.9 8.89l9.31 9.36a.51.51 0 0 0 .7 0l9.31-9.31a6.3 6.3 0 0 0 0-8.94Zm-.66 8.19-9 9-9-9a5.29 5.29 0 1 1 7.48-7.48l1.12 1.11a.48.48 0 0 0 .7 0l1.12-1.12a5.29 5.29 0 0 1 3.74-1.54 5.26 5.26 0 0 1 3.84 1.55 5.3 5.3 0 0 1 0 7.48Z"></path></g></svg>
                                </div>
                             
                                <div className="card-content">
                                    <h3>{serviceContent.main[0].title}</h3>
                                    {serviceContent.main[0].text.map((text, index) => (
                                        <p key={index}>{text}</p>
                                    ))}
                                </div>
                            </section>

                            {serviceContent.services.map((services, index) => (
                                <section className={`card card-${index}`} key={index + 1}>
                                    <div className="card-content">
                                        <h3 className='title'>{services.title}</h3>
                                        <p className='time'>{services.time}</p>
                                        <div className="text">
                                            {services.text.map((text, index) => (
                                                <p key={index}>{text}</p>
                                            ))}
                                        </div>
                                        <a href="" className='btn-book'>
                                            <button>Réserver maintenant</button>
                                        </a>
                                    </div>

                                    <div className="card-image">
                                        <img src={services.image} alt={`service ${index + 1}`}/>
                                    </div>
                                </section>
                            ))}
                        </section>

                        <section className='service-footer'>
                            <h4>{serviceContent.header[0].subtitle}</h4>
                        </section>
                    </>
                ) : null 
            )}
        </>
    )
}