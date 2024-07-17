import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import OtpInput from 'react-otp-input'
import { useLocation, useNavigate } from 'react-router-dom'
import StyledComponents from 'styled-components'
import { FormError } from '../../components/FormError'
import { RecoveryContext } from '../../context/passwordRecovery.context'
import { forgetPassword, verifyOTP } from '../../data/authentication.fetch'

export const RecoverPassword = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { email, otp } = useContext(RecoveryContext)

    const { handleSubmit, setValue, setError, clearErrors, trigger, formState: { errors } } = useForm()

    const [timerCount, setTimerCount] = useState(60)
    const [disable, setDisable] = useState(true)
    const [OTPInput, setOTPInput] = useState('')

    const resendOTP = async () => {
        if (disable) return

        return await forgetPassword(email, otp)
            .then(() => {
                setDisable(true)
                alert('Un nouveau code a été envoyé à votre adresse email')
                setTimerCount(60)
            })
    }

    const sendForm = async () => {
        let userEmail = ''
        if (state?.from === 'settings' && state?.email) {
            userEmail = state.email
        } else {
            userEmail = email
        }

        await verifyOTP(userEmail, OTPInput)
            .then((data) => {
                if (data.success) {
                    navigate('/reset-password', { state: { from: 'otp', email: userEmail, otp: OTPInput } })
                } else {
                    setError('otp', { message: 'Code de vérification invalide' })
                    trigger('otp')
                }
            })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimerCount((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval)

                if (lastTimerCount <= 1) {
                    setDisable(false)
                }

                if (lastTimerCount <= 0) {
                    return lastTimerCount
                }

                return lastTimerCount - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [disable])

    return (
        <>
            <RecoverPasswordPage>
                <section className='recover-password-container'>
                    <div className='header-container'>
                        <h2>Verification OTP</h2>
                        <p>Un code de vérification a été envoyé à l&apos;adresse {email}</p>
                    </div>

                    <OTPForm onSubmit={handleSubmit(sendForm)}>
                        <OtpInput
                            containerStyle='otp-input-container'
                            inputStyle='otp-input'
                            value={OTPInput}
                            numInputs={4}
                            placeholder='0000'
                            shouldAutoFocus
                            skipDefaultStyles
                            onChange={setOTPInput}
                            renderInput={(props) => <input {...props} />}
                        />
                        <FormError error={errors.otp} />

                        <button
                            type='submit'
                            className='btn btn-verify'
                            onClick={() => {
                                if (OTPInput.length < 4) {
                                    setError('otp', { message: 'Veuillez entrer un code valide' })
                                } else {
                                    clearErrors('otp')
                                    setValue('otp', OTPInput)
                                }
                            }}
                        >
                            Vérifier
                        </button>

                        <div className='resend-container'>
                            <p>Vous n&apos;avez pas reçu de code ?</p>
                            <a
                                className='btn-resend'
                                style={{
                                    color: disable ? 'gray' : 'var(--tertiary-500)',
                                    cursor: disable ? 'wait' : 'pointer'
                                }}
                                onClick={() => resendOTP()}
                            >
                                {disable ? `Renvoyer dans ${timerCount}s` : 'Renvoyer'}
                            </a>
                        </div>
                    </OTPForm>
                </section>
            </RecoverPasswordPage>
        </>
    )
}

const RecoverPasswordPage = StyledComponents.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .recover-password-container {
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
            font-size: 3rem;
            margin-bottom: 10px;
        }

        p {
            color: var(--grey-500);
            margin: 0; 
        }
    }
`

const OTPForm = StyledComponents.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .otp-input-container {
        display: flex; 
        justify-content: center; 
        margin-top: 20px; 
        margin-bottom: 4px; 

        .otp-input {
            width: 40px;
            height: 40px;
            text-align: center;
            font-size: 18px;
            margin: 0 5px;
            border: 1px solid var(--grey-500);
            border-radius: 4px;
            outline: none;
            transition: border-color 0.3s;

            &:focus {
                border-width: 2px;
                border-color: var(--secondary-500); 
                caret-color: transparent; 
            }
        }
    }

    .btn-verify { 
        background-color: var(--secondary-500);
        color: var(--white);
        border: none;
        border-radius: 4px;
        margin-bottom: .75rem; 
        padding: 10px 20px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: var(--secondary-300);
        }
    }

    .resend-container {
        p {
            margin: 6px 0; 
            font-size: 1.125rem;
            color: var(--grey-500);
            line-height: 1;
        }

        .btn-resend {
            transition: color 0.3s;

            &:hover {
                text-decoration: underline;
            }
        }
    }
`