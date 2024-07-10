import { library } from '@fortawesome/fontawesome-svg-core'
import { faApple, faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DOMPurify from 'dompurify'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import { RecoveryContext } from '../../context/passwordRecovery.context'
import { forgetPassword } from '../../data/authentication.fetch'
import { useAuth } from '../../hooks/useAuth.hook'
import { FormError } from '../FormError'

library.add(faFacebookF, faGoogle, faApple)

export const LoginForm = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm()
    const rememberMe = watch('remember_me')

    const { setEmail, email, setOtp, setAccessFromLogin } = useContext(RecoveryContext)

    const navigateToOTP = async () => {
        setEmail(watch('username'))
        setAccessFromLogin(true)

        if (email) {
            const OTP = Math.floor(Math.random() * 9000 + 1000)
            setOtp(OTP)

            return await forgetPassword(email, OTP)
                .then(() => {
                    navigate('/recover-password')
                })
        }

        return toast.error('Saisissez votre email', { containerId: 'action-status' })
    }

    const handleLogin = async (data) => {
        const input = {
            username: DOMPurify.sanitize(data.username.trim()),
            password: DOMPurify.sanitize(data.password.trim()),
            remember_me: rememberMe
        }

        auth.logIn(input, rememberMe)
    }

    return (
        <FormContainer className='form-container sign-in-container'>
            <form onSubmit={handleSubmit(handleLogin)} noValidate>
                <h2>Connexion</h2>
                <div className='social-container'>
                    <a href='' className='social'>
                        <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                    </a>
                    <a href='' className='social'>
                        <FontAwesomeIcon icon='fa-brands fa-google' />
                    </a>
                    <a href='' className='social'>
                        <FontAwesomeIcon icon='fa-brands fa-apple' />
                    </a>
                </div>
                <span>ou utilise ton compte</span>
                <input
                    type='email'
                    name='username'
                    placeholder='Email'
                    autoComplete='username'
                    {...register('username', {
                        required: 'Veuillez entrer votre email',
                        pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Veuillez entrer un email valide' },
                        onChange: () => trigger('username')
                    })}
                />
                <FormError error={errors.username} />
                <input
                    type='password'
                    name='password'
                    placeholder='Mot de passe'
                    autoComplete='current-password'
                    {...register('password', {
                        required: 'Veuillez entrer votre mot de passe',
                        onChange: () => trigger('password')
                    })}
                />
                <FormError error={errors.password} />
                <div className='remember-me'>
                    <input
                        type='checkbox'
                        id='remember-me'
                        {...register('remember_me')}
                    />
                    <label htmlFor='remember-me'>Se souvenir de moi</label>
                </div>
                <div
                    id='forgot-password'
                    onClick={() => navigateToOTP()}
                >
                    Mot de passe oublié ?
                </div>
                <button id='login'>Se connecter</button>
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
            margin-top: 6px;
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

        input {    
            margin-bottom: 0; 

            &:not(:first-of-type) {
                margin-top: 0; 
            }
        }

        .input-error-container {
            margin: 0; 
        }

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

        #forgot-password, #login {
            cursor: pointer; 
        }
    }

    &.register-container {
        left: 0;
        opacity: 0;
        z-index: 1;

        #register {
            margin: 0; 
            cursor: pointer;
        }

        input {    
            margin-bottom: 0; 

            &:not(:first-of-type) {
                margin-top: 0; 
            }
        }

        .input-error-container {
            margin: 0; 
        }
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