import { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import { fetchClients } from '../../../../data/admin/clients.fetch'
import { fetchServices } from '../../../../data/admin/services.fetch'
import { addAppointment } from '../../../../data/appointments/appointments.fetch'
import { checkAvailability } from '../../../../utils/appointment.util'

export const AddAppointment = () => {
    const navigate = useNavigate()

    // const { register, handleSubmit, reset, formState: { errors } } = useForm({
    //     defaultValues: {
    //         client: '',
    //         service: '',
    //         date: '',
    //         time: '',
    //         status: '',
    //         isAway: false,
    //     }
    // })

    const [times, setTimes] = useState([])
    const [clients, setClients] = useState([])
    const [services, setServices] = useState([])
    const [searchParams, setSearchParams] = useSearchParams({
        client: '',
        service: '',
        date: '',
        time: '',
        status: '',
        isAway: false,
    })
    const selectedDate = searchParams.get('date')
    const selectedService = services.find(service => service.id == searchParams.get('service'))

    useEffect(() => {
        fetchClients()
            .then(clients => {
                setClients(clients)
            })
            .catch(error => {
                console.error('Error fetching clients:', error)
            })

        fetchServices()
            .then(services => {
                setServices(services)
            })
            .catch(error => {
                console.error('Error fetching services:', error)
            })

        return () => {
            setClients([])
            setServices([])
        }
    }, [])

    useEffect(() => {
        if (selectedService && selectedDate) {
            checkAvailability(selectedService, selectedDate)
                .then(availableTimes => {
                    setTimes(availableTimes)
                })
                .catch(error => {
                    console.error('Error checking availability:', error)
                })
        }

        return () => {
            setTimes([])
        }
    }, [selectedDate, selectedService, services])

    const handleChange = (e) => {
        setSearchParams(prev => {
            prev.set(e.target.name, e.target.value)
            return prev
        }, { replace: true })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const input = {
            clientID: searchParams.get('client'),
            serviceID: searchParams.get('service'),
            date: searchParams.get('date'),
            time: searchParams.get('time'),
            status: searchParams.get('status'),
            isAway: searchParams.get('isAway'),
        }

        toast.promise(addAppointment(input), {
            pending: 'Ajout...',
            success: 'Rendez-vous ajouté !',
            error: 'Erreur lors de l\'ajout du rendez-vous'
        }, { containerId: 'notification' })
            .then(() => {
                setSearchParams({
                    client: '',
                    service: '',
                    date: '',
                    time: '',
                    status: '',
                    isAway: false,
                })

                const currentPath = window.location.pathname
                navigate(currentPath.replace('/add', ''))
            })
            .catch(error => {
                console.error('Error adding appointment:', error)
            })
    }

    return (
        <AppointmentAdd>
            <h2>Ajouter un rendez-vous</h2>

            <StyledForm>
                <legend>Informations de la prestation</legend>
                <label htmlFor='service'>Prestation :</label>
                <select
                    name='service'
                    id='service'
                    value={searchParams.get('service')}
                    onChange={handleChange}
                >
                    <option value=''>Choisir une prestation dans la liste déroulante...</option>
                    {services.map(service => (
                        <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                </select>

                <p>Durée :</p>
                <p>
                    {selectedService && (
                        `${selectedService.duration} minutes`
                    )}
                </p>

                <p>Prix :</p>
                <p>
                    {selectedService && (
                        `${selectedService.price} €`
                    )}
                </p>

                <legend>Informations du rendez-vous</legend>
                <label htmlFor='client'>Client :</label>
                <select
                    name='client'
                    id='client'
                    value={searchParams.get('client')}
                    onChange={handleChange}
                >
                    <option value=''>Choisir un client dans la liste déroulante...</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.first_name} {client.last_name}</option>
                    ))}
                </select>

                <label htmlFor='date'>Date :</label>
                <input
                    type='date'
                    name='date'
                    id='date'
                    required
                    value={searchParams.get('date')}
                    onChange={handleChange}
                />

                <label htmlFor='time'>Heure :</label>
                <select
                    name='time'
                    id='time'
                    value={searchParams.get('time')}
                    onChange={handleChange}
                    required
                >
                    <option value=''>Choisir une heure dans la liste déroulante...</option>
                    {times.length === 0 && (
                        <option value=''>Aucun créneau disponible</option>
                    )}
                    {times.length !== 0 && times.map(time => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>

                <label htmlFor='is-away'>Rendez-vous à domicile ?</label>
                <select
                    name='isAway'
                    id='is-away'
                    value={searchParams.get('isAway')}
                    onChange={handleChange}
                >
                    <option value='true'>Oui</option>
                    <option value='false'>Non</option>
                </select>


                <label htmlFor='status'>Statut du rendez-vous :</label>
                <select
                    name='status'
                    id='status'
                    value={searchParams.get('status')}
                    onChange={handleChange}
                >
                    <option value=''>Choisir un statut dans la liste déroulante...</option>
                    <option value='pending'>En attente</option>
                    <option value='confirmed'>Confirmé</option>
                    <option value='cancelled'>Annulé</option>
                    <option value='completed'>Terminé</option>
                </select>

                <button
                    type='submit'
                    id='save'
                    onClick={handleSubmit}
                >
                    Enregistrer
                </button>
            </StyledForm>
        </AppointmentAdd>
    )
}

const AppointmentAdd = StyledComponents.main`
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
            &#shared-notes, &#private-notes{
                grid-column: 1 / 3; 
            }
        }

        button {    
            &#save {
                grid-column: 1 / 3;
            }
        }

        #button-container {
            grid-column: 1 / 3;
        }
    }
`