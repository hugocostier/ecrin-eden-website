import { library } from '@fortawesome/fontawesome-svg-core';
import { faApple, faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StyledComponents from 'styled-components';
import { RecoveryContext } from '../../context/passwordRecovery.context';
import { useAuth } from '../../hooks/useAuth.hook';

library.add(faFacebookF, faGoogle, faApple)

export const LoginForm = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const { setEmail, email, setOtp, setAccessFromLogin } = useContext(RecoveryContext)

    const navigateToOTP = () => {
        if (email) {
            const OTP = Math.floor(Math.random() * 9000 + 1000)
            setOtp(OTP)

            return new Promise((resolve, reject) => {
                fetch('http://localhost:3000/api/v1/auth/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        recipient_email: email,
                        otp: OTP
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        resolve(data)
                        navigate('/recover-password')
                    })
                    .catch(err => reject(err))
            })
        }

        return toast.error('Saisissez votre email', { containerId: 'action-status' })
    }

    const [rememberMe, setRememberMe] = useState(false)

    const [input, setInput] = useState({
        username: '',
        password: ''
    })

    const handleLogin = (e) => {
        e.preventDefault()

        if (input.username !== '' && input.password !== '') {
            auth.logIn({
                username: input.username,
                password: input.password,
                remember_me: rememberMe
            }, rememberMe)

            return
        }

        alert('Saisissez votre email et mot de passe')
    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))

        if (name === 'username') {
            setEmail(value)
        }
    }

    const checkInput = (input) => {
        if (input.value === '') {
            input.classList.add('incorrect')
        } else {
            input.classList.remove('incorrect')
        }
    }

    return (
        <FormContainer className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
                <h2>Connexion</h2>
                <div className="social-container">
                    <a href="" className="social">
                        <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                    </a>
                    <a href="" className="social">
                        <FontAwesomeIcon icon='fa-brands fa-google' />
                    </a>
                    <a href="" className="social">
                        <FontAwesomeIcon icon='fa-brands fa-apple' />
                    </a>
                </div>
                <span>ou utilise ton compte</span>
                <input
                    type="email"
                    name="username"
                    placeholder="Email"
                    required
                    autoComplete='username'
                    onChange={handleInput}
                    onBlur={(e) => checkInput(e.target)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    required
                    autoComplete='current-password'
                    onChange={handleInput}
                    onBlur={(e) => checkInput(e.target)}
                />
                <div className="remember-me">
                    <input
                        type="checkbox"
                        id="remember-me"
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor="remember-me">Se souvenir de moi</label>
                </div>
                <div
                    id='forgot-password'
                    onClick={() => {
                        setAccessFromLogin(true)
                        navigateToOTP()
                    }}
                >
                    Mot de passe oublié ?
                </div>
                <button>Se connecter</button>
            </form>
        </FormContainer>
    )
}

export const FormContainer = StyledComponents.section`
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;

    form {
        display: flex;
        flex-direction: column;
        padding: 0 50px;
        height: 100%;
        background: #fff;
        justify-content: center;
        align-items: center;
        text-align: center;

        input:not([type='checkbox']) {
            background: var(--grey-50);
            border: 1px solid transparent;
            border-radius: 5px;
            padding: 10px 15px;
            margin: 6px 0;
            width: 100%;
        }

        input:focus {
            outline-color: var(--secondary-500);
        }

        input.incorrect {
            border-color: var(--red-dark);
        }

        button {
            margin-top: 20px;
        }

        .social-container {
            margin: 20px 0 15px 0;

            a {
                border: 1px solid var(--grey-200);
                border-radius: 50%;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                margin: 0 5px;
                height: 40px;
                width: 40px;
            }
        }

        #forgot-password {
            text-decoration: underline; 
        }
    }

    &.sign-in-container {
        left: 0;
        z-index: 2;

        .remember-me {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin: 6px 0;

            input[type='checkbox'] {
                scale: 1.2;
            }

            label {
                font-size: 16px;
                margin-left: 10px;
            }
        }
    }

    &.register-container {
        left: 0;
        opacity: 0;
        z-index: 1;
    }

    @media screen and (max-width: 1023px) {
        grid-column: 1 / 2;
        grid-row: 1 / 2; 

        form {
            max-width: 400px;
            margin: 0 auto; 
            padding: 5vw; 

            .social-container {
                margin: 2vh 0 1.5vh 0; 
            }

            input:not([type='checkbox']) {
                margin: 1vh 0; 
            }

            button {
                margin-top: 2vh;
            }
        }

        &.sign-in-container {
            width: 100%;
        }
    
        &.register-container {
            width: 100%;
        }
    }

    @media screen and (min-width: 1024px) {
        form {
            justify-content: center; 
        }

        &.sign-in-container {
            width: 50%;
        }
    
        &.register-container {
            width: 50%;
        }
    }
`