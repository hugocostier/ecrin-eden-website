import fetchApi from '../../utils/fetchApi.util'

export const contactLoader = async () => {
    try {
        // Check if data is cached in local storage
        const cachedData = localStorage.getItem('cachedContactContent')

        // If data is cached, return it
        if (cachedData) {
            return { contactContent: JSON.parse(cachedData) }
        }

        // If data is not cached, fetch it from the API
        const data = await fetchApi('content/contact')

        if (data && data.content) {
            // Cache the data in local storage
            // localStorage.setItem('cachedContactContent', JSON.stringify(data.content))

            // And return it
            return { contactContent: data.content }
        }
    } catch (error) {
        console.error('Error fetching contact data :', error)
    }
}