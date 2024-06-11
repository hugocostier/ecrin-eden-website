import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import { FormError } from '../../../../components/FormError'
import { fetchClients } from '../../../../data/admin/clients.fetch'
import { fetchServices } from '../../../../data/admin/services.fetch'
import { addAppointment } from '../../../../data/appointments/appointments.fetch'
import { checkAvailability } from '../../../../utils/appointment/appointment.util'
import { capitalize } from '../../../../utils/capitalize.util'

export const AddAppointment = () => {
    const navigate = useNavigate()

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()

    const [times, setTimes] = useState([])
    const [clients, setClients] = useState([])
    const [services, setServices] = useState([])
    const selectedDate = watch('date')
    const selectedService = services.find(service => service.id == watch('service'))

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
    }, [selectedDate, selectedService])

    const sendForm = async (data) => {
        const input = {
            clientID: data.client,
            serviceID: data.service,
            date: data.date,
            time: data.time,
            status: data.status,
            isAway: data.isAway,
        }

        toast.promise(addAppointment(input), {
            pending: 'Ajout...',
            success: 'Rendez-vous ajouté !',
            error: 'Erreur lors de l\'ajout du rendez-vous'
        }, { containerId: 'notification' })
            .then(() => {
                reset()
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

            <StyledForm onSubmit={handleSubmit(sendForm)}>
                <legend>Informations de la prestation</legend>
                <label htmlFor='service'>Prestation :</label>
                <div className='input-container' name='service'>
                    <select
                        name='service'
                        id='service'
                        {...register('service', { required: 'Veuillez choisir une prestation' })}
                    >
                        <option value=''>Choisir une prestation dans la liste déroulante...</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                    <FormError error={errors.service} />
                </div>

                <div className='service-info-container'>
                    <div className='input-container' name='duration'>
                        <p>Durée :</p>
                        <p>
                            {selectedService && (
                                `${selectedService.duration} minutes`
                            ) || 'Aucune durée disponible'}
                        </p>
                    </div>

                    <div className='input-container' name='price'>
                        <p>Prix :</p>
                        <p>
                            {selectedService && (
                                `${selectedService.price} €`
                            ) || 'Aucun prix disponible'}
                        </p>
                    </div>
                </div>

                <legend>Informations du rendez-vous</legend>
                <label htmlFor='client'>Client :</label>
                <div className='input-container' name='client'>
                    <select
                        name='client'
                        id='client'
                        {...register('client', { required: 'Veuillez choisir un client' })}
                    >
                        <option value=''>Choisir un client dans la liste déroulante...</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>{capitalize(client.first_name)} {capitalize(client.last_name)}</option>
                        ))}
                    </select>
                    <FormError error={errors.client} />
                </div>

                <label htmlFor='date'>Date :</label>
                <div className='input-container' name='date'>
                    <input
                        type='date'
                        name='date'
                        id='date'
                        {...register('date', { required: 'Veuillez choisir une date' })}
                    />
                    <FormError error={errors.date} />
                </div>

                <label htmlFor='time'>Heure :</label>
                <div className='input-container' name='time'>
                    <select
                        name='time'
                        id='time'
                        {...register('time', { required: 'Veuillez choisir une heure' })}
                    >
                        <option value=''>Choisir une heure dans la liste déroulante...</option>
                        {times.length === 0 && (
                            <option value=''>Aucun créneau disponible</option>
                        )}
                        {times.length !== 0 && times.map(time => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                    <FormError error={errors.time} />
                </div>

                <label htmlFor='is-away'>Rendez-vous à domicile ?</label>
                <div className='input-container' name='isAway'>
                    <select
                        name='isAway'
                        id='is-away'
                        {...register('isAway')}
                    >
                        <option value='false'>Non</option>
                        <option value='true'>Oui</option>
                    </select>
                    <FormError error={errors.isAway} />
                </div>

                <label htmlFor='status'>Statut du rendez-vous :</label>
                <div className='input-container' name='status'>
                    <select
                        name='status'
                        id='status'
                        {...register('status')}
                    >
                        <option value=''>Choisir un statut dans la liste déroulante...</option>
                        <option value='pending'>En attente</option>
                        <option value='confirmed'>Confirmé</option>
                        <option value='cancelled'>Annulé</option>
                        <option value='completed'>Terminé</option>
                    </select>
                    <FormError error={errors.status} />
                </div>

                <button
                    type='submit'
                    id='save'
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
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 2rem;

    legend {
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .service-info-container {
        .input-container {
            display: flex; 
            gap: 1rem; 
        }
    }
    
    .input-container {
        input, select {
            padding: 0.5rem;
            width: 100%;
        }
    }

    button {
        margin-top: 1rem;
        padding: 0.5rem;
    }

    @media screen and (min-width: 640px) {
        grid-template-columns: repeat(3, 1fr);
        column-gap: 1rem;

        legend {
            text-align: left;
            grid-column: 1 / 4;
        }

        .input-container:not([name='duration'], [name='price']) {
            grid-column: 2 / 4; 
        }

        .service-info-container {
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            grid-column: 1 / 4;

            .input-container {
                &:is[name='duration'] {
                    grid-column: 1 / 2;
                }

                &:is[name='price'] {
                    grid-column: 2 / 3;
                }
            }
        }

        button {    
            &#save {
                grid-column: 1 / 4;
            }
        }
    }
`