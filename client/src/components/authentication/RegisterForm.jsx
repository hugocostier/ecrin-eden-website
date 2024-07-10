import { library } from '@fortawesome/fontawesome-svg-core'
import { faApple, faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DOMPurify from 'dompurify'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth.hook'
import { FormError } from '../FormError'
import { FormContainer } from './LoginForm'

library.add(faFacebookF, faGoogle, faApple)

export const RegisterForm = () => {
    const auth = useAuth()

    const { register, handleSubmit, trigger, reset, formState: { errors } } = useForm()

    const handleRegister = async (data) => {
        const input = {
            last_name: DOMPurify.sanitize(data.last_name.toLowerCase().trim()),
            first_name: DOMPurify.sanitize(data.first_name.toLowerCase().trim()),
            email: DOMPurify.sanitize(data.email.trim()),
            password: DOMPurify.sanitize(data.password.trim())
        }

        auth.register(input)

        reset()
    }

    return (
        <FormContainer className='form-container register-container'>
            <form onSubmit={handleSubmit(handleRegister)} noValidate>
                <h2>Inscription</h2>
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
                <span>ou utilise ton email pour l&apos;inscription</span>
                <input
                    type='text'
                    name='last_name'
                    placeholder='Nom*'
                    autoComplete='family-name'
                    {...register('last_name', {
                        required: 'Veuillez saisir votre nom',
                        pattern: { value: /^[a-zA-ZÀ-ÿ\s-]+$/, message: 'Veuillez entrer un nom valide' },
                        minLength: { value: 2, message: 'Minimum 2 caractères' },
                        maxLength: { value: 50, message: '50 caractères maximum' },
                        onChange: () => trigger('last_name')
                    })}
                />
                <FormError error={errors.last_name} />
                <input
                    type='text'
                    name='first_name'
                    placeholder='Prénom*'
                    autoComplete='given-name'
                    {...register('first_name', {
                        required: 'Veuillez saisir votre prénom',
                        pattern: { value: /^[a-zA-ZÀ-ÿ\s-]+$/, message: 'Veuillez entrer un prénom valide' },
                        minLength: { value: 2, message: 'Minimum 2 caractères' },
                        maxLength: { value: 50, message: '50 caractères maximum' },
                        onChange: () => trigger('first_name')
                    })}
                />
                <FormError error={errors.first_name} />
                <input
                    type='email'
                    name='email'
                    placeholder='Email* (ex: adresse@mail.fr)'
                    autoComplete='email'
                    {...register('email', {
                        required: 'Veuillez saisir votre email',
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Veuillez entrer un email valide'
                        },
                        onChange: () => trigger('email')
                    })}
                />
                <FormError error={errors.email} />
                <input
                    type='password'
                    name='password'
                    placeholder='Mot de passe* (ex: Exempl1!)'
                    autoComplete='new-password'
                    {...register('password', {
                        required: 'Veuillez saisir votre mot de passe',
                        minLength: { value: 8, message: 'Minimum 8 caractères' },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/,
                            message: 'Au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
                        },
                        onChange: () => trigger('password')
                    })}
                />
                <FormError error={errors.password} />
                <button type='submit' id='register'>S&apos;inscrire</button>
            </form>
        </FormContainer>
    )
} 