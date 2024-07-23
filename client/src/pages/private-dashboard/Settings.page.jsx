import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents, { keyframes } from 'styled-components'
import { FormError } from '../../components/FormError'
import { deletePersonalInfo } from '../../data/admin/clients.fetch'
import { deleteAccount, forgetPassword, updateEmail, updatePassword } from '../../data/authentication.fetch'
import { useAuth } from '../../hooks/useAuth.hook'
import { useClientInfo } from '../../hooks/useClientInfo.hook'

export const SettingsPage = () => {
    const auth = useAuth()
    const client = useClientInfo()
    const navigate = useNavigate()

    const {
        register: registerEmail,
        trigger: triggerEmail,
        handleSubmit: handleSubmitEmail,
        formState: { errors: errorsEmail }
    } = useForm()

    const {
        register: registerPassword,
        watch: watchPassword,
        trigger: triggerPassword,
        handleSubmit: handleSubmitPassword,
        setError: setErrorPassword,
        clearErrors: clearErrorsPassword,
        formState: { errors: errorsPassword }
    } = useForm()

    const {
        register: registerDeleteAccount,
        trigger: triggerDeleteAccount,
        handleSubmit: handleSubmitDeleteAccount,
        formState: { errors: errorsDeleteAccount }
    } = useForm()

    const navigateToOTP = async () => {
        const email = auth.user.username

        if (email) {
            const OTP = Math.floor(Math.random() * 9000 + 1000)

            return await forgetPassword(email, OTP)
        }
    }

    const passwordMatch = () => {
        if (watchPassword('newPassword') !== watchPassword('confirmNewPassword')) {
            setErrorPassword('confirmPassword', { message: 'Les mots de passe ne correspondent pas' })
        } else {
            clearErrorsPassword('confirmPassword')
        }
    }

    const openModal = (modalName) => {
        const modal = document.querySelector(modalName)

        modal.style.display = 'block'
    }

    const closeModal = (modalName) => {
        const modal = document.querySelector(modalName)

        modal.style.display = 'none'
    }

    window.onclick = (event) => {
        if (event.target.className.includes('modal')) {
            const modal = document.querySelector(`.${event.target.className}`)

            if (event.target === modal) {
                modal.style.display = 'none'
            }
        }
    }

    const [showPassword, setShowPassword] = useState(false)
    const togglePassword = () => {
        let passwordFields

        switch (showPassword) {
            case true:
                passwordFields = document.querySelectorAll('input[type="text"]')
                passwordFields.forEach(field => {
                    field.type = field.type === 'text' ? 'password' : 'text'
                })
                break
            case false:
                passwordFields = document.querySelectorAll('input[type="password"]')
                passwordFields.forEach(field => {
                    field.type = field.type === 'password' ? 'text' : 'password'
                })
                break
            default:
                break
        }

        setShowPassword(!showPassword)
    }

    const emailUpdate = (data) => {
        closeModal()
        toast.promise(updateEmail(auth.user.username, data), {
            pending: 'Mise à jour en cours...',
            success: 'Adresse email mise à jour avec succès',
            error: 'Erreur lors de la mise à jour de l\'adresse email'
        }, { containerId: 'notification' })
            .then(() => {
                navigate('/')
                auth.logOut()
            })
    }

    const modifyPassword = (data) => {
        toast.promise(updatePassword(data), {
            pending: 'Mise à jour en cours...',
            success: 'Mot de passe mis à jour avec succès',
            error: 'Erreur lors de la mise à jour du mot de passe'
        }, { containerId: 'notification' })
            .then(() => {
                navigate('/')
                auth.logOut()
            })
    }

    const handleDeletePersonalInfo = () => {
        const confirmDelete = window.confirm('Êtes vous sur de vouloir supprimer vos données personnelles ?')

        if (confirmDelete) {
            toast.promise(deletePersonalInfo(client.id), {
                pending: 'Suppression en cours...',
                success: 'Données personnelles supprimées avec succès',
                error: 'Erreur lors de la suppression des données personnelles'
            }, { containerId: 'notification' })
        }

        return
    }

    const handleDeleteAccount = (data) => {
        toast.promise(deleteAccount(data), {
            pending: 'Suppression en cours...',
            success: 'Compte supprimé avec succès',
            error: 'Erreur lors de la suppression du compte'
        }, { containerId: 'notification' })
            .then(() => {
                navigate('/')
                auth.logOut()
            })
    }

    return (
        <SettingsContainer>
            <h2>Paramètres du compte</h2>

            <section className='email-container'>
                <h3>Adresse email</h3>
                <div className='email-current'>
                    <p>Votre adresse email est <strong>{auth.user.username}</strong></p>
                    <button onClick={() => openModal('.email-modal')}>Modifier</button> {/* Opens a modal */}
                </div>
                <div className='email-modal'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4>Modifier l&apos;adresse email</h4>
                            <span className='close-modal' onClick={() => closeModal('.email-modal')}>&times;</span>
                        </div>
                        <div className='modal-body'>
                            <form className='email-reset-form' onSubmit={handleSubmitEmail(emailUpdate)}>
                                <div className='input-container' name='newEmail'>
                                    <label htmlFor='new-email'>Nouvelle adresse email</label>
                                    <input
                                        type='email'
                                        name='newEmail'
                                        id='new-email'
                                        placeholder='ex: adresse@mail.fr'
                                        autoComplete='email'
                                        {...registerEmail('newEmail', {
                                            required: 'Veuillez saisir votre adresse email',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                                message: 'Adresse email invalide'
                                            },
                                            onChange: () => triggerEmail('newEmail')
                                        })}
                                    />
                                    <FormError error={errorsEmail.newEmail} />
                                </div>
                                <div className='input-container' name='confirmEmail'>
                                    <label htmlFor='confirm-new-email'>Confirmer la nouvelle adresse email</label>
                                    <input
                                        type='email'
                                        name='confirmNewEmail'
                                        id='confirm-new-email'
                                        {...registerEmail('confirmNewEmail', {

                                            required: 'Veuillez confirmer votre adresse email',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                                message: 'Adresse email invalide'
                                            },
                                            onChange: () => triggerEmail('confirmNewEmail')
                                        })}
                                    />
                                    <FormError error={errorsEmail.confirmNewEmail} />
                                </div>
                                <button type='submit'>Sauvegarder</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className='password-container'>
                <div className='password-header'>
                    <h3>Mot de passe</h3>
                    <button onClick={togglePassword} className='show-password'>{showPassword ? 'Cacher' : 'Voir'}</button>
                </div>
                <form onSubmit={handleSubmitPassword(modifyPassword)}>
                    <input
                        type='text'
                        name='username'
                        value={auth.user.username}
                        autoComplete='off'
                        readOnly
                        hidden
                        {...registerPassword('username')}
                    />
                    <div className='previous-password'>
                        <label htmlFor='current-password'>Ancien mot de passe</label>
                        <input
                            type='password'
                            name='currentPassword'
                            placeholder='••••••••'
                            autoComplete='current-password'
                            id='current-password'
                            {...registerPassword('currentPassword', {
                                required: 'Veuillez saisir votre mot de passe',
                                minLength: { value: 8, message: 'Minimum 8 caractères' },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/,
                                    message: 'Au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
                                },
                                onChange: () => triggerPassword('currentPassword')
                            })}
                        />
                        <FormError error={errorsPassword.currentPassword} />
                    </div>
                    <div className='new-password'>
                        <label htmlFor='new-password'>Nouveau mot de passe</label>
                        <input
                            type='password'
                            name='newPassword'
                            placeholder='ex: Exempl1!'
                            autoComplete='off'
                            id='new-password'
                            {...registerPassword('newPassword', {
                                required: 'Veuillez saisir votre nouveau mot de passe',
                                minLength: { value: 8, message: 'Minimum 8 caractères' },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/,
                                    message: 'Au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
                                },
                                onChange: () => triggerPassword('newPassword')
                            })}
                        />
                        <FormError error={errorsPassword.newPassword} />
                    </div>
                    <div className='new-password'>
                        <label htmlFor='confirm-new-password'>Confirmer mot de passe</label>
                        <input
                            type='password'
                            name='confirmNewPassword'
                            placeholder='••••••••'
                            autoComplete='off'
                            id='confirm-new-password'
                            {...registerPassword('confirmNewPassword', {
                                required: 'Veuillez confirmer votre nouveau mot de passe',
                                onChange: () => passwordMatch()
                            })}
                        />
                        <FormError error={errorsPassword.confirmNewPassword} />
                    </div>
                    <div className='forget-password'>
                        <p>Vous avez oublié votre mot de passe ?</p>
                        <Link to='/recover-password' state={{ from: 'settings', email: auth.user.username }}>
                            <button
                                id='forgot-password'
                                onClick={() => navigateToOTP()}
                            >
                                Réinitialiser le mot de passe
                            </button>
                        </Link>
                    </div>
                    <button type='submit' className='save'>Sauvegarder le nouveau mot de passe</button>
                </form>
            </section>

            <section className='delete-container'>
                <h3>Supprimer les données personnelles</h3>
                <p>
                    Voulez-vous supprimer vos données personnelles ?<br />
                    Celles-ci incluent votre adresse postale, votre numéro de téléphone, votre date de naissance, vos préférences et vos notes personnelles.<br />
                    Elles sont utilisées pour vous fournir un service personnalisé et ne sont pas partagées avec des tiers.
                </p>
                <p className='irreversible'>Attention, cette action est irréversible !</p>
                <button onClick={handleDeletePersonalInfo}>Oui, je veux supprimer mes données personnelles</button>
            </section>

            <section className='delete-container'>
                <h3>Supprimer le compte</h3>
                <p>
                    Voulez-vous supprimer votre compte ?<br />
                    Vous perdrez l&apos;accès à votre compte et à vos données personnelles et devrez recréer un compte si vous souhaitez utiliser nos services à nouveau.
                </p>
                <p className='irreversible'>
                    Attention, cette action est irréversible !
                </p>
                <button onClick={() => openModal('.account-modal')}>Oui, je veux supprimer mon compte</button>
                <div className='account-modal'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4>Supprimer mon compte</h4>
                            <span className='close-modal' onClick={() => closeModal('.account-modal')}>&times;</span>
                        </div>
                        <div className='modal-body'>
                            <form className='delete-account-form' onSubmit={handleSubmitDeleteAccount(handleDeleteAccount)}>
                                <div className='input-container' name='accountEmail'>
                                    <label htmlFor='account-email'>Adresse email</label>
                                    <input
                                        type='email'
                                        name='accountEmail'
                                        id='account-email'
                                        placeholder='ex: adresse@mail.fr'
                                        autoComplete='email'
                                        {...registerDeleteAccount('accountEmail', {
                                            required: 'Veuillez saisir votre adresse email',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                                message: 'Adresse email invalide'
                                            },
                                            onChange: () => triggerDeleteAccount('accountEmail')
                                        })}
                                    />
                                    <FormError error={errorsDeleteAccount.accountEmail} />
                                </div>
                                <div className='input-container'>
                                    <label htmlFor='account-password'>Mot de passe</label>
                                    <input
                                        type='password'
                                        name='accountPassword'
                                        placeholder='••••••••'
                                        autoComplete='current-password'
                                        id='account-password'
                                        {...registerDeleteAccount('accountPassword', {
                                            required: 'Veuillez saisir votre mot de passe',
                                            minLength: { value: 8, message: 'Minimum 8 caractères' },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/,
                                                message: 'Au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
                                            },
                                            onChange: () => triggerDeleteAccount('accountPassword')
                                        })}
                                    />
                                    <FormError error={errorsDeleteAccount.accountPassword} />
                                </div>
                                <button type='submit'>Confirmer la suppression du compte</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </SettingsContainer>
    )
}

