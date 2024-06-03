import { useLoaderData } from 'react-router-dom'
import StyledComponents from 'styled-components'
import { Loading } from '../../components'
import { useLoader } from '../../hooks/useLoader.hook'

export const GiftCardsPage = () => {
    const { giftCardContent } = useLoaderData()

    const loading = useLoader(giftCardContent)

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                giftCardContent ? (
                    <>
                        <GiftCard className='gift-card'>
                            <div className='gift-card-content'>
                                <h2>{giftCardContent.main[0].title}</h2>
                                {giftCardContent.main[0].text.map((text, index) => (
                                    <p key={index}>{text}</p>
                                ))}
                            </div>
                            <div className='gift-card-image'>
                                <img src={giftCardContent.main[0].image} alt={'giftCard 1'} />
                            </div>
                        </GiftCard>
                    </>
                ) : null
            )}
        </>
    )
}

const GiftCard = StyledComponents.section`
    background-color: var(--primary-500);
    color: var(--white);
    padding-bottom: 70px;

    .gift-card-content {
        margin: 0 10%;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-top: 40px;

        p:nth-child(4) {
            font-weight: bold;
        }

        p:nth-child(5) {
            font-style: italic;
        }
    }

    .gift-card-image {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 8%;
        border: 1px solid var(--white);
        border-radius: 15px;
        max-width: 950px;

        img {
            padding: 10px;
            object-fit: cover;
            object-position: 50% 50%;
            width: 100%;
            max-height: 600px;
        }
    }

    @media screen and (min-width: 640px) {
        .gift-card-image {
            border-radius: 25px;

            img {
                padding: 20px;
            }
        }
    }
    
    @media screen and (min-width: 1024px) {
        .gift-card-image {
            margin: 0 auto;
            border-radius: 25px;

            img {
                padding: 20px;
            }
        }
    }
`