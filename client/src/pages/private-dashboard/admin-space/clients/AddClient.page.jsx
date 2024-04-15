import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import defaultPicture from '../../../../assets/images/default-profile-picture.png'
import { addClient } from "../../../../data/admin/clients.fetch"

export const AddClient = () => {
    const navigate = useNavigate()
    const [previewImage, setPreviewImage] = useState('')

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
    })

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

    const handleSubmit = (e) => {
        e.preventDefault()

        toast.promise(addClient(input), {
            pending: 'Ajout...',
            success: 'Client ajouté !',
            error: 'Erreur lors de l\'ajout du client'
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
                navigate(currentPath.replace('/add', ''))
            })
            .catch(error => {
                console.error('Error adding client:', error)
            })
    }

    return (
        <ClientAdd>
            <h2>Nouveau client</h2>

            <StyledForm>
                <legend className='form-legend'>Informations personnelles</legend>
                <input
                    type="text"
                    name="lastName"
                    id="last-name"
                    required
                    value={input.lastName}
                    onChange={handleChange}
                    placeholder='Nom'
                />

                <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    required
                    value={input.firstName}
                    onChange={handleChange}
                    placeholder='Prénom'
                />

                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={input.phone}
                    onChange={handleChange}
                    placeholder='Numéro de téléphone'
                />

                <input
                    type="date"
                    name="birthDate"
                    id="birth-date"
                    value={input.birthDate}
                    onChange={handleChange}
                    placeholder='Date de naissance'
                />

                <input
                    type="email"
                    name="email"
                    id="email"
                    value={input.email}
                    onChange={handleChange}
                    placeholder='Email'
                />

                <input
                    type="text"
                    name="address"
                    id="address"
                    value={input.address}
                    onChange={handleChange}
                    placeholder='Adresse'
                />

                <input
                    type="text"
                    name="postalCode"
                    id="postal-code"
                    value={input.postalCode}
                    onChange={handleChange}
                    placeholder='Code postal'
                />

                <input
                    type="text"
                    name="city"
                    id="city"
                    value={input.city}
                    onChange={handleChange}
                    placeholder='Ville'
                />

                <label
                    htmlFor="profile-picture"
                    id='profile-picture-container'
                >
                    <div className='img-upload'>
                        <img
                            src={previewImage || defaultPicture}
                            alt='profile-picture'
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </label>
                <input
                    type="file"
                    name="profilePicture"
                    id="profile-picture"
                    accept='image/*'
                    onChange={handleChange}
                    style={{ display: 'none' }}
                />


                <legend className='form-legend'>Préférences</legend>
                <textarea
                    name="sharedNotes"
                    id="shared-notes"
                    value={input.sharedNotes}
                    onChange={handleChange}
                    placeholder='Informations partagées avec le client'
                    rows={8}
                />

                <legend className='form-legend'>Notes du praticien</legend>
                <textarea
                    name="privateNotes"
                    id="private-notes"
                    value={input.privateNotes}
                    onChange={handleChange}
                    placeholder='Notes du praticien'
                    rows={5}
                />

                <button
                    type="submit"
                    id='save'
                    onClick={handleSubmit}
                >
                    Enregistrer
                </button>
            </StyledForm>
        </ClientAdd>
    )
}

const ClientAdd = StyledComponents.main`
    h2 {
        text-align: center;
        margin: 0; 
    }
`

const StyledForm = StyledComponents.form`
    display: grid; 
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
    row-gap: 0.5rem;
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 2rem;

    legend {
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: 1rem;

        &:first-of-type {
            grid-column: 1 / 3;
            grid-row: 1 / 2;
        }
    }
    
    label {
        &#profile-picture-container {
            grid-column: 2 / 3;
            grid-row: 2 / 6; 
            display: grid;
            border-radius: 50%;
              
            .img-upload {
                width: 200px;
                height: 200px;
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

        &#last-name, &#first-name, &#phone {
            grid-column: 1 / 2; 
        }

        &#address, &#email {
            grid-column: 1 / 3;
        }

        &#city {
            grid-column: 2 / 3;
        }

        &#postal-code {
            grid-column: 1 / 2;
        }
    }

    textarea {
        margin-top: 0.5rem;
        padding: 0.5rem;
        resize: none;
        
        &#shared-notes, &#private-notes {
            grid-column: 1 / 3; 
        }
    }

    button {
        margin-top: 1rem;
        padding: 0.5rem;

        &#save {
            grid-column: 1 / 3;
        }
    }

    #button-container {
        grid-column: 1 / 3;
        display: grid; 
        grid-template-columns: 1fr 1fr;
    }
`