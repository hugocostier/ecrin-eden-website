import { useLoaderData } from 'react-router-dom'
import '../../assets/css/store-front/Certification.page.css'
import { Loading } from '../../components'
import { useLoader } from '../../hooks/useLoader.hook'

export const CertificationPage = () => {
    const { certificationContent } = useLoaderData()

    const loading = useLoader(certificationContent)

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                certificationContent ? (
                    <>
                        <section
                            className='certification-title'
                            style={{ backgroundImage: `url(${certificationContent.header[0].images})` }}
                        >
                            <h2>{certificationContent.header[0].title}</h2>
                        </section>

                        <section className='certification-main'>
                            {certificationContent.main.map((main, index) => (
                                <div className={`card card-${index + 1}`} key={index + 1}>
                                    <div className="card-content">
                                        <h3>{main.title}</h3>
                                        <p>{main.text}</p>
                                    </div>

                                    <div className="card-image">
                                        {main.images && main.images.map((image, index) => (
                                            <img key={index + 1} src={image} alt={`Card ${index + 1}`} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </section>
                    </>
                ) : null
            )}
        </>
    )
}
