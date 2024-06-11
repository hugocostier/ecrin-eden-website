import { certificationLoader, contactLoader, giftCardLoader, homeLoader, priceLoader, serviceLoader } from '../../data'

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
        name: 'certification',
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