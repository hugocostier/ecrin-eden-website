import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import StyledComponents from 'styled-components'
import { FormError } from '../../components/FormError'
import { RecoveryContext } from '../../context/passwordRecovery.context'

export const ResetPassword = () => {
    const navigate = useNavigate()
    const { email, otp } = useContext(RecoveryContext)

    const { register, handleSubmit, watch, trigger, setError, clearErrors, formState: { errors } } = useForm()

    const passwordMatch = () => {
        if (watch('password') !== watch('confirmPassword')) {
            setError('confirmPassword', { message: 'Les mots de passe ne correspondent pas' })
        } else {
            clearErrors('confirmPassword')
        }
    }

    const resetPassword = async (data) => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/v1/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp,
                    new_password: data.password
                })
            })
                .then(res => res.json())
                .then(data => {
                    resolve(data)
                    navigate('/login')
                })
                .catch(err => reject(err))
        })
    }

    return (
        <ResetPasswordPage>
            <section className='reset-password-container'>
                <div className='header-container'>
                    <h2>
                        Réinitialiser votre mot de passe
                    </h2>
                </div>
                <ResetForm onSubmit={handleSubmit(resetPassword)}>
                    <div className='input-container'>
                        <label htmlFor='password'>
                            Nouveau mot de passe
                        </label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='ex: Exempl1!'
                            autoComplete='none'
                            {...register('password', {
                                required: 'Veuillez saisir votre mot de passe',
                                minLength: { value: 8, message: 'Minimum 8 caractères' },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/,
                                    message: 'Au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
                                },
                                onChange: () => trigger('password')
                            })}
                        ></input>
                        <FormError error={errors.password} />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='confirm-password'>
                            Confirmer le mot de passe
                        </label>
                        <input
                            type='password'
                            name='confirmPassword'
                            id='confirm-password'
                            placeholder='••••••••'
                            autoComplete='none'
                            {...register('confirmPassword', {
                                required: 'Veuillez confirmer votre mot de passe',
                                onChange: () => passwordMatch()
                            })}
                        ></input>
                        <FormError error={errors.confirmPassword} />
                    </div>
                    <button
                        type='submit'
                        className='btn-reset-password'
                    >
                        Réinitialiser
                    </button>
                </ResetForm>
            </section>
        </ResetPasswordPage >
    )
}

const ResetPasswordPage = StyledComponents.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .reset-password-container {
        background-color: #ffffff;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
        align-self: center;
    }

    .header-container {
        h2 {
            margin-bottom: 30px;
        }

        p {
            color: var(--grey-500);
            margin: 0; 
        }
    }

    @media screen and (min-width: 1024px) {
        .header-container {
            h2 {
                font-size: 3rem;
            }
        }
    }
`

const ResetForm = StyledComponents.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .input-container {
        display: flex;
        flex-direction: column;
        width: 60%;

        label {
            text-align: left;
        }

        input {
            width: 100%;
            height: 40px;
            border: 1px solid var(--grey-500);
            border-radius: 4px;
            padding: 0 10px;
            font-size: 1rem;
            margin-bottom: 4px; 
        }

        .input-error-container {
            margin: 0;
        }
    }
    
    .btn-reset-password {
        background-color: var(--secondary-500);
        color: var(--white);
        border: none;
        border-radius: 4px;
        margin-top: 4px; 
        margin-bottom: .75rem; 
        padding: 10px 20px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: var(--secondary-300);
        }
    }
`