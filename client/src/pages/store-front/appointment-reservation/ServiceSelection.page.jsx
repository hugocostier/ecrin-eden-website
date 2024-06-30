import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import StyledComponents from 'styled-components'
import { FormActions } from '../../../components/appointment-reservation/FormActions'
import { FormWrapper } from '../../../components/appointment-reservation/FormWrapper'
import { NextStep } from '../../../components/appointment-reservation/NextStep'
import { ServiceCard } from '../../../components/appointment-reservation/ServiceCard'
import { fetchServices } from '../../../data/admin/services.fetch'

export const ServiceSelectionPage = () => {
    const navigate = useNavigate()
    const { register, trigger, watch, setValue, formState: { errors, isValid } } = useFormContext()

    const [services, setServices] = useState([])
    const isAway = watch('isAway')

    useEffect(() => {
        fetchServices()
            .then((data) => {
                setServices(data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    const validateStep = async () => {
        await trigger()
        if (isValid) {
            navigate('/appointment/date')
        }
    }

    const Services = services.map((service) => (
        <ServiceCard
            key={service.id}
            service={service}
            watch={watch}
            setValue={setValue}
            register={register}
        />
    ))

    const toggleIsAway = () => {
        setValue('isAway', isAway === 'true' ? 'false' : 'true')
    }


    return (
        <FormWrapper
            title='Prestations'
            description='Choisissez une prestation parmi la liste suivante'
        >
            <ServiceSelectionContainer>
                <ServicesList>
                    {Services}
                </ServicesList>
                <AwaySelection>
                    <label>
                        <span className={isAway === 'false' ? 'selected' : ''}>Au salon</span>
                        <input
                            type='radio'
                            className='is-away'
                            value={'false'}
                            {...register('isAway', { required: 'Veuillez sélectionner une option' })}
                        />
                    </label>
                    <button
                        type='button'
                        onClick={toggleIsAway}
                        className={isAway === 'true' ? 'activated' : ''}
                    >
                        <div></div>
                    </button>
                    <label>
                        <span className={isAway === 'true' ? 'selected' : ''}>À domicile</span>
                        <input
                            type='radio'
                            className='is-away'
                            value={'true'}
                            {...register('isAway', { required: 'Veuillez sélectionner une option' })}
                        />
                    </label>
                </AwaySelection>
                <ErrorContainer>
                    {errors.service && <p className='error'>{errors.service.message}</p>}
                </ErrorContainer>
            </ServiceSelectionContainer>
            <FormActions>
                <NextStep validateStep={validateStep} />
            </FormActions>
        </FormWrapper>
    )
}

const ServiceSelectionContainer = StyledComponents.section`
    display: flex;
    flex-direction: column; 
    margin-top: 1.25rem; 

    @media screen and (min-width: 1024px) {
        margin-top: 1.5rem; 
    }
`

const ServicesList = StyledComponents.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: .75rem;

    @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
`

const AwaySelection = StyledComponents.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem; 
    border-radius: .5rem;
    padding: .7rem;

    label {
        span {
            font-size: .875rem;
            line-height: 1.25rem;
            font-weight: bold;
            color: var(--grey-300); 
            transition: color .3s cubic-bezier(.4,0,.2,1);

            &.selected {
                color: var(--tertiary-700);
            }
        }

        input {
            display: none;
        }
    }

    button {
        display: flex; 
        justify-content: flex-start;
        width: 40px; 
        height: 20px; 
        padding: .25rem; 
        border: none; 
        border-radius: 10px;
        background-color: var(--tertiary-500);
        cursor: pointer; 

        &.activated {
            justify-content: flex-end;
        }

        div {
            aspect-ratio: 1 / 1;
            height: 100%;
            border-radius: 50%;
            background-color: var(--white);
        }
    }

    @media screen and (min-width: 1024px) {
        label {
            span {
                font-size: 1rem;
                line-height: 1.5rem;
            }
        }
    }
`

const ErrorContainer = StyledComponents.div`
    margin-left: 1rem; 

    .error {
        font-size: .875rem;
        font-weight: bold; 
        letter-spacing: .125em; 
        color: var(--red); 
        margin: 0;
    }
`