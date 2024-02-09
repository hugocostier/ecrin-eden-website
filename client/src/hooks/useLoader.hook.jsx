import { useEffect, useState } from 'react'

export const useLoader = (data) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (data) {
            setLoading(false)
        }
    }, [data])

    return loading
}