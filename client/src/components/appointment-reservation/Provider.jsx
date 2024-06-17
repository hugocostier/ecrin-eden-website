import PropTypes from 'prop-types'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import { addAppointment } from '../../data/appointments/appointments.fetch'

export const Provider = ({ children }) => {
    const navigate = useNavigate()

    const methods = useForm({
        defaultValues: {
            isAway: 'false',
        }
    })

    const validationProcess = (data) => {
        const validService = data.service && data.duration
        const validDate = data.date
        const validTime = data.time
        const validAppointment = validService && validDate && validTime
        const validClient = data.firstName && data.lastName && data.email
        const validAddress = data.address && data.postalCode && data.city

        const isAway = data.isAway === 'true' ? true : false
        const isValid = isAway ? validAppointment && validClient && validAddress : validAppointment && validClient

        switch (true) {
            case !validService:
                alert('Vous devez d\'abord choisir une prestation')
                navigate('/appointment/service', { replace: true })
                break
            case !validDate:
                alert('Vous devez d\'abord choisir une date')
                navigate('/appointment/date', { replace: true })
                break
            case !validTime:
                alert('Vous devez d\'abord choisir un créneau horaire')
                navigate('/appointment/time', { replace: true })
                break
            case !validClient:
                alert('Vous devez d\'abord renseigner vos informations personnelles')
                navigate('/appointment/info', { replace: true })
                break
            case isAway && !validAddress:
                alert('Vous devez d\'abord renseigner votre adresse')
                navigate('/appointment/info', { replace: true })
                break
            case !isValid:
                alert('Vous devez d\'abord renseigner toutes les informations')
                navigate('/appointment/info', { replace: true })
                break
            default:
                return true
        }
    }

    const sendForm = async (data) => {
        const isValid = validationProcess(data)

        if (isValid) {
            toast.promise(addAppointment(data), {
                pending: 'Creating appointment...',
                success: 'Appointment created!',
                error: 'Error creating appointment',
            })
                .then(() => navigate('/appointment/thank-you'))
                .catch(error => {
                    console.error('Error creating appointment:', error)
                })
        }
    }

    return (
        <FormProvider {...methods}>
            <ReservationForm onSubmit={methods.handleSubmit(sendForm)}>
                {children}
            </ReservationForm>
        </FormProvider>
    )
}

Provider.propTypes = {
    children: PropTypes.node.isRequired,
}

const ReservationForm = StyledComponents.form`
    display: flex; 
    width: 100%; 
    z-index: 1;
`