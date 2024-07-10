import DOMPurify from 'dompurify'
import { initializeReset } from '../../utils/store-front-content/initializeReset.util'

const API_URL = `${import.meta.env.VITE_APP_API_URL}/content`

export const fetchPageContent = async (pageId, storeFrontPages, reset) => {
    let content

    if (storeFrontPages[pageId - 1].id === parseInt(pageId)) {
        content = await storeFrontPages[pageId - 1].loader()
    }

    initializeReset(content, pageId, reset)

    return content
}

export const updateContent = async (page, content) => {
    const cleanContent = DOMPurify.sanitize(content.trim())

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/${page}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(cleanContent),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP Error ! Status: ' + response.status)
                }

                return response.json()
            })
            .then((content) => {
                resolve(content)
            })
            .catch((error) => {
                console.error('Error updating content:', error)
                reject([])
            })
    })
}
