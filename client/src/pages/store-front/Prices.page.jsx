import { useLoaderData } from 'react-router-dom'
import { Loading } from '../../components/Loading'
import { useLoader } from '../../hooks/useLoader.hook'

export const PricesPage = () => {
    const { priceContent } = useLoaderData() 

    const loading = useLoader(priceContent)

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                priceContent ? (
                    <>
                        {priceContent.header && priceContent.header.map((header, index) => (
                            <div className='price-title' key={index + 1}>
                                <h1>{header.title}</h1>
                                <img src={header.image} alt={`price ${index + 1}`}/>
                            </div>
                        ))}

                        <div className='price-main'>
                            {priceContent.main.map((main, index) => (
                                <div className='card' key={index + 1}>
                                    <h3>{main.title}</h3>
                                    <p>{main.duration}</p>
                                    <p>{main.price}</p>
                                </div>
                            ))}
                        </div>

                        <div className='price-more'>
                            <div>
                                <h3>{priceContent.more[0].title}</h3>
                                <p>{priceContent.more[0].price}</p>
                            </div>

                            <div>
                                <p>{priceContent.more[1].text}</p>
                                {priceContent.more[1].choices.map((choice, index) => (
                                    <p key={index + 1}>{choice}</p>
                                ))}
                                <p>{priceContent.more[1].more}</p>
                            </div>
                        </div>
                    </>
                ) : null 
            )}
        </div>
    )
}
