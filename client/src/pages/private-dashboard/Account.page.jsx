import { useEffect, useState } from 'react'
import StyledComponents from 'styled-components'
import defaultPicture from '../../assets/images/default-profile-picture.png'
import { fetchAccount } from '../../data/account.fetch'
import { useAuth } from '../../hooks/useAuth.hook'
import { useClientInfo } from '../../hooks/useClientInfo.hook'

export const AccountPage = () => {
    const client = useClientInfo()
    const user = useAuth()

    const [isEditable, setIsEditable] = useState(false)
    const [input, setInput] = useState({
        lastName: '',
        firstName: '',
        phone: '',
        address: '',
        zipCode: '',
        city: '',
        email: '',
        profilePicture: '',
        sharedInfo: '',
    })

    useEffect(() => {
        if (user.user.id && client.id) {
            fetchAccount(user.user.id, client.id)
                .then((data) => {
                    setInput({
                        lastName: data.data.lastName ? data.data.lastName : '',
                        firstName: data.data.firstName ? data.data.firstName : '',
                        phone: data.data.phone ? data.data.phone : '',
                        address: data.data.address ? data.data.address : '',
                        zipCode: data.data.postalCode ? data.data.postalCode : '',
                        city: data.data.city ? data.data.city : '',
                        email: data.data.email ? data.data.email : '',
                        password: data.data.password ? data.data.password : '',
                        passwordConfirm: '',
                        profilePicture: data.data.profilePicture ? data.data.profilePicture : '',
                        sharedInfo: data.data.sharedNotes ? data.data.sharedNotes : '',
                    })
                })
                .catch((error) => {
                    console.error('Error fetching data:', error)
                })
        }

        return () => {
            setInput({
                lastName: '',
                firstName: '',
                phone: '',
                address: '',
                zipCode: '',
                city: '',
                email: '',
                profilePicture: '',
                sharedInfo: '',
            })
        }
    }, [user.user.id, client.id])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const handleCancel = () => {
        setInput({
            lastName: '',
            firstName: '',
            phone: '',
            address: '',
            zipCode: '',
            city: '',
            email: '',
            profilePicture: '',
            sharedInfo: '',
        })

        setIsEditable(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
    }

    return (
        <AccountContainer>
            <h2>Mon compte</h2>

            <AccountForm>
                {/* <label htmlFor="last-name">Nom</label> */}
                <input
                    type="text"
                    name="lastName"
                    id="last-name"
                    value={input.lastName}
                    onChange={handleChange}
                    disabled={!isEditable}
                // placeholder='Nom'
                />

                {/* <label htmlFor="first-name">Prénom</label> */}
                <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    value={input.firstName}
                    onChange={handleChange}
                    disabled={!isEditable}
                // placeholder='Prénom'
                />

                {/* <label htmlFor="phone">Téléphone</label> */}
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={input.phone}
                    onChange={handleChange}
                    disabled={!isEditable}
                // placeholder='Téléphone'
                />

                {/* <label htmlFor="email">Email</label> */}
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={input.email}
                    onChange={handleChange}
                    disabled={!isEditable}
                // placeholder='Email'
                />

                {/* <label htmlFor="address">Adresse</label> */}
                <input
                    type="text"
                    name="address"
                    id="address"
                    value={input.address}
                    onChange={handleChange}
                    disabled={!isEditable}
                // placeholder='Adresse'
                />

                {/* <label htmlFor="zip-code">Code postal</label> */}
                <input
                    type="text"
                    name="zipCode"
                    id="zip-code"
                    value={input.zipCode}
                    onChange={handleChange}
                    disabled={!isEditable}
                // placeholder='Code postal'
                />

                {/* <label htmlFor="city">Ville</label> */}
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={input.city}
                    onChange={handleChange}
                    disabled={!isEditable}
                // placeholder='Ville'
                />

                <label
                    htmlFor="profile-picture"
                    id='profile-picture-container'
                    style={{ cursor: isEditable ? 'pointer' : 'default' }}
                >
                    <img src={input.profilePicture ? input.profilePicture : defaultPicture} alt='profile-picture' />
                </label>
                <input
                    type="file"
                    name="profilePicture"
                    id="profile-picture"
                    accept='image/*'
                    value={input.profilePicture}
                    onChange={handleChange}
                    disabled={!isEditable}
                    style={{ display: 'none' }}
                />

                {/* <label htmlFor="shared-info">Informations partagées</label> */}
                <textarea
                    name="sharedInfo"
                    id="shared-info"
                    value={input.sharedInfo}
                    onChange={handleChange}
                    disabled={!isEditable}
                // placeholder='Informations partagées'
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

            <button
                type="button"
            >
                Supprimer mon compte
            </button>
        </AccountContainer >
    )
}

const AccountContainer = StyledComponents.main`
    padding: 20px; 
`

const AccountForm = StyledComponents.form`
    display: grid; 
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
    row-gap: 0.5rem;
    max-width: 1000px;
    margin: 0 auto;
    
    label {
        &#profile-picture-container {
            grid-column: 2 / 3;
            grid-row: 1 / 4; 

            display: grid;
            grid-template-columns: repeat(3, 1fr);
            align-items: center;
            justify-items: center;
            
            img {
                grid-column: 2 / 3;
                width: 100%;
                object-fit: cover;
            }
        }
    }

    input {
        margin-top: 0.5rem;
        padding: 0.5rem;
        width: 100%;

        &#last-name, &#first-name, &#phone {
            grid-column: 1 / 2; 
        }

        &#address, &#email {
            grid-column: 1 / 3;
        }

        &#city {
            grid-column: 2 / 3;
        }

        &#zip-code {
            grid-column: 1 / 2;
        }
    }

    textarea {
        margin-top: 0.5rem;
        padding: 0.5rem;
        
        &#shared-info {
            grid-column: 1 / 3; 
        }
    }

    button {
        margin-top: 1rem;
        padding: 0.5rem;

        &#edit {
            grid-column: 1 / 3;
        }
    }

    #button-container {
        grid-column: 1 / 3;
        display: grid; 
        grid-template-columns: 1fr 1fr;
    }
`