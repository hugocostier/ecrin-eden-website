import { certificationLoader } from '../../data/store-front/certification.loader'
import { contactLoader } from '../../data/store-front/contact.loader'
import { giftCardLoader } from '../../data/store-front/giftcard.loader'
import { homeLoader } from '../../data/store-front/home.loader'
import { priceLoader } from '../../data/store-front/price.loader'
import { serviceLoader } from '../../data/store-front/service.loader'

export const storeFrontPages = [
    {
        id: 1,
        displayedName: 'Accueil',
        name: 'home',
        link: '/',
        loader: homeLoader
    },
    {
        id: 2,
        displayedName: 'Prestations',
        name: 'services',
        link: '/services',
        loader: serviceLoader
    },
    {
        id: 3,
        displayedName: 'Tarifs',
        name: 'prices',
        link: '/prices',
        loader: priceLoader
    },
    {
        id: 4,
        displayedName: 'Cartes cadeau',
        name: 'gift-cards',
        link: '/gift-cards',
        loader: giftCardLoader
    },
    {
        id: 5,
        displayedName: 'FFMBE',
        name: 'certifications',
        link: '/certification',
        loader: certificationLoader
    },
    {
        id: 6,
        displayedName: 'Contact',
        name: 'contact',
        link: '/contact',
        loader: contactLoader
    }
]