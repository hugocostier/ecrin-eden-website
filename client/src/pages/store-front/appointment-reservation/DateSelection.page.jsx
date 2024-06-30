import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import StyledComponents from 'styled-components'
import { CalendarPicker } from '../../../components/appointment-reservation/CalendarPicker'
import { FormActions } from '../../../components/appointment-reservation/FormActions'
import { FormWrapper } from '../../../components/appointment-reservation/FormWrapper'
import { NextStep } from '../../../components/appointment-reservation/NextStep'

export const DateSelectionPage = () => {
    const navigate = useNavigate()
    const { register, trigger, setValue, watch, formState: { errors, isValid } } = useFormContext()

    const selectedDate = watch('date')

    const validateStep = async () => {
        await trigger()
        if (isValid) {
            navigate('/appointment/time')
        }
    }

    return (
        <FormWrapper
            title='Date'
            description='Choisissez une date pour votre rendez-vous'
        >
            <DateSelectionContainer>
                <CalendarPicker register={register} setValue={setValue} selectedDate={selectedDate} />
                <ErrorContainer>
                    {errors.date && <p className='error'>{errors.date.message}</p>}
                </ErrorContainer>
            </DateSelectionContainer>
            <FormActions>
                <Link to={'/appointment/service'} className='back-btn'>Retour</Link>
                <NextStep validateStep={validateStep} />
            </FormActions>
        </FormWrapper>
    )
}

const DateSelectionContainer = StyledComponents.section`
    
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