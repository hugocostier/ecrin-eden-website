import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import defaultPicture from '../../../../assets/images/default-profile-picture.png'
import { FormError } from '../../../../components/FormError'
import { fetchClient, updateClient } from "../../../../data/admin/clients.fetch"
import { fetchClientPreferences, updateClientPreferences } from '../../../../data/admin/preferences.fetch'

export const UpdateClient = () => {
    const navigate = useNavigate()
    const { id: clientId } = useParams()

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            lastName: '',
            firstName: '',
            phone: '',
            birthDate: '',
            address: '',
            postalCode: '',
            city: '',
            email: '',
            profilePicture: '',
            sharedNotes: '',
            privateNotes: '',
            question1: '',
            question2: '',
            question3: '',
            question4: '',
            question5: '',
        }
    })

    const [isEditable, setIsEditable] = useState(false)
    const [hasAccount, setHasAccount] = useState(false)
    const [previewImage, setPreviewImage] = useState('')

    useEffect(() => {
        if (!clientId) return

        fetchClient(clientId)
            .then(fetchedClient => {
                const data = {
                    lastName: fetchedClient.last_name || '',
                    firstName: fetchedClient.first_name || '',
                    phone: fetchedClient.phone_number || '',
                    birthDate: fetchedClient.birth_date ? fetchedClient.birth_date.split('T')[0] : '',
                    address: fetchedClient.address || '',
                    postalCode: fetchedClient.postal_code || '',
                    city: fetchedClient.city || '',
                    email: fetchedClient.user?.email || '',
                    profilePicture: fetchedClient.profile_picture || '',
                    sharedNotes: fetchedClient.shared_notes || '',
                    privateNotes: fetchedClient.private_notes || '',
                }
                reset(data)
                setPreviewImage(fetchedClient.profile_picture ? `${import.meta.env.VITE_APP_SERVER_URL}/${fetchedClient.profile_picture}` : defaultPicture)

                if (fetchedClient.user?.id) {
                    setHasAccount(true)
                }
            })
            .catch(error => {
                console.error('Error fetching client:', error)
            })

        fetchClientPreferences(clientId)
            .then(preferences => {
                const data = {
                    question1: preferences.question_1 || '',
                    question2: preferences.question_2 || '',
                    question3: preferences.question_3 || '',
                    question4: preferences.question_4 || '',
                    question5: preferences.question_5 || '',
                }
                reset(data)
            })
            .catch(error => {
                console.error('Error fetching client preferences:', error)
            })

        return () => {
            reset()
        }
    }, [clientId, reset])

    const handleCancel = () => {
        fetchClient(clientId)
            .then(fetchedClient => {
                const data = {
                    lastName: fetchedClient.last_name || '',
                    firstName: fetchedClient.first_name || '',
                    phone: fetchedClient.phone_number || '',
                    birthDate: fetchedClient.birth_date ? fetchedClient.birth_date.split('T')[0] : '',
                    address: fetchedClient.address || '',
                    postalCode: fetchedClient.postal_code || '',
                    city: fetchedClient.city || '',
                    email: fetchedClient.user?.email || '',
                    profilePicture: fetchedClient.profile_picture || '',
                    sharedNotes: fetchedClient.shared_notes || '',
                    privateNotes: fetchedClient.private_notes || '',
                }
                reset(data)
                setPreviewImage(fetchedClient.profile_picture ? `${import.meta.env.VITE_APP_SERVER_URL}/${fetchedClient.profile_picture}` : '')
            })
            .catch(error => {
                console.error('Error fetching client:', error)
            })

        fetchClientPreferences(clientId)
            .then(preferences => {
                const data = {
                    question1: preferences.question_1 || '',
                    question2: preferences.question_2 || '',
                    question3: preferences.question_3 || '',
                    question4: preferences.question_4 || '',
                    question5: preferences.question_5 || '',
                }
                reset(data)
                setIsEditable(false)
            })
            .catch(error => {
                console.error('Error fetching client preferences:', error)
            })
    }

    const sendForm = async (data) => {
        toast.promise(updateClient(clientId, data), {
            pending: 'Modification...',
            success: 'Client modifié !',
            error: 'Erreur lors de la modification du client'
        }, { containerId: 'notification' })
            .then(() => {
                console.log('Client updated')
            })
            .catch(error => {
                console.error('Error updating client:', error)
            })

        toast.promise(updateClientPreferences(clientId, data), {
            pending: 'Modification des préférences...',
            success: 'Préférences modifiées !',
            error: 'Erreur lors de la modification des préférences'
        }, { containerId: 'notification' })
            .then(() => {
                reset()
                setIsEditable(false)
                navigate(-1)
            })
            .catch(error => {
                console.error('Error updating client preferences:', error)
            })
    }

    const profilePicture = watch('profilePicture')

    useEffect(() => {
        if (profilePicture && profilePicture.length > 0 && profilePicture instanceof FileList) {
            const file = profilePicture[0]

            if (file) {
                const reader = new FileReader()

                reader.onloadend = () => {
                    setPreviewImage(reader.result)
                }

                reader.readAsDataURL(file)
            }
        }
    }, [profilePicture])

    return (
        <ClientRecord>
            <h2>Fiche client</h2>

            <StyledForm onSubmit={handleSubmit(sendForm)}>
                <legend className='form-legend'>Informations personnelles</legend>
                <div className='input-container' name='lastName'>
                    <input
                        type='text'
                        name='lastName'
                        id='last-name'
                        placeholder='Nom*'
                        {...register('lastName', { required: 'Veuillez entrer votre nom', pattern: { value: /^[a-zA-ZÀ-ÿ\s-]+$/, message: 'Veuillez entrer un nom valide' }, disabled: hasAccount ? true : !isEditable })}
                    />
                    <FormError error={errors.lastName} />
                </div>

                <div className='input-container' name='firstName'>
                    <input
                        type='text'
                        name='firstName'
                        id='first-name'
                        placeholder='Prénom*'
                        {...register('firstName', { required: 'Veuillez entrer votre prénom', pattern: { value: /^[a-zA-ZÀ-ÿ\s-]+$/, message: 'Veuillez entrer un prénom valide' }, disabled: hasAccount ? true : !isEditable })}
                    />
                    <FormError error={errors.firstName} />
                </div>

                <div className='input-container' name='phone'>
                    <input
                        type='tel'
                        name='phone'
                        id='phone'
                        placeholder='Numéro de téléphone (ex: 0601020304)'
                        {...register('phone', { pattern: { value: /^[0-9]{10}$/, message: 'Veuillez entrer un numéro de téléphone valide' }, disabled: hasAccount ? true : !isEditable })}
                    />
                    <FormError error={errors.phone} />
                </div>

                <div className='input-container' name='birthDate'>
                    <input
                        type='date'
                        name='birthDate'
                        id='birth-date'
                        placeholder='Date de naissance'
                        {...register('birthDate', { disabled: hasAccount ? true : !isEditable, validate: value => value ? new Date(value) <= new Date() || 'Veuillez entrer une date de naissance valide' : true })}
                    />
                    <FormError error={errors.birthDate} />
                </div>

                <div className='input-container' name='email'>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Email* (ex: adresse@mail.fr)'
                        {...register('email', { required: 'Veuillez entrer votre email', pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Veuillez entrer un email valide' }, disabled: hasAccount ? true : !isEditable })}
                    />
                    <FormError error={errors.email} />
                </div>

                <div className='input-container' name='address'>
                    <input
                        type='text'
                        name='address'
                        id='address'
                        placeholder='Adresse'
                        {...register('address', { disabled: hasAccount ? true : !isEditable })}
                    />
                    <FormError error={errors.address} />
                </div>

                <div className='input-container' name='postalCode'>
                    <input
                        type='text'
                        name='postalCode'
                        id='postal-code'
                        placeholder='Code postal (ex: 75000)'
                        {...register('postalCode', { pattern: { value: /^[0-9]{5}$/, message: 'Veuillez entrer un code postal valide' }, disabled: hasAccount ? true : !isEditable })}
                    />
                    <FormError error={errors.postalCode} />
                </div>

                <div className='input-container' name='city'>
                    <input
                        type='text'
                        name='city'
                        id='city'
                        placeholder='Ville'
                        {...register('city', { pattern: { value: /^[a-zA-ZÀ-ÿ\s-]+$/, message: 'Veuillez entrer une ville valide' }, disabled: hasAccount ? true : !isEditable })}
                    />
                    <FormError error={errors.city} />
                </div>

                <div className='input-container' name='profilePicture'>
                    <label
                        htmlFor='profile-picture'
                        id='profile-picture-container'
                    >
                        <div className='img-upload'>
                            <img
                                src={previewImage || defaultPicture}
                                alt='profile-picture'
                                style={{ cursor: isEditable ? 'pointer' : 'default' }}
                            />
                        </div>
                    </label>
                    <input
                        type='file'
                        name='profilePicture'
                        id='profile-picture'
                        accept='image/*'
                        style={{ display: 'none' }}
                        {...register('profilePicture', { disabled: hasAccount ? true : !isEditable, validate: value => value.length > 0 ? value[0].size <= 8388608 || 'La taille de l\'image ne doit pas dépasser 8 Mo' : true })}
                    />
                </div>


                <legend className='form-legend'>Préférences</legend>
                <div className='input-container' name='question1'>
                    <label htmlFor="question-1" className='user_preferences'>Êtes-vous frileux&#x28;se&#x29; ?</label>
                    <select
                        name="question1"
                        id="question-1"
                        {...register('question1', { disabled: hasAccount ? true : !isEditable })}
                    >
                        <option value="">Choisissez une réponse</option>
                        <option
                            value="non"
                        >
                            Non
                        </option>
                        <option
                            value="parfois"
                        >
                            Parfois
                        </option>
                        <option
                            value="oui"
                        >
                            Oui
                        </option>
                        <option
                            value="ne sais pas"
                        >
                            Je ne sais pas
                        </option>
                    </select>
                    <FormError error={errors.question1} />
                </div>

                <div className='input-container' name='question2'>
                    <label htmlFor="question-2" className='user_preferences'>Quelles sont les zones où vous préférez recevoir des massages ?</label>
                    <input
                        type="text"
                        name="question2"
                        id="question-2"
                        placeholder="Votre réponse..."
                        {...register('question2', { disabled: hasAccount ? true : !isEditable })}
                    />
                    <FormError error={errors.question2} />
                </div>

                <div className='input-container' name='question3'>
                    <label htmlFor="question-3" className='user_preferences'>Quelles sont les zones où vous n&apos;appréciez pas trop être massé ?</label>
                    <input
                        type="text"
                        name="question3"
                        id="question-3"
                        placeholder="Votre réponse..."
                        {...register('question3', { disabled: hasAccount ? true : !isEditable })}
                    />
                    <FormError error={errors.question3} />
                </div>

                <div className='input-container' name='question4'>
                    <label htmlFor="question-4" className='user_preferences'>Quel type de pression aimez-vous ?</label>
                    <select
                        name="question4"
                        id="question-4"
                        disabled={hasAccount ? true : !isEditable}
                        {...register('question4', { disabled: hasAccount ? true : !isEditable })}
                    >
                        <option value="">Choisissez une réponse</option>
                        <option
                            value="faible"
                        >
                            Faible
                        </option>
                        <option
                            value="modérée"
                        >
                            Modérée
                        </option>
                        <option
                            value="forte"
                        >
                            Forte
                        </option>
                        <option
                            value="ne sais pas"
                        >
                            Je ne sais pas
                        </option>
                    </select>
                    <FormError error={errors.question4} />
                </div>

                <div className='input-container' name='question5'>
                    <label htmlFor="question-5" className='user_preferences'>Avez vous des éléments particuliers à signaler ?</label>
                    <textarea
                        name="question5"
                        id="question-5"
                        placeholder="Votre réponse..."
                        rows={6}
                        {...register('question5', { disabled: hasAccount ? true : !isEditable })}
                    />
                    <FormError error={errors.question5} />
                </div>

                <legend className='form-legend'>Notes partagées avec le client</legend>
                <div className='input-container' name='sharedNotes'>
                    <textarea
                        name='sharedNotes'
                        id='shared-notes'
                        placeholder='Informations partagées avec le client'
                        rows={8}
                        {...register('sharedNotes', { disabled: !isEditable })}
                    />
                    <FormError error={errors.sharedNotes} />
                </div>

                <legend className='form-legend'>Notes personnelles</legend>
                <div className='input-container' name='privateNotes'>
                    <textarea
                        name='privateNotes'
                        id='private-notes'
                        placeholder='Notes du praticien'
                        rows={5}
                        {...register('privateNotes', { disabled: !isEditable })}
                    />
                    <FormError error={errors.privateNotes} />
                </div>

                {!isEditable ? (
                    <button
                        type="button"
                        id="edit"
                        onClick={() => setIsEditable(true)}
                    >
                        Modifier
                    </button>
                ) : (
                    <div id='button-container'>
                        <button
                            type="button"
                            id='cancel'
                            onClick={handleCancel}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            id='save'
                        >
                            Enregistrer
                        </button>
                    </div>
                )}
            </StyledForm>
        </ClientRecord>
    )
}

const ClientRecord = StyledComponents.main`
    h2 {
        text-align: center;
        margin: 0; 
    }
`

const StyledForm = StyledComponents.form`
    display: grid; 
    grid-template-columns: 1fr;
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 2rem;

    legend {
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: 1rem;
    }

    .input-container {
        &[name='profilePicture'] {
            grid-row: 2 / 6;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
    }
    
    label {
        &#profile-picture-container {
            display: grid;
            border-radius: 50%;
              
            .img-upload {
                width: 150px;
                height: 150px;
                overflow: hidden;
                border-radius: 50%;
                justify-self: center;
                align-self: center;
                
                img {
                    max-width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: 50% 50%; 
                }
            }  
        }
    }

    input, select {
        padding: 0.5rem;
        width: 100%;

        &:not(#email, [type='file']) {
            text-transform: capitalize;
        }
    }

    textarea {
        width: 100%;
        padding: 0.5rem;
        resize: none;
    }

    button {
        padding: 0.5rem;
    }

    #button-container {
        display: grid; 
        grid-template-columns: 1fr 1fr;
    }

    #question-1, #question-2, #question-3, #question-4, #question-5 {
        margin-top: 0; 
    }

    @media screen and (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1rem;

        legend {
            text-align: left;
            grid-column: 1 / 3;
            margin-bottom: 1rem; 
        }
        
        label {
            &.user_preferences {
                grid-column: 1 / 3;
            }
    
            &#profile-picture-container {                  
                .img-upload {
                    width: 200px;
                    height: 200px;
                }  
            }
        }

        .input-container {
            &[name='profilePicture'] {
                grid-column: 2 / 3;
            }

            &[name='lastName'], &[name='firstName'], &[name='phone'], &[name='postal-code'] {
                grid-column: 1 / 2;
            }

            &[name='address'], &[name='email'] {
                grid-column: 1 / 3;
            }

            &[name='city'] {
                grid-column: 2 / 3;
            }

            &[name='sharedNotes'], &[name='privateNotes'], &[name='question5'] {
                grid-column: 1 / 3;
            }

            &[name='question1'], &[name='question2'], &[name='question3'], &[name='question4'] {
                grid-column: 1 / 3;
            }
        }

        button {    
            &#edit {
                grid-column: 1 / 3;
            }
        }

        #button-container {
            grid-column: 1 / 3;
        }
    }
`