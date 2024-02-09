import fetchApi from '../utils/fetchApi.util'

export const homeLoader = async () => {
    try {
        // Check if data is cached in local storage
        const cachedData = localStorage.getItem('cachedHomeContent')

        // If data is cached, return it
        if (cachedData) {
            return { homeContent: JSON.parse(cachedData) }
        }

        // If data is not cached, fetch it from the API
        const data = await fetchApi('content/home')

        if (data && data.content) {
            // Cache the data in local storage
            localStorage.setItem('cachedHomeContent', JSON.stringify(data.content))

            // And return it
            return { homeContent: data.content }
        } 
    } catch (error) {
        console.error('Error fetching home data :', error)
    }
}