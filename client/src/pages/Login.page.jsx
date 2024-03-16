import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../assets/css/store-front/Login.page.css';
import { LoginForm, OverlayPanel, RegisterForm } from '../components';
import { useAuth } from '../hooks/useAuth.hook';

export const LoginRegisterPage = () => {
    const user = useAuth()

    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
    }

    const handleSignInClick = () => {
        setIsSignUpActive(false);
    }

    if (user.loggedIn) {
        return <Navigate to='/user' replace />
    }

    return (
        <main className='login-page'>
            <section className="back-home">
                <a href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19ZM8 15H16V17H8V15Z"></path></svg>
                </a>
            </section>

            <section className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
                <RegisterForm />

                <LoginForm />

                <OverlayPanel onSignInClick={handleSignInClick} onSignUpClick={handleSignUpClick} />
            </section>
        </main>
    )
}