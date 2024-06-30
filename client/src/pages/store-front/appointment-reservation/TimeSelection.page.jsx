import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import StyledComponents from 'styled-components'
import { FormActions } from '../../../components/appointment-reservation/FormActions'
import { FormWrapper } from '../../../components/appointment-reservation/FormWrapper'
import { NextStep } from '../../../components/appointment-reservation/NextStep'
import { TimeCard } from '../../../components/appointment-reservation/TimeCard'
import { checkAvailability } from '../../../utils/appointment/appointmentAvailability.util'

export const TimeSelectionPage = () => {
    const navigate = useNavigate()
    const { register, trigger, watch, formState: { errors, isValid } } = useFormContext()

    const [times, setTimes] = useState([])

    const selectedDate = watch('date')
    const selectedDateString = new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    useEffect(() => {
        const service = {
            id: watch('service'),
            duration: watch('duration')
        }

        if (service && selectedDate) {
            checkAvailability(service, selectedDate)
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
    }, [selectedDate, watch])

    const validateStep = async () => {
        await trigger()
        if (isValid) {
            navigate('/appointment/info')
        }
    }

    const Times = times.map(time => (
        <TimeCard
            key={time}
            time={time}
            watch={watch}
            register={register}
        />
    ))

    return (
        <FormWrapper
            title='Heure'
            description='Choisissez une heure pour votre rendez-vous'
        >
            <TimeSelectionContainer>
                <SelectedDate>
                    {selectedDate ? selectedDateString : 'Aucune date sélectionnée'}
                </SelectedDate>
                <TimesList>
                    {times.length === 0 ? (
                        <>
                            <p className='no-times'>Aucune créneau horaire disponible pour cette date</p>
                            <input
                                type='hidden'
                                name='time'
                                {...register('time', { required: selectedDate ? 'Veuillez choisir une autre date' : 'Veuillez d\'abord choisir une date' })}
                            />
                        </>
                    ) : (
                        Times
                    )}
                </TimesList>
                <ErrorContainer>
                    {errors.time && <p className='error'>{errors.time.message}</p>}
                </ErrorContainer>
            </TimeSelectionContainer>
            <FormActions>
                <Link to={'/appointment/date'} className='back-btn'>Retour</Link>
                <NextStep validateStep={validateStep} />
            </FormActions>
        </FormWrapper>
    )
}

const TimeSelectionContainer = StyledComponents.section`
    display: flex;
    flex-direction: column; 
    margin-top: 1.25rem; 

    @media screen and (min-width: 1024px) {
        margin-top: 1.5rem; 
    }
`

const SelectedDate = StyledComponents.h3`
    font-family: var(--body-font);  
    font-size: 1.25rem;
    text-align: center; 
    text-transform: capitalize;
`

const TimesList = StyledComponents.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));

    .no-times {
        grid-column: 1 / -1;
        text-align: center;
    }

    @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
`

const ErrorContainer = StyledComponents.div`
    margin-left: 1rem; 

    .error {
        font-size: .875rem;
        font-weight: bold; 
        letter-spacing: .125em; 
        line-height: 1.24rem; 
        color: var(--red); 
    }
`