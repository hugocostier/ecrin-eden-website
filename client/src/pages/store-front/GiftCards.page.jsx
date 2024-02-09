import { useLoaderData } from 'react-router-dom'
import { Loading } from '../../components/Loading'
import { useLoader } from '../../hooks/useLoader.hook'

export const GiftCardsPage = () => {
    const { giftCardContent } = useLoaderData() 

    const loading = useLoader(giftCardContent)

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                giftCardContent ? (
                    <>
                        {giftCardContent.main && giftCardContent.main.map((main, index) => (
                            <div className='giftCard-title' key={index + 1}>
                                <h1>{main.title}</h1>
                                <p>{main.text}</p>
                                <img src={main.image} alt={`giftCard ${index + 1}`}/>
                            </div>
                        ))}
                    </>
                ) : null 
            )}
        </div>
    )
}
