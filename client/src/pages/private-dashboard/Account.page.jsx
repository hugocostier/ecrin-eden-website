import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import defaultPicture from '../../assets/images/default-profile-picture.png'
import { fetchClient, updateClient } from "../../data/admin/clients.fetch"
import { useClientInfo } from '../../hooks/useClientInfo.hook'
import { SERVER_URL } from '../../utils/serverUrl.util'

export const AccountPage = () => {
    const navigate = useNavigate()
    const client = useClientInfo()

    const [isEditable, setIsEditable] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [account, setAccount] = useState({})

    const [input, setInput] = useState({
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
    })

    useEffect(() => {
        fetchClient(client.id)
            .then(fetchedClient => {
                setAccount(fetchedClient)
                setInput({
                    lastName: fetchedClient.last_name ? fetchedClient.last_name : '',
                    firstName: fetchedClient.first_name ? fetchedClient.first_name : '',
                    phone: fetchedClient.phone_number ? fetchedClient.phone_number : '',
                    birthDate: fetchedClient.birth_date ? fetchedClient.birth_date.split('T')[0] : '',
                    address: fetchedClient.address ? fetchedClient.address : '',
                    postalCode: fetchedClient.postal_code ? fetchedClient.postal_code : '',
                    city: fetchedClient.city ? fetchedClient.city : '',
                    email: fetchedClient.user_email ? fetchedClient.user_email : '',
                    profilePicture: fetchedClient.profile_picture ? fetchedClient.profile_picture : '',
                    sharedNotes: fetchedClient.shared_notes ? fetchedClient.shared_notes : '',
                    privateNotes: fetchedClient.private_notes ? fetchedClient.private_notes : '',
                })
            })
            .catch(error => {
                console.error('Error fetching client:', error)
            })

        return () => {
            setAccount({})
        }
    }, [client.id])

    const handleChange = (e) => {
        if (e.target.name === 'profilePicture') {
            const file = e.target.files[0]

            if (file) {
                const reader = new FileReader()

                reader.onloadend = () => {
                    setPreviewImage(reader.result)
                }

                reader.readAsDataURL(file)

                setInput({
                    ...input,
                    profilePicture: file,
                })
            }
        }
        else {
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            })
        }
    }

    const handleCancel = () => {
        setInput({
            firstName: account.first_name,
            lastName: account.last_name,
            phone: account.phone_number ? account.phone_number : '',
            birthDate: account.birth_date ? account.birth_date.split('T')[0] : '',
            address: account.address ? account.address : '',
            postalCode: account.postal_code ? account.postal_code : '',
            city: account.city ? account.city : '',
            email: account.user_email ? account.user_email : '',
            profilePicture: account.profile_picture ? account.profile_picture : '',
            sharedNotes: account.shared_notes ? account.shared_notes : '',
            privateNotes: account.private_notes ? account.private_notes : '',
        })

        setIsEditable(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        toast.promise(updateClient(client.id, input), {
            pending: 'Modification...',
            success: 'Informations personnelles modifiées !',
            error: 'Erreur lors de la modification de vos informations personnelles'
        }, { containerId: 'notification' })
            .then(() => {
                setInput({
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
                })

                const currentPath = window.location.pathname
                navigate(currentPath.replace('/account', ''))
            })
            .catch(error => {
                console.error('Error updating personal info:', error)
            })
    }

    return (
        <Account>
            <h2>Mon compte</h2>

            <AccountForm>
                <legend className='form-legend'>Informations personnelles</legend>
                <input
                    type="text"
                    name="lastName"
                    id="last-name"
                    required
                    value={input.lastName}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Nom'
                />

                <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    required
                    value={input.firstName}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Prénom'
                />

                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={input.phone}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Numéro de téléphone'
                />

                <input
                    type="date"
                    name="birthDate"
                    id="birth-date"
                    value={input.birthDate}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Date de naissance'
                />

                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={input.email}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Email'
                />

                <input
                    type="text"
                    name="address"
                    id="address"
                    value={input.address}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Adresse'
                />

                <input
                    type="text"
                    name="postalCode"
                    id="postal-code"
                    value={input.postalCode}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Code postal'
                />

                <input
                    type="text"
                    name="city"
                    id="city"
                    value={input.city}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Ville'
                />

                <label
                    htmlFor="profile-picture"
                    id='profile-picture-container'
                >
                    <div className='img-upload'>
                        <img
                            src={previewImage || (input.profilePicture ? `${SERVER_URL}/${input.profilePicture}` : defaultPicture)}
                            alt='profile-picture'
                            style={{ cursor: isEditable ? 'pointer' : 'default' }}
                        />
                    </div>
                </label>
                <input
                    type="file"
                    name="profilePicture"
                    id="profile-picture"
                    accept='image/*'
                    onChange={handleChange}
                    disabled={!isEditable}
                    style={{ display: 'none' }}
                />

                <textarea
                    name="sharedNotes"
                    id="shared-notes"
                    value={input.sharedNotes}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Informations partagées avec le client'
                    rows={8}
                />

                {!isEditable && (
                    <button
                        type="button"
                        id="edit"
                        onClick={() => setIsEditable(true)}
                    >
                        Modifier
                    </button>
                )}

                {isEditable && (
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
                            onClick={handleSubmit}
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
    row-gap: 0.5rem;
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 2rem;

    legend {
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: 1rem;
    }
    
    label {
        &#profile-picture-container {
            grid-row: 2 / 6; 
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
        margin-top: 0.5rem;
        padding: 0.5rem;
        width: 100%;

        &:not(#email, [type='file']) {
            text-transform: capitalize;
        }
    }

    textarea {
        margin-top: 0.5rem;
        padding: 0.5rem;
        resize: none;
    }

    button {
        margin-top: 1rem;
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
        }
        
        label {    
            &#profile-picture-container {
                grid-column: 2 / 3;
                  
                .img-upload {
                    width: 200px;
                    height: 200px;
                }  
            }
        }

        input {   
            &#last-name, &#first-name, &#phone, &#postal-code {
                grid-column: 1 / 2; 
            }
    
            &#address, &#email {
                grid-column: 1 / 3;
            }
    
            &#city {
                grid-column: 2 / 3;
            }
        }

        textarea {            
            &#shared-notes {
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