import { useLoaderData } from 'react-router-dom'
import '../../assets/css/store-front/Prices.page.css'
import { Loading, PageTitle } from '../../components'
import { useLoader } from '../../hooks/useLoader.hook'

export const PricesPage = () => {
    const { priceContent } = useLoaderData()

    const loading = useLoader(priceContent)

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                priceContent ? (
                    <>
                        <PageTitle content={priceContent} pageName='price'></PageTitle>

                        <section className='price-main'>
                            <section className="price-cards">
                                <h3>Tarifs</h3>
                                {priceContent.main.map((main, index) => (
                                    <div className='card' key={index + 1}>
                                        <div>
                                            <p>{main.title}</p>
                                            <p>{main.duration}</p>
                                        </div>
                                        <p>{main.price}</p>
                                    </div>
                                ))}
                            </section>

                            <section className='price-more'>
                                <div>
                                    <h4>{priceContent.more[0].title}</h4>
                                    <p>{priceContent.more[0].price}</p>
                                </div>

                                <div>
                                    <p>{priceContent.more[1].text}</p>
                                    {priceContent.more[1].choices.map((choice, index) => (
                                        <li key={index + 1}>{choice}</li>
                                    ))}
                                    <p>{priceContent.more[1].more}</p>
                                </div>
                            </section>

                            <section className="price-image">
                                <img src={priceContent.image} alt={priceContent.alt} />
                            </section>
                        </section>
                    </>
                ) : null
            )}
        </>
    )
}
