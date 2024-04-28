import fetchApi from '../../utils/fetchApi.util'

export const certificationLoader = async () => {
    try {
        // Check if data is cached in local storage
        const cachedData = localStorage.getItem('cachedCertificationContent')

        // If data is cached, return it
        if (cachedData) {
            return { certificationContent: JSON.parse(cachedData) }
        }

        // If data is not cached, fetch it from the API
        const data = await fetchApi('content/certifications')

        if (data && data.content) {
            // Cache the data in local storage
            // localStorage.setItem('cachedCertificationContent', JSON.stringify(data.content))

            // And return it
            return { certificationContent: data.content }
        }
    } catch (error) {
        console.error('Error fetching certification data :', error)
    }
}