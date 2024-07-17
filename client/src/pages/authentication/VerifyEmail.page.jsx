import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import StyledComponents from 'styled-components'
import { verifyEmail } from '../../data/authentication.fetch'

export const VerifyEmailPage = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const userInfo = {
            token: new URLSearchParams(window.location.search).get('token'),
            email: new URLSearchParams(window.location.search).get('email')
        }

        if (!userInfo.token || !userInfo.email) {
            setError('Code de vérification ou adresse email manquante')
            setLoading(false)
            return
        }

        verifyEmail(userInfo.token, userInfo.email)
            .then((success) => {
                setSuccess(success)
                setLoading(false)
            })
            .catch(() => {
                setError('Erreur lors de la vérification de l\'adresse email')
                setLoading(false)
            })
    }, [])

    const VerifyEmail = ({ text }) => {
        return (
            <section className='verify-email-container'>
                <h2>Vérification de votre email</h2>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="136" height="136" fill="currentColor"><path d="M16.1 3C16.0344 3.32311 16 3.65753 16 4C16 4.34247 16.0344 4.67689 16.1 5H4.51146L12.0619 11.662L17.1098 7.14141C17.5363 7.66888 18.0679 8.10787 18.6728 8.42652L12.0718 14.338L4 7.21594V19H20V8.89998C20.3231 8.96557 20.6575 9 21 9C21.3425 9 21.6769 8.96557 22 8.89998V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H16.1ZM21 1C22.6569 1 24 2.34315 24 4C24 5.65685 22.6569 7 21 7C19.3431 7 18 5.65685 18 4C18 2.34315 19.3431 1 21 1Z"></path></svg>
                <p
                    style={loading
                        ? { color: 'var(--grey-500)' }
                        : error
                            ? { color: 'var(--red-dark)' }
                            : success
                                ? { color: 'var(--green-dark)' }
                                : { color: 'var(--red-dark)' }}
                >
                    {text}

                </p>
            </section>
        )
    }

    VerifyEmail.propTypes = {
        text: PropTypes.string.isRequired,
    }


    if (error) return (
        <VerifyEmailContainer>
            <VerifyEmail text={error} />
        </VerifyEmailContainer>
    )

    if (loading) return (
        <VerifyEmailContainer>
            <VerifyEmail text='Vérification en cours...' />
        </VerifyEmailContainer>
    )

    return (
        <VerifyEmailContainer>
            <VerifyEmail
                text={success
                    ? 'Adresse email vérifiée ! Vous pouvez fermer cette page et vous connecter à votre compte.'
                    : 'Erreur lors de la vérification de l\'adresse email'
                }
            />
        </VerifyEmailContainer>
    )
}

const VerifyEmailContainer = StyledComponents.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .verify-email-container {
        background-color: #ffffff;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
        align-self: center;
        
        h2 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }

        svg {
            margin: 30px 0 15px 0;
        }

        p {
            color: var(--grey-500);
            margin: 0; 
            height: 50px; 
        }
    }
`