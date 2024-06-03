import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import StyledComponents from 'styled-components'
import logo from '../../assets/images/logo-black.png'

library.add(faFacebookF, faInstagram, faXTwitter, faLinkedinIn, faArrowUp)

const pages = [
    {
        name: 'Accueil',
        link: '/'
    },
    {
        name: 'Prestations',
        link: '/services'
    },
    {
        name: 'Tarifs',
        link: '/prices'
    },
    {
        name: 'Cartes cadeau',
        link: '/gift-cards'
    },
    {
        name: 'Agrément',
        link: '/certification'
    },
    {
        name: 'Contact',
        link: '/contact'
    }
]

export const Footer = () => {
    return (
        <>
            <FooterContainer>
                <FooterTop className='footer-top'>
                    <button className='btn-appointment'>
                        <Link to={'/appointment'}>Prendre rendez-vous</Link>
                    </button>

                    <div className='footer-info'>
                        <div className='column navigation'>
                            <h4>Navigation</h4>
                            <div className='nav-links'>
                                {pages.map((page, index) => (
                                    <Link to={page.link} key={index}>{page.name}</Link>
                                ))}
                            </div>
                        </div>

                        <div className='column contact'>
                            <h4>Contact</h4>
                            <p>
                                <a href='mailto:contact@ecrin-eden.com' id='footer-mail'>contact@ecrin-eden.com</a><br />
                                <a href='tel:0762067782' id='footer-phone' >07.62.06.77.82</a><br />
                                302 Route des Tronquisses, <br />
                                30960 Les Mages
                            </p>
                        </div>

                        <div className='column schedule'>
                            <h4>Horaires</h4>
                            <p>
                                Du Mercredi au Vendredi de 17h à 19h <br />
                                Le Samedi de 10h à 19h <br />
                                <span style={{ fontWeight: 'bold' }}>[Uniquement sur rendez-vous]</span>
                            </p>
                        </div>

                        <div className='column socials'>
                            <h4>Réseaux sociaux</h4>
                            <p>Suivez-moi sur les réseaux sociaux pour suivre les dernières actualités.</p>
                            <div className='socials-links'>
                                <a href='https://www.instagram.com/'>
                                    <FontAwesomeIcon icon='fa-brands fa-instagram' />
                                </a>
                                <a href='https://www.facebook.com/'>
                                    <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                                </a>
                                <a href='https://www.twitter.com/'>
                                    <FontAwesomeIcon icon='fa-brands fa-x-twitter' />
                                </a>
                                <a href='https://www.linkedin.com/'>
                                    <FontAwesomeIcon icon='fa-brands fa-linkedin-in' />
                                </a>
                            </div>
                        </div>

                        <div className='navigate'>
                            <button className='back-to-top'
                                onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    })
                                }}>
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='26' height='26' fill='currentColor' transform='rotate(-90)'><path d='m23.25 13.35-9.9 9.9-.7-.7 9-9H3.1v-1h18.59l-9-9 .7-.7 9.9 9.9a.48.48 0 0 1-.04.6Z'></path></svg>

                            </button>
                        </div>

                        <img src={logo} alt='logo' className='logo' />
                    </div>
                </FooterTop>
                <FooterBottom className='footer-bottom'>
                    <p className='copyright'>© 2024 Écrin d&apos;Eden</p>
                    <div className='legal'>
                        <Link to={'/contact'}>Contact</Link>
                        <Link to={'/legal-notice'}>Mentions légales</Link>
                        <Link to={'/privacy-policy'}>Politique de confidentialité</Link>
                        <Link to={'/cookies'}>Politique de cookies</Link>
                    </div>
                </FooterBottom>
            </FooterContainer>
        </>
    )
}

const FooterContainer = StyledComponents.footer`
    background: var(--white);
    padding-top: 60px;
    color: var(--black);
    margin-top: auto;

    .footer-top,
    .footer-bottom {
        margin: 0 4%;

        a {
            color: var(--black);
            cursor: pointer;
            line-height: 2em;
        }
    }

    @media screen and (min-width: 1024px) {
        margin: 0 4%;
    
        .footer-top,
        .footer-bottom {
            margin: 0 auto;
            max-width: 1440px;
        }
    }
`

