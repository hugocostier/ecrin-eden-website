import { useLoaderData } from 'react-router-dom'
import StyledComponents from 'styled-components'
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

                        <PriceContent className='price-main'>
                            <PriceCard className='price-cards'>
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
                            </PriceCard>

                            <PriceMore className='price-more'>
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
                            </PriceMore>

                            <PriceImage className='price-image'>
                                <img src={priceContent.image} alt={priceContent.alt} />
                            </PriceImage>
                        </PriceContent>
                    </>
                ) : null
            )}
        </>
    )
}

const PriceContent = StyledComponents.section`
    display: grid;
    grid-template-columns: 1fr;
    gap: 50px;

    @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 0;
        margin-top: 50px;
    }
`

const PriceCard = StyledComponents.section`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin: 0 8%;
    margin-top: 50px;

    h3 {
        margin-bottom: 0;
    }

    .card {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid var(--grey-400);

        div {
            display: flex;
            gap: 15px;
        }

        p {
            margin-bottom: 8px;
        }
    }

    @media screen and (min-width: 1024px) {
        margin-top: 0;
    }
`

const PriceMore = StyledComponents.section`
    display: grid;
    grid-template-columns: 1fr;
    margin: 0 8%;

    div {
        margin-bottom: 10px;

        h4 {
            font-weight: normal;
            margin-bottom: 12px;
        }
    }

    p {
        margin: 0;
    }

    li {
        margin-left: 10px;

        &:last-of-type {
            margin-bottom: 10px;
        }
    }

    @media screen and (min-width: 1024px) {
        display: block;
        margin-top: 30px;
        align-self: center;
    }
`

const PriceImage = StyledComponents.section`
    display: grid;
    grid-template-columns: 1fr;
    background-color: var(--primary-500);
    padding: 50px 0;

    img {
        width: 50%;
        object-fit: cover;
        object-position: 50% 50%;
        margin: 0 auto;
        opacity: 0.7;
    }

    @media screen and (min-width: 768px) and (max-width: 1023px) {
        .price-image {
            img {
                aspect-ratio: 1 / 1;
            }
        }
    }

    @media screen and (min-width: 1024px) {
        grid-column: 2 / 3;
        grid-row: 1 / 3;
        align-items: center;
        padding: 0;

        img {
            width: 70%;
            margin-top: 10%;
            margin-bottom: 10%;
            max-height: 600px;
        }
    }
`
