// import logo from '../assets/logo.png';
import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <>
            <nav>
                {/* <img src='' alt='logo'/> */}
                <div className='nav-items'>
                    <Link to={'/'} className='item'>Accueil</Link>
                    <Link to={'/services'} className='item'>Prestations</Link>
                    <Link to={'/prices'} className='item'>Tarifs</Link>
                    <Link to={'/gift-cards'} className='item'>Cartes cadeau</Link>
                    <Link to={'/certification'} className='item'>Agrément</Link>
                    <Link to={'/contact'} className='item'>Contact</Link>
                    <Link to={'/login'} className='item login'>Connexion</Link>
                </div>
            </nav>
        </>
    )
}