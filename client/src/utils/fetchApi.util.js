const BASE_URL = 'http://localhost:3000/api/v1'

const fetchApi = async (url) => {
    try { 
        const response = await fetch(`${BASE_URL}/${url}`) 

        if (!response.ok) {
            throw new Error('HTTP Error ! Status: ' + response.status)
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Error fetching API :', error)

        throw error 
    }
}

export default fetchApi
