import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import { fetchAppointment, updateAppointment } from '../../../../data/appointments/appointments.fetch'

export const UpdateAppointment = () => {
    const { id: appointmentID } = useParams()
    const navigate = useNavigate()

    const [isEditable, setIsEditable] = useState(false)
    const [appointment, setAppointment] = useState([])

    const [input, setInput] = useState({
        date: '',
        time: '',
        status: '',
        isAway: false,
        privateNotes: '',
    })

    useEffect(() => {
        fetchAppointment(appointmentID)
            .then(fetchedAppointment => {
                setAppointment(fetchedAppointment.data)
                setInput({
                    date: fetchedAppointment.data.date,
                    time: fetchedAppointment.data.time,
                    status: fetchedAppointment.data.status,
                    isAway: fetchedAppointment.data.is_away,
                    privateNotes: fetchedAppointment.data.private_notes ? fetchedAppointment.data.private_notes : '',
                })
            })
            .catch(error => {
                console.error('Error fetching appointment:', error)
            })

        return () => {
            setAppointment([])
        }
    }, [appointmentID])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const handleCancel = () => {
        setInput({
            date: appointment.date,
            time: appointment.time,
            status: appointment.status,
            isAway: appointment.is_away,
            privateNotes: appointment.private_notes ? appointment.private_notes : '',
        })

        setIsEditable(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        toast.promise(updateAppointment(appointmentID, input), {
            pending: 'Modification...',
            success: 'Rendez-vous modifié !',
            error: 'Erreur lors de la modification du rendez- vous'
        }, { containerId: 'notification' })
            .then(() => {
                setInput({
                    date: '',
                    time: '',
                    status: '',
                    isAway: false,
                    privateNotes: '',
                })

                navigate(-1)
            })
            .catch(error => {
                console.error('Error updating appointment:', error)
            })
    }

    return (
        <main>
            <h2>Modifier le rendez-vous</h2>

            <StyledForm>
                <legend>Informations du rendez-vous</legend>
                <p>Client :</p>
                <p>{appointment.client ? `${appointment.client.first_name} ${appointment.client.last_name}` : ''}</p>

                <label htmlFor='date'>Date :</label>
                <input
                    type='date'
                    name='date'
                    id='date'
                    required
                    value={input.date}
                    onChange={handleChange}
                    disabled={!isEditable}
                />

                <label htmlFor='time'>Heure :</label>
                <input
                    type='time'
                    name='time'
                    id='time'
                    required
                    value={input.time}
                    onChange={handleChange}
                    disabled={!isEditable}
                />

                <label htmlFor='is-away'>Rendez-vous à domicile ?</label>
                <select
                    name='isAway'
                    id='is-away'
                    value={input.isAway}
                    onChange={handleChange}
                    disabled={!isEditable}
                >
                    <option
                        value='true'
                    >
                        Oui
                    </option>
                    <option
                        value='false'
                    >
                        Non
                    </option>
                </select>


                <label htmlFor='status'>Statut du rendez-vous :</label>
                <select
                    name='status'
                    id='status'
                    value={input.status}
                    onChange={handleChange}
                    disabled={!isEditable}
                >
                    <option
                        value='pending'
                    >
                        En attente
                    </option>
                    <option
                        value='confirmed'
                    >
                        Confirmé
                    </option>
                    <option
                        value='cancelled'
                    >
                        Annulé
                    </option>
                    <option
                        value='completed'
                    >
                        Terminé
                    </option>
                </select>


                <legend className='form-legend'>Notes personnelles</legend>
                <textarea
                    name='privateNotes'
                    id='private-notes'
                    value={input.privateNotes}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Notes du praticien'
                    spellCheck='true'
                    rows={5}
                />


                {!isEditable && (
                    <button
                        type='button'
                        id='edit'
                        onClick={() => setIsEditable(true)}
                    >
                        Modifier
                    </button>
                )}

                {isEditable && (
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
                            onClick={handleSubmit}
                        >
                            Enregistrer
                        </button>
                    </div>
                )}
            </StyledForm>
        </main>
    )
}

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