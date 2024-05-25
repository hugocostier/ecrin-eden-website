import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import defaultPicture from '../../assets/images/default-profile-picture.png'
import { FormError } from '../../components/FormError'
import { fetchClient, updateClient } from '../../data/admin/clients.fetch'
import { useClientInfo } from '../../hooks/useClientInfo.hook'

export const AccountPage = () => {
    const navigate = useNavigate()
    const client = useClientInfo()

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
            sharedInfo: '',
        }
    })

    const [isEditable, setIsEditable] = useState(false)
    const [previewImage, setPreviewImage] = useState('')

    useEffect(() => {
        if (!client.id) return

        fetchClient(client.id)
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
                }
                reset(data)
                setPreviewImage(fetchedClient.profile_picture ? `${import.meta.env.VITE_APP_SERVER_URL}/${fetchedClient.profile_picture}` : defaultPicture)
            })
            .catch(error => {
                console.error('Error fetching client:', error)
            })

        return () => {
            reset()
        }
    }, [client.id, reset])

    const handleCancel = () => {
        fetchClient(client.id)
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
                }
                reset(data)
                setPreviewImage(fetchedClient.profile_picture ? `${import.meta.env.VITE_APP_SERVER_URL}/${fetchedClient.profile_picture}` : '')
                setIsEditable(false)
            })
            .catch(error => {
                console.error('Error fetching client:', error)
            })
    }

    const sendForm = async (data) => {
        toast.promise(updateClient(client.id, data), {
            pending: 'Modification...',
            success: 'Informations personnelles modifiées !',
            error: 'Erreur lors de la modification de vos informations personnelles'
        }, { containerId: 'notification' })
            .then(() => {
                reset()

                const currentPath = window.location.pathname
                navigate(currentPath.replace('/account', ''))
            })
            .catch(error => {
                console.error('Error updating personal info:', error)
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
        <Account>
            <h2>Mon compte</h2>

            <AccountForm onSubmit={handleSubmit(sendForm)}>
                <legend className='form-legend'>Informations personnelles</legend>
                <div className='input-container' name='lastName'>
                    <input
                        type='text'
                        name='lastName'
                        id='last-name'
                        placeholder='Nom*'
                        {...register('lastName', { required: 'Veuillez entrer votre nom', pattern: { value: /^[a-zA-ZÀ-ÿ\s-]+$/, message: 'Veuillez entrer un nom valide' }, disabled: !isEditable })}
                    />
                    <FormError error={errors.lastName} />
                </div>

                <div className='input-container' name='firstName'>
                    <input
                        type='text'
                        name='firstName'
                        id='first-name'
                        placeholder='Prénom*'
                        {...register('firstName', { required: 'Veuillez entrer votre prénom', pattern: { value: /^[a-zA-ZÀ-ÿ\s-]+$/, message: 'Veuillez entrer un prénom valide' }, disabled: !isEditable })}
                    />
                    <FormError error={errors.firstName} />
                </div>

                <div className='input-container' name='phone'>
                    <input
                        type='tel'
                        name='phone'
                        id='phone'
                        placeholder='Numéro de téléphone (ex: 0601020304)'
                        {...register('phone', { pattern: { value: /^[0-9]{10}$/, message: 'Veuillez entrer un numéro de téléphone valide' }, disabled: !isEditable })}
                    />
                    <FormError error={errors.phone} />
                </div>

                <div className='input-container' name='birthDate'>
                    <input
                        type='date'
                        name='birthDate'
                        id='birth-date'
                        placeholder='Date de naissance'
                        {...register('birthDate', { disabled: !isEditable, validate: value => value ? new Date(value) <= new Date() || 'Veuillez entrer une date de naissance valide' : true })}
                    />
                    <FormError error={errors.birthDate} />
                </div>

                <div className='input-container' name='email'>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Email* (ex: adresse@mail.fr)'
                        {...register('email', { required: 'Veuillez entrer votre email', pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Veuillez entrer un email valide' }, disabled: !isEditable })}
                    />
                    <FormError error={errors.email} />
                </div>

                <div className='input-container' name='address'>
                    <input
                        type='text'
                        name='address'
                        id='address'
                        placeholder='Adresse'
                        {...register('address', { disabled: !isEditable })}
                    />
                    <FormError error={errors.address} />
                </div>

                <div className='input-container' name='postalCode'>
                    <input
                        type='text'
                        name='postalCode'
                        id='postal-code'
                        placeholder='Code postal (ex: 75000)'
                        {...register('postalCode', { pattern: { value: /^[0-9]{5}$/, message: 'Veuillez entrer un code postal valide' }, disabled: !isEditable })}
                    />
                    <FormError error={errors.postalCode} />
                </div>

                <div className='input-container' name='city'>
                    <input
                        type='text'
                        name='city'
                        id='city'
                        placeholder='Ville'
                        {...register('city', { pattern: { value: /^[a-zA-ZÀ-ÿ\s-]+$/, message: 'Veuillez entrer une ville valide' }, disabled: !isEditable })}
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
                        {...register('profilePicture', { disabled: !isEditable, validate: value => value.length > 0 ? value[0].size <= 8388608 || 'La taille de l\'image ne doit pas dépasser 8 Mo' : true })}
                    />
                    <FormError error={errors.profilePicture} />
                </div>

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

                {!isEditable ? (
                    <button
                        type='button'
                        id='edit'
                        onClick={() => setIsEditable(true)}
                    >
                        Modifier
                    </button>
                ) : (
                    <div id='button-container'>
                        <button
                            type='button'
                            id='cancel'
                            onClick={handleCancel}
                        >
                            Annuler
                        </button>
                        <button
                            type='submit'
                            id='save'
                        >
                            Enregistrer
                        </button>
                    </div>
                )}
            </AccountForm>
        </Account>
    )
}

const Account = StyledComponents.main`
    h2 {
        text-align: center;
        margin: 0; 
    }
`

const AccountForm = StyledComponents.form`
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

    input {
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

    @media screen and (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1rem;

        legend {
            text-align: left;
            grid-column: 1 / 3;
            margin-bottom: 1rem; 
        }
        
        label {    
            &#profile-picture-container {                  
                .img-upload {
                    width: 200px;
                    height: 200px;
                }  
            }
        }

        .input-container {
            &[name='lastName'], &[name='firstName'], &[name='phone'], &[name='postal-code'] {
                grid-column: 1 / 2;
            }
            
            &[name='profilePicture'], &[name='city'] {
                grid-column: 2 / 3;
            }

            &[name='address'], &[name='email'], &[name='sharedNotes'] {
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