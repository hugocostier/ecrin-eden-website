import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import StyledComponents, { keyframes } from 'styled-components'
import defaultPicture from "../../assets/images/default-profile-picture.png"
import logo from '../../assets/images/logo-white.png'
import burger from '../../assets/images/svg/burger.svg'
import close from '../../assets/images/svg/close.svg'
import { useAuth } from '../../hooks/useAuth.hook'
import { useClientInfo } from '../../hooks/useClientInfo.hook'

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
        name: 'FFMBE',
        link: '/certification'
    },
    {
        name: 'Contact',
        link: '/contact'
    }
]

export const Navbar = () => {
    // Manage the state of the user
    const auth = useAuth()
    const client = useClientInfo()

    const account = auth?.user?.role === 'admin' ? '/admin' : '/user'

    // Manage the state of the menu
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const isOpen = isMenuOpen ? 'open' : ''

    const isDesktop = window.innerWidth >= 1024 ? 'desktop-version' : 'mobile-version'

    return (
        <>
            <NavbarContainer>
                <div className={`nav-bar ${isOpen}`}>
                    <Link to={'/'} key={'logo-accueil'} className='logo-nav'>
                        <img src={logo} alt='logo' />
                    </Link>

                    <button className={`burger ${isOpen}`} onClick={toggleMenu}></button>
                </div>

                <section className={`${isDesktop} ${isOpen}`}>
                    <div className={`background ${isOpen}`}></div>

                    <div className={`menu ${isOpen}`}>
                        <nav>
                            {auth.user ? (
                                <div className='logged-user'>
                                    <Link
                                        to={account}
                                        key={'user'}
                                        className={isMenuOpen ? 'appear user' : 'user'}
                                        style={{
                                            animationDelay: '0.1s'
                                        }}
                                    >
                                        <img id='user-picture' src={client.profilePicture ? `${import.meta.env.VITE_APP_SERVER_URL}/${client.profilePicture}` : defaultPicture} alt='profile' />
                                        <span>{client.firstName} {client.lastName}</span>
                                    </Link>
                                    <button
                                        onClick={() => auth.logOut()}
                                        className={isMenuOpen ? 'appear logout' : 'logout'}
                                        style={{
                                            animationDelay: '0.2s'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path></svg>
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to={'/login'}
                                    key={'login'}
                                    className={isMenuOpen ? 'appear login' : 'login'}
                                    style={{
                                        animationDelay: '0.1s'
                                    }}
                                    onClick={() => toggleMenu()}
                                >
                                    <svg data-bbox="0 0 50 50" data-type="shape" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50"><g><path fill='#fafafa' d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path></g></svg>
                                    Connexion
                                </Link>
                            )}

                            {pages.map((page, index) => (
                                <NavLink
                                    to={page.link}
                                    key={page.link}
                                    className={isMenuOpen ? 'appear' : ''}
                                    style={{
                                        animationDelay: `0.${index + 2}s`
                                    }}
                                    onClick={() => toggleMenu()}
                                >
                                    {page.name}
                                </NavLink>
                            ))}
                        </nav>

                        <button
                            className={`burger ${isOpen} ${isDesktop}`}
                            onClick={toggleMenu}
                            style={{
                                animationDelay: `1.6s`
                            }}>
                        </button>
                    </div>
                </section >
            </NavbarContainer >
            <main className={`page ${isOpen}`}>
                <Outlet />
            </main>
        </>
    )
}

const appearMobile = keyframes`
    0% {
        opacity: 0;
        translate: 0 30px;
    }
    100% {
        opacity: 1;
    }
`

const appearDesktop = keyframes`
    0% {
        translate: -100vw 0;
    }
    100% {
        translate: 0 0;
        transition: ease-in-out;
    }
`

const menu_in = keyframes`
    0% {
        clip-path: ellipse(60% 60% at 0% 50%);
    }
    100% {
        clip-path: ellipse(120% 120% at 0% 50%);
    }
`

const NavbarContainer = StyledComponents.header`
    width: 100%;
    height: 80px;

    .nav-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 80px;
        top: 0;
        left: 0;
        background: var(--primary-500);
        box-shadow: var(--shadow-3);
        transition: 0.3s;

        .logo-nav {
            width: 70px;
            margin-left: 20px;
            cursor: pointer;
            line-height: 0;

            img {
                width: 100%;
                object-fit: cover;
            }
        }

        &.open > .logo-nav {
            visibility: hidden;
        }
    }

    button {
        border: 0;
        padding: 0;
        background: transparent;
        cursor: pointer;

        &.burger,
        &.burger.desktop-version {
            z-index: 4;
            margin-right: 20px;
            display: grid;
            place-items: center;
            width: 40px;
            height: 40px;
            background-image: url(${burger});
            background-repeat: no-repeat;
            background-position: center;

            &.open,
            &.open.desktop-version {
                color: var(--white);
                background-image: url(${close});
            }
        }
    }

    .menu {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        width: 100%;

        nav {
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover > a {
                opacity: 0.25;
            }

            &> a:hover { 
                opacity: 1;
            }
        }

        &.open {
            opacity: 1;
            visibility: visible;

            a {
                opacity: 1;
            }
        }

        a {
            position: relative;
            color: var(--white);
            padding: 12px 0;
            text-decoration: none;
            text-transform: capitalize;
            opacity: 0;
            cursor: pointer;
            transition: 0.4s;

            &::before,
            &::after {
                transition: 0.4s;
            }

            &:not(:first-of-type)::before,
            &:not(:first-of-type)::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 10px;
                width: 100%;
                height: 2px;
                border-radius: 2px;
            }

            &::before {
                opacity: 0;
                background: #fafafa33;
            }

            &::after {
                transform: scaleX(0);
                transform-origin: 0% 50%;
                background: var(--white);
            }

            &:hover::before {
                opacity: 1;
            }
            
            &:hover::after {
                transform: scaleX(1);
            }
        }

        .login,
        .logged-user {
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            padding: 0;
        }
    }

    a.active {
        color: var(--primary-500);
        font-weight: bold;
    }

    #user-picture {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
    }

    .user {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .logout {
        width: 26px;
        height: 26px;
        color: var(--red-light);
        cursor: pointer;
        
        &:hover {
            color: var(--red-dark);
        }
    }

    @media screen and (max-width: 1023px) {
        .nav-bar {
            &:not(.open) > .logo-nav {
                z-index: 3;
            }
            
            &.open {
                background-color: var(--background-color);
            }
        }
    
        .burger {
            &.mobile-version,
            &.desktop-version {
                display: none;
            }
        }
    
        .background {
            position: fixed;
            z-index: 2;
            top: 44px;
            left: 44px;
            aspect-ratio: 1/1;
            translate: -50% -50%;
            height: 88px;
            background: var(--black);
            border-radius: 50%;
            opacity: 0;
            transition: 0.6s;

            &.open {
                height: 400vh;
                opacity: 0.95;
            }
        }
    
        .menu {
            z-index: 3;
            height: 100%;
            opacity: 0;
            visibility: hidden;
            transition: 0.05s;

            nav {
                flex-direction: column;
                margin: 0 auto;
            }

            a {
                font-size: 1.75em;
            }

            .login,
            .logged-user {
                position: absolute;
                top: calc((80px / 2) - (42px / 2));
                left: 30px;
            }

            .login {
                font-size: 1.5em;
            }
        }
    
        .logged-user span {
            font-size: 24px;
        }
    
        .logout {
            margin-left: 20px;
        }
    
        .login > svg {
            margin-right: 15px;
        }
    
        .appear {
            animation: ${appearMobile} 0.35s backwards;

            &.user {
                padding: 0;
            }
        }
    
        .page {
            transition: 0.6s;
            
            &.open {
                filter: blur(10px);
            }
        }
    }

    @media screen and (min-width: 1024px) {
        .nav-bar {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 2;
        }
    
        .burger {
            &.open:not(.desktop-version) {
                display: none;
            }

            &.open.desktop-version {
                right: 0px;
            }
        }
    
        .background,
        .background.open {
            display: none;
        }
    
        .desktop-version {
            width: 100%;
            height: 80px;
            
            &.open:not(.burger) {
                position: fixed;
                background-color: var(--grey-900);
                z-index: 3;
                animation: ${appearDesktop} 1s;
            }
        }
    
        .menu {
            height: 80px;
            background: var(--grey-900);
            translate: -100% 0;
            transition: translate 1s cubic-bezier(0.175, 0.885, 0.32, 1);

            &.open {
                translate: 0;
                animation: ${menu_in} 0.5s;
            }

            nav {
                flex-direction: row;
                justify-content: left;
                width: 100%;
            }

            a {
                font-size: 1.175em;
                margin: 0 20px;
            }
            
            .login,
            .logged-user {
                position: absolute;
                top: calc((80px / 2) - (32.89px / 2));
                right: calc(60px + 2%);
                font-size: 1.175em;
            }

            .logged-user {
                top: auto;
            }
        }
    
        .login > svg {
            margin-right: 15px;
        }
    }
`