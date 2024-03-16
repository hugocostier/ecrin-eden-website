import { useLoaderData } from 'react-router-dom'
import '../../assets/css/store-front/GiftCards.page.css'
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
                        <section className="gift-card">
                            <div className='gift-card-content'>
                                <h2>{giftCardContent.main[0].title}</h2>
                                {giftCardContent.main[0].text.map((text, index) => (
                                    <p key={index}>{text}</p>
                                ))}
                            </div>
                            <div className="gift-card-image">
                                <img src={giftCardContent.main[0].image} alt={'giftCard 1'} />
                            </div>
                        </section>
                    </>
                ) : null
            )}
        </>
    )
}