import CookieConsent from 'react-cookie-consent'
import { ScrollToTop } from '../../components/ScrollToTop'
import { Footer } from '../../components/store-front/Footer'
import { Navbar } from '../../components/store-front/Navbar'
``
export const StoreRoot = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <CookieConsent
                location='bottom'
                buttonText='J&apos;accepte'
                style={{ background: 'var(--primary-500)' }}
                buttonStyle={{ color: 'var(--black)', fontSize: '14px', backgroundColor: 'var(--secondary-100)' }}
                expires={150}
            >
                Ce site utilise des cookies pour améliorer votre expérience utilisateur. En continuant à naviguer sur ce site, vous acceptez que leur utilisation.
            </CookieConsent>
            <Footer />
        </>
    )
}