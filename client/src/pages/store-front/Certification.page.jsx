import { useLoaderData } from 'react-router-dom'
import { Loading } from '../../components/Loading'
import { useLoader } from '../../hooks/useLoader.hook'

export const CertificationPage = () => {
    const { certificationContent } = useLoaderData() 

    const loading = useLoader(certificationContent)

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                certificationContent ? (
                    <>
                        {certificationContent.header && certificationContent.header.map((header, index) => (
                            <div className='certification-title' key={index + 1}>
                                <h1>{header.title}</h1>
                                {header.images && header.images.map((image, index) => (
                                    <img key={index} src={image} alt={`certification ${index + 1}`}/>
                                ))}
                            </div>
                        ))}

                        <div className='certification-main'>
                            {certificationContent.main.map((main, index) => (
                                <div className='card' key={index + 1}>
                                    <h3>{main.title}</h3>
                                    <p>{main.text}</p>
                                    <img src={main.image} alt={`Card ${index + 1}`}/>
                                </div>
                            ))}
                        </div>
                    </>
                ) : null 
            )}
        </div>
    )
}
