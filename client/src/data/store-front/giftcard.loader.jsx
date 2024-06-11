import fetchApi from '../../utils/fetchApi.util'

export const giftCardLoader = async () => {
    try {
        // Check if data is cached in local storage
        const cachedData = localStorage.getItem('cachedGiftCardContent')

        // If data is cached, return it
        if (cachedData) {
            return { giftCardContent: JSON.parse(cachedData) }
        }

        // If data is not cached, fetch it from the API
        const data = await fetchApi('content/gift-cards')

        if (data && data.data) {
            // Cache the data in local storage
            // localStorage.setItem('cachedGiftCardContent', JSON.stringify(data.content))

            // And return it
            return { giftCardContent: data.data }
        }
    } catch (error) {
        console.error('Error fetching gift-card data :', error)
    }
}