const FooterTop = StyledComponents.section`
    display: grid;
    border-bottom: 1px solid #18181860;
    padding-bottom: 20px;

    &> .btn-appointment {
        height: 60px;
        background: var(--tertiary-500);
        border: none;
        border-radius: 30px;
        width: 90%;
        margin: 0 auto 40px auto;

        &:hover {
            background: var(--tertiary-500);
        }

        &> a {
            color: var(--white);
            font-size: 1em;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
    }

    .footer-info {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 40px;
        margin-bottom: 10px;
    }

    .column {
        display: flex;
        flex-direction: column;
        text-align: left;
        line-height: 1.4em;
    }

    h4 {
        margin: 0 0 20px;
        font-size: 1.25em;
    }

    p,
    a {
        margin: 0;
        font-size: 0.875em;
    }

    .navigation {
        grid-column: 1/2;
        grid-row: 1/2;
    }

    .navigation-items {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 10px;
        width: 100%;
    }

    .nav-links {
        display: flex;
        flex-direction: column;
    }

    .contact {
        grid-column: 1/4;
        grid-row: 2/3;

        #footer-mail,
        #footer-phone {
            font-size: inherit;
            line-height: inherit;
        }
    }

    .schedule {
        grid-column: 1/4;
        grid-row: 3/4;
    }

    .socials {
        grid-column: 1/4;
        grid-row: 4/5;

        & :is(p) {
            display: none;
        }
    }

    .socials-links {
        bottom: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
        height: 56px;

        &> a {
            font-size: 20px;
            color: var(--black);
            width: 36px;
            height: 36px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            border: 1px solid var(--black);
        }
    }

    .navigate {
        align-self: start;
        margin: 0 auto;
        grid-column: 3/4;
    }

    .back-to-top {
        background-color: var(--white);
        width: 70px;
        height: 70px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        border: 1px solid var(--black);
        cursor: pointer;
    }
    
    .logo {
        height: 100px;
        margin: 0 auto;
        grid-column: 2/3;
        grid-row: 1/2;
    }

    @media screen and (min-width: 640px) {
        .footer-info {
            grid-template-columns: 1fr 2fr 2fr;
            column-gap: 20px;
        }
    
        &> .btn-appointment {
            width: 70%;
            font-size: 1.25em;
        }
    
        .navigation {
            grid-column: 2/3;
            grid-row: 1/2;
        }
    
        .contact {
            grid-column: 3/4;
            grid-row: 1/2;
        }
    
        .schedule {
            grid-column: 2/3;
            grid-row: 2/3;
        }
    
        .socials {
            grid-column: 3/4;
            grid-row: 2/3;
        }
    
        .navigate {
            grid-column: 1/2;
            grid-row: 2/3;
            align-self: center;
        }
    
        .logo {
            grid-column: 1/2;
            grid-row: 1/2;
            margin: 0 auto;
            align-self: center;
        }
    
        .socials :is(p) {
            display: block;
        }
    }

    @media screen and (min-width: 1024px) {    
        &> .btn-appointment {
            width: 50%;
            font-size: 1.5em;
        }
    
        .footer-info {
            grid-template-columns: 100px 0.8fr 1fr 1fr 1fr;
            row-gap: 20px;
            margin: 0 auto 10px auto;
        }
    
        .navigation {
            grid-column: 2/3;
            grid-row: 1/3;
        }
    
        .contact {
            grid-column: 3/4;
            grid-row: 1/3;
        }
    
        .schedule {
            grid-column: 4/5;
            grid-row: 1/3;
        }
    
        .socials {
            grid-column: 5/6;
            grid-row: 1/3;
        }
    
        .navigate {
            grid-column: 1/2;
            grid-row: 2/3;
            align-self: center;
        }
    }

    @media screen and (min-width: 1200px) {
        .footer-info {
            grid-template-columns: 0.8fr 0.8fr 1fr 1fr 1fr;
        }
    
        .btn-appointment {
            width: 40%;
        }
    }
`

const FooterBottom = StyledComponents.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column-reverse;
    gap: 15px;
    padding: 20px 0;
    text-align: center;

    .legal,
    .copyright {
        font-size: 14px;
    }

    .legal > a:not(:last-of-type) {
        margin: 0 20px 0 0;
    }

    .legal > a,
    .copyright {
        white-space: nowrap;
        display: inline-block;
    }

    @media screen and (min-width: 640px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        gap: 20px;
        text-align: left;

        p {
            margin: 0;
        }
    }

    @media screen and (min-width: 1024px) {
        padding-top: 15px;
        padding-bottom: 15px;
    }
`