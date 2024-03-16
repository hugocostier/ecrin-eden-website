import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import '../../assets/css/navbar.css'
import logo from '../../assets/images/logo.jpg'
import { useAuth } from '../../hooks/useAuth.hook'

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

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        profilePicture: ''
    })

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/clients/user/${auth.user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                const res = await response.json()

                if (res.data) {
                    setUserInfo({
                        firstName: res.data.first_name,
                        lastName: res.data.last_name,
                        profilePicture: res.data.profile_picture ? res.data.profile_picture : 'src/assets/images/default-profile-picture.png'
                    })
                } else {
                    throw new Error(res.message)
                }
            } catch (err) {
                console.error('Error getting user info :', err)
            }
        }

        (async () => {
            if (auth.user) {
                await getUserInfo()
            }
        })()
    }, [auth.user])

    // Manage the state of the menu
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const isOpen = isMenuOpen ? 'open' : ''

    const isDesktop = window.innerWidth >= 1024 ? 'desktop-version' : 'mobile-version'

    return (
        <>
            <header>
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
                                        to={'/user'}
                                        key={'user'}
                                        className={isMenuOpen ? 'appear user' : 'user'}
                                        style={{
                                            animationDelay: '0.1s'
                                        }}
                                    >
                                        <img id='user-picture' src={userInfo.profilePicture} alt='profile' />
                                        <span>{userInfo.firstName} {userInfo.lastName}</span>
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
            </header >
            <main className={`page ${isOpen}`}>
                <Outlet />
            </main>
        </>
    )
}