const animateTop = keyframes`
    from {top: -300px; opacity: 0}
    to {top: calc(50vh - 150px); opacity: 1}
`

const SettingsContainer = StyledComponents.main`
    h2 {    
        text-align: center;
    }

    h3 {
        font-size: 1.5rem;
    }

    section {
        max-width: 1000px;
        margin: 2rem auto 0;
    }

    section:not(:last-of-type)::after {
        content: '';
        display: block;
        margin-top: 2rem;
        border-bottom: 1px solid var(--grey-200);
    }

    .email-modal, .account-modal {
        display: none; 
        position: fixed; 
        z-index: 1; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        background-color: rgba(0, 0, 0, 0.4); 
    }

    .modal-content {
        position: relative;
        top: calc(50vh - 200px);
        background-color: var(--white);
        margin: auto;
        padding: 0;
        width: 60%;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        animation-name: ${animateTop};
        animation-duration: 0.5s; 

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center; 
            padding: 1.25rem 1rem;
            background-color: var(--primary-400);
            color: var(--white);

            h4 {
                margin: 0;
            }

            .close-modal {
                font-size: 28px;
                font-weight: bold;
                color: var(--grey-300);
                padding-right: 1rem;
                transition: color 0.3s;
        
                &:hover,
                &:focus {
                    color: var(--white);
                    text-decoration: none;
                    cursor: pointer;
                }
            }
        }

        .modal-body {
            padding: 1.5rem 1rem;

            .email-reset-form, .delete-account-form {
                .input-container {
                    label {
                        display: block;
                        margin-bottom: 0.5rem;
                    }

                    input {
                        width: 100%;
                        padding: 0.5rem;
                        border: 1px solid var(--grey-300);
                        border-radius: 4px;
                        outline: none;
                        transition: border-color 0.3s;

                        &:focus {
                            border-width: 2px;
                            border-color: var(--primary-400); 
                            caret-color: transparent; 
                        }
                    }   
                }

                button {
                    margin-top: 0.5rem;
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 4px;
                    background-color: var(--primary-300);
                    color: var(--white);
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s;

                    &:hover {
                        background-color: var(--primary-500);
                    }
                }
            }

            .delete-account-form {
                button {
                    margin: 0; 
                    padding: 0;
                    background-color: transparent;
                    color: var(--red);

                    &:hover {
                        background-color: transparent;
                        text-decoration: none;
                    }
                }
            }
        }
    }

    .email-container {
        .email-current {
            display: grid; 
            grid-template-columns: 1fr;
            align-items: center;
            justify-items: start;

            p {
                margin: 0;
            }
            
            button {
                border: none;
                background-color: transparent;
                text-decoration: underline;
                font-weight: bold;
                color: var(--primary-400);
                cursor: pointer;
                margin-top: 0.5rem;

                &:hover {
                    text-decoration: none;
                }
            }
        }
    }

    .password-container {
        .password-header {
            display: grid; 
            grid-template-columns: 1fr 1fr;
            align-items: center;
            margin-bottom: 1.5rem;

            h3 {
                margin: 0;
            }
            
            .show-password {
                margin-right: 2rem;
                justify-self: end;
                border: none;
                background-color: transparent;
                text-decoration: underline;
                font-weight: bold;
                color: var(--primary-400);
                cursor: pointer;

                &:hover {
                    text-decoration: none;
                }
            }
        }

        form {
            display: grid;
            grid-template-columns: 1fr;
            column-gap: 1rem;

            div {
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                }

                input {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid var(--grey-300);
                    border-radius: 4px;
                    outline: none;
                    transition: border-color 0.3s;

                    &:focus {
                        border-width: 2px;
                        border-color: var(--primary-400); 
                        caret-color: transparent; 
                    }
                }
            }

            .forget-password {
                margin-bottom: 1rem;

                p {
                    margin-bottom: 0.25rem;
                }

                a { 
                    line-height: none; 
                }
                    
                button {
                    border: none;
                    background-color: transparent;
                    text-decoration: underline;
                    font-weight: bold;
                    color: var(--primary-400);
                    cursor: pointer;

                    &:hover {
                        text-decoration: none;
                    }
                }
            }

            button.save {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 4px;
                background-color: var(--primary-300);
                color: var(--white);
                font-weight: bold;
                cursor: pointer;
                transition: background-color 0.3s;

                &:hover {
                    background-color: var(--primary-500);
                }
            }
        }
    }

    .delete-container {
        p {
            margin: 0.5rem 0; 

            &.irreversible {
                font-weight: bold;
            }
        }

        button {
            margin: 1rem 0; 
            border: none;
            background-color: transparent;
            text-decoration: underline;
            font-weight: bold;
            color: var(--red);
            cursor: pointer;
            text-align: start;
        }
    }

    @media (min-width: 640px) {
        .email-container {
            .email-current {
                grid-template-columns: 2fr 1fr;
                
                button {
                    margin-top: 0;
                    justify-self: end;
                    margin-right: 1rem;
                }
            }

            .email-modal .modal-content {
                width: 80%;
            }
        }

        .password-container {
            form {
                grid-template-columns: repeat(2, 1fr);

                .previous-password {
                    grid-column: 1 / 3;
                }

                .forget-password {
                    grid-column: 1 / 3;
                    display: flex;
                    align-items: center; 
    
                    p {
                        margin: 0; 
                    }
    
                    button {
                        margin-left: 0.5rem; 
                    }
                }
            }
        }
    }

    @media (min-width: 1024px) {
        .email-container {
            .email-current {
                grid-template-columns: 1fr 1fr;

                button {
                    justify-self: start;
                    margin-right: 0;
                    margin-left: 1rem;
                }
            }

            .email-modal .modal-content {
                width: 60%;
            }
        }

        .password-container {
            form {
                grid-template-columns: repeat(3, 1fr);

                .previous-password {
                    grid-column: 1 / 2;
                }

                .forget-password {
                    grid-column: 1 / 4; 
                }
            }
        }
    }
`