import fetchApi from '../../utils/fetchApi.util'

export const serviceLoader = async () => {
    try {
        // Check if data is cached in local storage
        const cachedData = localStorage.getItem('cachedServiceContent')

        // If data is cached, return it
        if (cachedData) {
            return { serviceContent: JSON.parse(cachedData) }
        }

        // If data is not cached, fetch it from the API
        const data = await fetchApi('content/services')

        if (data && data.content) {
            // Cache the data in local storage
            // localStorage.setItem('cachedServiceContent', JSON.stringify(data.content))

            // And return it
            return { serviceContent: data.content }
        }
    } catch (error) {
        console.error('Error fetching service data :', error)
    }
}