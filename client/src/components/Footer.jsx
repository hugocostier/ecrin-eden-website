import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom"
import '../assets/css/footer.css'
import logo from '../assets/images/logo.jpg'

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
            <footer>
                <section className='footer-top'>
                    <button className='btn-appointment'>
                        <Link to={'/schedule-appointment'}>Prendre rendez-vous</Link>
                    </button>

                    <div className="footer-info">
                        <div className="column navigation">
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
                                contact@ecrin-eden.com <br />
                                07.62.06.77.82 <br />
                                302 Route des Tronquisses, <br /> 
                                30960 Les Mages
                            </p>
                        </div>

                        <div className='column schedule'>
                            <h4>Horaires</h4>
                            <p>
                                Du Mercredi au Vendredi de 17h à 19h <br />
                                Le Samedi de 10h à 19h <br />
                                <span style={{fontWeight: 'bold'}}>[Uniquement sur rendez-vous]</span>
                            </p>
                        </div>

                        <div className='column socials'>
                            <h4>Réseaux sociaux</h4>
                            <p>Suivez-moi sur les réseaux sociaux pour suivre les dernières actualités.</p>
                            <div className="socials-links">
                                <a href="https://www.instagram.com/">
                                    <FontAwesomeIcon icon='fa-brands fa-instagram' />
                                </a>
                                <a href="https://www.facebook.com/">
                                    <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                                </a>
                                <a href="https://www.twitter.com/">
                                    <FontAwesomeIcon icon='fa-brands fa-x-twitter' />
                                </a>
                                <a href="https://www.linkedin.com/">
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="currentColor" transform='rotate(-90)'><path d="m23.25 13.35-9.9 9.9-.7-.7 9-9H3.1v-1h18.59l-9-9 .7-.7 9.9 9.9a.48.48 0 0 1-.04.6Z"></path></svg>
                                
                            </button>
                        </div>

                        <img src={logo} alt='logo' className='logo'/>
                    </div>
                </section>
                <section className="footer-bottom">
                    <p className="copyright">© 2024 Écrin d&apos;Eden</p>
                    <div className="legal">
                        <Link to={'/contact'}>Contact</Link>
                        <Link to={'/legal-notice'}>Mentions légales</Link>
                        <Link to={'/privacy-policy'}>Politique de confidentialité</Link>
                        <Link to={'/cookies'}>Politique de cookies</Link>
                    </div>
                </section>
            </footer>
        </>
    )
}