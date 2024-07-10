import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import { FormError } from '../../../../components/FormError'
import { fetchServices } from '../../../../data/admin/services.fetch'
import { fetchAppointment, updateAppointment } from '../../../../data/appointments/appointments.fetch'
import { checkAvailability } from '../../../../utils/appointment/appointmentAvailability.util'
import { capitalize } from '../../../../utils/capitalize.util'

export const UpdateAppointment = () => {
    const { id: appointmentID } = useParams()
    const navigate = useNavigate()

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()

    const [times, setTimes] = useState([])
    const [services, setServices] = useState([])
    const [isEditable, setIsEditable] = useState(false)
    const [appointment, setAppointment] = useState([])
    const [available, setAvailable] = useState(true)
    const selectedDate = watch('date')
    const selectedService = services.find(service => service.id == watch('service'))

    useEffect(() => {
        fetchServices()
            .then(services => {
                setServices(services)
            })
            .catch(error => {
                console.error('Error fetching services:', error)
            })

        fetchAppointment(appointmentID)
            .then(fetchedAppointment => {
                setAppointment(fetchedAppointment.data)
                reset({
                    service: fetchedAppointment.data.service.id,
                    date: fetchedAppointment.data.date,
                    time: fetchedAppointment.data.time,
                    isAway: fetchedAppointment.data.is_away
                })
            })
            .catch(error => {
                console.error('Error fetching appointment:', error)
            })

        return () => {
            setAppointment([])
            setServices([])
        }
    }, [appointmentID, reset])

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
    }, [selectedService, selectedDate])

    const handleCancel = () => {
        reset({
            service: appointment.service.id,
            date: appointment.date,
            time: appointment.time,
            isAway: appointment.is_away
        })

        setIsEditable(false)
    }

    const sendForm = async (data) => {
        const input = {
            serviceID: data.service,
            date: data.date,
            time: data.time,
            isAway: data.isAway
        }

        toast.promise(updateAppointment(appointmentID, input), {
            pending: 'Modification...',
            success: 'Rendez-vous modifié !',
            error: 'Erreur lors de la modification du rendez- vous'
        }, { containerId: 'notification' })
            .then(() => {
                reset()
                const currentPath = window.location.pathname
                navigate(currentPath.replace(`/update/${appointment.id}`, `/${appointment.id}`))
            })
            .catch(error => {
                console.error('Error updating appointment:', error)
            })
    }

    const isStillAvailable = (time, duration) => {
        if (times.length === 0) {
            return false
        }

        const givenTime = new Date()
        givenTime.setHours(time.slice(0, 2))
        givenTime.setMinutes(time.slice(3, 5))

        const updatedTime = new Date(givenTime)
        updatedTime.setMinutes(givenTime.getMinutes() + duration)

        if (times.includes(time) && times.includes(updatedTime)) {
            return true
        }

        return false
    }

    return (
        <main>
            <h2>Modifier le rendez-vous</h2>

            <StyledForm onSubmit={handleSubmit(sendForm)}>
                <legend>Informations du rendez-vous</legend>
                <div className='input-container' name='client'>
                    <p>Client :</p>
                    <p>{appointment.client ? `${capitalize(appointment.client.first_name)} ${capitalize(appointment.client.last_name)}` : ''}</p>
                </div>

                <label htmlFor='service'>Prestation :</label>
                <div className='input-container' name='service'>
                    <select
                        name='service'
                        id='service'
                        {...register('service', { required: 'Veuillez choisir une prestation', disabled: !isEditable, onBlur: () => setAvailable(isStillAvailable(appointment.time, selectedService.duration)) })}
                    >
                        {services.map(service => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                    <FormError error={errors.service} />
                </div>

                <div className='input-container' name='duration'>
                    <p>Durée :</p>
                    <p>
                        {selectedService && (
                            `${selectedService.duration} minutes`
                        ) || (`${appointment.service?.duration} minutes` || '')}
                    </p>
                </div>

                <label htmlFor='date'>Date :</label>
                <div className='input-container' name='date'>
                    <input
                        type='date'
                        name='date'
                        id='date'
                        {...register('date', { required: 'Veuillez choisir une date', disabled: !isEditable })}
                    />
                    <FormError error={errors.date} />
                </div>

                <label htmlFor='time'>Heure :</label>
                <div className='input-container' name='time'>
                    <select
                        name='time'
                        id='time'
                        {...register('time', { required: 'Veuillez choisir une heure', disabled: !isEditable })}
                    >
                        {appointment.time && !times.includes(appointment.time) && available && (
                            <option value={appointment.time}>{appointment.time?.slice(0, 5)}</option>
                        )}
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
                        {...register('isAway', { disabled: !isEditable })}
                    >
                        <option value='true'>Oui</option>
                        <option value='false'>Non</option>
                    </select>
                    <FormError error={errors.isAway} />
                </div>

                {!isEditable ? (
                    <button
                        type='button'
                        id='edit'
                        onClick={() => appointment.status !== 'cancelled' ? setIsEditable(true) : null}
                        style={appointment.status === 'cancelled' ? { cursor: 'not-allowed' } : null}
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
            </StyledForm>
        </main >
    )
}

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
    
    .input-container {
        input, select, textarea {
            padding: 0.5rem;
            width: 100%;

            &:focus {
                outline-color: var(--primary-400);
            }
        }

        select, input[type='date'] {
            cursor: pointer; 
        }

        textarea { 
            resize: none; 
        }
    }

    button {
        margin-top: 1rem;
        padding: 0.5rem;
        cursor: pointer;
        background: var(--quaternary-400);
        border: 1px solid var(--quaternary-900);

        &:hover {
            background: var(--quaternary-600);
        }
    }

    #button-container {
        display: grid; 
        grid-template-columns: 1fr 1fr;
        column-gap: 1rem;
    }

    @media screen and (min-width: 640px) {
        grid-template-columns: repeat(3, 1fr);
        column-gap: 1rem;

        legend {
            text-align: left;
            grid-column: 1 / 4;
        }

        .input-container:not([name='client'], [name='duration']) {
            grid-column: 1 / 4;
        }

        .input-container[name='client'], 
        .input-container[name='duration'] {
            grid-column: 1 / 4;
            display: flex; 
            gap: 1rem; 
        }

        textarea {            
            &#private-notes {
                grid-column: 1 / 4; 
            }
        }

        button {    
            &#edit {
                grid-column: 1 / 4;
            }
        }

        #button-container {
            column-gap: 2rem;
            grid-column: 1 / 4;
        }
    }
`