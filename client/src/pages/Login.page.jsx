import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import StyledComponents from 'styled-components';
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
        <LoginPageContainer className='login-page'>
            <BackHomeSection className="back-home">
                <Link to='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19ZM8 15H16V17H8V15Z"></path></svg>
                </Link>
            </BackHomeSection>

            <ContainerSection className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
                <RegisterForm />

                <LoginForm />

                <OverlayPanel onSignInClick={handleSignInClick} onSignUpClick={handleSignUpClick} />
            </ContainerSection>
        </LoginPageContainer>
    )
}

const LoginPageContainer = StyledComponents.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    
    @media screen and (max-width: 1023px) {
        flex-direction: row;
    }
    
    @media screen and (min-width: 1024px) {
        margin-top: -20px;
        flex-direction: column;
    }
`

const BackHomeSection = StyledComponents.section`
    @media screen and (max-width: 1023px) {
        display: none; 
    }

    @media screen and (min-width: 1024px) {
        position: absolute;
        top: 30px;
        left: 30px;
        line-height: 0;
        transition: color 0.3s ease;
    
        a {
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--grey-700);
            border: 2px solid var(--grey-700);
            border-radius: 50%;
            height: 60px;
            width: 60px;
            
            &:hover {
                color: var(--black);
                border-color: var(--black);
                box-shadow: var(--shadow-2);
                transition: all 0.3s ease;
            }
        }
    }
`

const ContainerSection = StyledComponents.section`
    background: #fff;
    border-radius: 10px;
    box-shadow: var(--shadow-5);
    position: relative;
    overflow: hidden;
    max-width: 100%;
    min-height: 500px;

    h2 {
        font-size: 40px;
        margin: 0;
    }

    p {
        line-height: 20px;
        letter-spacing: 0.5px;
        margin: 20px 0 30px;
    }

    span {
        font-size: 14px;
    }

    a {
        color: var(--black);
    }

    button {
        border-radius: 30px;
        border: 1px solid var(--secondary-500);
        background: var(--secondary-500);
        color: var(--white);
        font-size: 16px;
        font-weight: bold;
        padding: 12px 45px;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: transform 80ms ease-in;
   
        &:active {
            transform: scale(0.95);
        }
    
        &:focus {
            outline: none;
        }
    }

    @media screen and (max-width: 1023px) {
        display: grid; 
        grid-template-columns: 1fr;
        grid-template-rows: 0.65fr 0.35fr;
        width: 90vw; 
        height: 95vh; 

        &.right-panel-active {
            grid-template-rows: 0.35fr 0.65fr;
            transition: all 0.6s ease-in-out;

            .form-container {
                grid-column: 1 / 2;
                grid-row: 2 / 3; 
                transition: all 0.6s ease-in-out;

                /* Move sign in to the bottom */
                &.sign-in-container {
                    transform: translateY(100%);
                    opacity: 0;
                }

                /* Bring sign up over sign in */
                &.register-container {
                    opacity: 1;
                    z-index: 5;
                }
            }

            .overlay-container {
                grid-column: 1 / 2;
                grid-row: 1 / 2; 
                transition: all 0.6s ease-in-out;

                .overlay-right {
                    transform: translateY(-100%);
                }
            }
        }
    }
    
    @media screen and (min-width: 1024px) {
        width: 768px;
        max-width: 100%;
        min-height: 500px;

        h2 {
            font-size: 50px;
        }

        &.right-panel-active {
            .form-container {
                /* Move sign in to the right */
                &.sign-in-container {
                    transform: translateX(100%);
                    opacity: 0;
                }
    
                /* Bring sign up over sign in */
                &.register-container {
                    transform: translateX(100%);
                    opacity: 1;
                    z-index: 5;
                }
            }
    
            /* Move overlay to the left */
            .overlay-container {
                transform: translateX(-100%);
    
                /* Move overlay back to the right */
                .overlay {
                    transform: translateX(50%);
    
                    /* Bring sign in back to center */
                    .overlay-left {
                        transform: translateX(0);
                    }
    
                    /* Move overlay back to the left */
                    .overlay-right {
                        transform: translateX(20%);
                    }
                }
            }
        }
    }
`