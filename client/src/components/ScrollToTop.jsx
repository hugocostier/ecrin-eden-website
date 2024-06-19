import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop = () => {
    const { pathname } = useLocation()

    const [isVisited, setIsVisited] = useState(false)
    const previousPathRef = useRef()

    useEffect(() => {
        const previousPath = previousPathRef.current

        if (!previousPath || !previousPath.startsWith('/appointment')) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        } else {
            switch (pathname) {
                case '/appointment/service':
                    if (!isVisited) {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                        setIsVisited(true)
                    }
                    break
                case '/appointment/date':
                    break
                case '/appointment/time':
                    break
                case '/appointment/info':
                    break
                case '/appointment/confirm':
                    break
                case '/appointment/thank-you':
                    break
                default:
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                    break
            }
        }

        previousPathRef.current = pathname
    }, [pathname, isVisited])
}