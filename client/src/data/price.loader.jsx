import fetchApi from '../utils/fetchApi.util'

export const priceLoader = async () => {
    try {
        // Check if data is cached in local storage
        const cachedData = localStorage.getItem('cachedPriceContent')

        // If data is cached, return it
        if (cachedData) {
            return { priceContent: JSON.parse(cachedData) }
        }

        // If data is not cached, fetch it from the API
        const data = await fetchApi('content/prices')

        if (data && data.content) {
            // Cache the data in local storage
            localStorage.setItem('cachedPriceContent', JSON.stringify(data.content))

            // And return it
            return { priceContent: data.content }
        } 
    } catch (error) {
        console.error('Error fetching price data :', error)
    }
}