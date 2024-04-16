import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import defaultPicture from '../../../../assets/images/default-profile-picture.png'
import { fetchClient, updateClient } from "../../../../data/admin/clients.fetch"
import { fetchClientPreferences, updateClientPreferences } from '../../../../data/admin/preferences.fetch'
import { SERVER_URL } from '../../../../utils/serverUrl.util'

export const UpdateClient = () => {
    const navigate = useNavigate()
    const { id: clientId } = useParams()

    const [isEditable, setIsEditable] = useState(false)
    const [hasAccount, setHasAccount] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [client, setClient] = useState({})
    const [preferences, setPreferences] = useState({})

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
        sharedNotes: '',
        privateNotes: '',
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
    })

    useEffect(() => {
        fetchClient(clientId)
            .then(fetchedClient => {
                setClient(fetchedClient)
                setInput(i => ({
                    ...i,
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
                }))

                if (fetchedClient.user_id) {
                    setHasAccount(true)
                }
            })
            .catch(error => {
                console.error('Error fetching client:', error)
            })

        fetchClientPreferences(clientId)
            .then(preferences => {
                setPreferences(preferences)
                setInput(i => ({
                    ...i,
                    question1: preferences.question_1 ? preferences.question_1 : '',
                    question2: preferences.question_2 ? preferences.question_2 : '',
                    question3: preferences.question_3 ? preferences.question_3 : '',
                    question4: preferences.question_4 ? preferences.question_4 : '',
                    question5: preferences.question_5 ? preferences.question_5 : '',
                }))
            })
            .catch(error => {
                console.error('Error fetching client preferences:', error)
            })

        return () => {
            setClient({})
            setPreferences({})
        }
    }, [clientId])

    console.log('input:', input)

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
            setInput((prevInput) => ({
                ...prevInput,
                [e.target.name]: e.target.value,
            }))
        }
    }

    const handleCancel = () => {
        setInput({
            firstName: client.first_name,
            lastName: client.last_name,
            phone: client.phone_number ? client.phone_number : '',
            birthDate: client.birth_date ? client.birth_date.split('T')[0] : '',
            address: client.address ? client.address : '',
            postalCode: client.postal_code ? client.postal_code : '',
            city: client.city ? client.city : '',
            email: client.user_email ? client.user_email : '',
            profilePicture: client.profile_picture ? client.profile_picture : '',
            sharedNotes: client.shared_notes ? client.shared_notes : '',
            privateNotes: client.private_notes ? client.private_notes : '',
            question_1: preferences.question_1 ? preferences.question_1 : '',
            question_2: preferences.question_2 ? preferences.question_2 : '',
            question_3: preferences.question_3 ? preferences.question_3 : '',
            question_4: preferences.question_4 ? preferences.question_4 : '',
            question_5: preferences.question_5 ? preferences.question_5 : '',
        })

        setIsEditable(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        toast.promise(() => {
            updateClient(clientId, input)
            updateClientPreferences(clientId, input)
        }, {
            pending: 'Modification...',
            success: 'Client modifié !',
            error: 'Erreur lors de la modification du client'
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
                    question1: '',
                    question2: '',
                    question3: '',
                    question4: '',
                    question5: '',
                })

                navigate(-1)
            })
            .catch(error => {
                console.error('Error updating client:', error)
            })
    }

    return (
        <ClientRecord>
            <h2>Fiche client</h2>

            <StyledForm>
                <legend className='form-legend'>Informations personnelles</legend>
                <input
                    type="text"
                    name="lastName"
                    id="last-name"
                    required
                    value={input.lastName}
                    onChange={handleChange}
                    disabled={hasAccount ? true : !isEditable}
                    placeholder='Nom'
                    autoComplete='off'
                />

                <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    required
                    value={input.firstName}
                    onChange={handleChange}
                    disabled={hasAccount ? true : !isEditable}
                    placeholder='Prénom'
                    autoComplete='off'
                />

                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={input.phone}
                    onChange={handleChange}
                    disabled={hasAccount ? true : !isEditable}
                    placeholder='Numéro de téléphone'
                    autoComplete='off'
                />

                <input
                    type="date"
                    name="birthDate"
                    id="birth-date"
                    value={input.birthDate}
                    onChange={handleChange}
                    disabled={hasAccount ? true : !isEditable}
                    placeholder='Date de naissance'
                    autoComplete='off'
                />

                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={input.email}
                    onChange={handleChange}
                    disabled={hasAccount ? true : !isEditable}
                    placeholder='Email'
                    autoComplete='off'
                />

                <input
                    type="text"
                    name="address"
                    id="address"
                    value={input.address}
                    onChange={handleChange}
                    disabled={hasAccount ? true : !isEditable}
                    placeholder='Adresse'
                    autoComplete='off'
                />

                <input
                    type="text"
                    name="postalCode"
                    id="postal-code"
                    value={input.postalCode}
                    onChange={handleChange}
                    disabled={hasAccount ? true : !isEditable}
                    placeholder='Code postal'
                    autoComplete='off'
                />

                <input
                    type="text"
                    name="city"
                    id="city"
                    value={input.city}
                    onChange={handleChange}
                    disabled={hasAccount ? true : !isEditable}
                    placeholder='Ville'
                    autoComplete='off'
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
                    disabled={hasAccount ? true : !isEditable}
                    style={{ display: 'none' }}
                />


                <legend className='form-legend'>Préférences</legend>
                <label htmlFor="question-1" className='user_preferences'>Êtes-vous frileux&#x28;se&#x29; ?</label>
                <select
                    name="question1"
                    id="question-1"
                    value={input.question1}
                    onChange={handleChange}
                    disabled={hasAccount ? true : !isEditable}
                >
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

                <label htmlFor="question-2" className='user_preferences'>Quelles sont les zones où vous préférez recevoir des massages ?</label>
                <input
                    type="text"
                    name="question2"
                    id="question-2"
                    value={input.question2}
                    onChange={handleChange}
                    disabled={hasAccount ? true : !isEditable}
                    placeholder="Votre réponse..."
                />

                <label htmlFor="question-3" className='user_preferences'>Quelles sont les zones où vous n&apos;appréciez pas trop être massé ?</label>
                <input
                    type="text"
                    name="question3"
                    id="question-3"
                    value={input.question3}
                    onChange={handleChange}
                    disabled={hasAccount ? true : !isEditable}
                    placeholder="Votre réponse..."
                />

                <label htmlFor="question-4" className='user_preferences'>Quel type de pression aimez-vous ?</label>
                <select
                    name="question4"
                    id="question-4"
                    value={input.question4}
                    onChange={handleChange}
                    disabled={hasAccount ? true : !isEditable}
                >
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

                <label htmlFor="question-5" className='user_preferences'>Avez vous des éléments particuliers à signaler ?</label>
                <textarea
                    name="question5"
                    id="question-5"
                    value={input.question5 ? input.question5 : undefined}
                    onChange={handleChange}
                    disabled={hasAccount ? true : !isEditable}
                    placeholder="Votre réponse..."
                    rows={6}
                />

                <legend className='form-legend'>Notes partagées avec le praticien</legend>
                <textarea
                    name="sharedNotes"
                    id="shared-notes"
                    value={input.sharedNotes}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Informations partagées avec le client'
                    rows={8}
                />

                <legend className='form-legend'>Notes personnelles</legend>
                <textarea
                    name="privateNotes"
                    id="private-notes"
                    value={input.privateNotes}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Notes du praticien'
                    rows={5}
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

    input, select {
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

    #question-1, #question-2, #question-3, #question-4, #question-5 {
        margin-top: 0; 
    }

    @media screen and (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1rem;

        legend {
            text-align: left;
            grid-column: 1 / 3;
        }
        
        label {
            &.user_preferences {
                grid-column: 1 / 3;
            }
    
            &#profile-picture-container {
                grid-column: 2 / 3;
                  
                .img-upload {
                    width: 200px;
                    height: 200px;
                }  
            }
        }

        input, select {   
            &#last-name, &#first-name, &#phone, &#postal-code {
                grid-column: 1 / 2; 
            }
    
            &#address, &#email {
                grid-column: 1 / 3;
            }
    
            &#city {
                grid-column: 2 / 3;
            }
    
            &#question-1, 
            &#question-2, 
            &#question-3, 
            &#question-4 {
                grid-column: 1 / 3;     
            }
        }

        textarea {            
            &#shared-notes, &#private-notes, &#question-5 {
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