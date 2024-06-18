import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Link } from 'react-router-dom'
import StyledComponents from 'styled-components'
import { FormActions } from '../../../components/appointment-reservation/FormActions'
import { FormWrapper } from '../../../components/appointment-reservation/FormWrapper'
import { NextStep } from '../../../components/appointment-reservation/NextStep'
import { fetchService } from '../../../data/admin/services.fetch'

export const AppointmentConfirmationPage = () => {
    const { watch } = useFormContext()
    const { service, date, time, lastName, firstName, phone, email, address, postalCode, city, isAway } = watch()

    const [serviceInfo, setServiceInfo] = useState([])

    const selectedDateString = new Date(watch('date')).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    useEffect(() => {
        if (!service) return

        fetchService(service)
            .then(service => {
                setServiceInfo(service)
            })
            .catch(error => {
                console.error('Error fetching service:', error)
            })
    }, [service])

    return (
        <FormWrapper
            title='Confirmation'
            description='Veuillez vérifier les informations de votre rendez-vous avant de le confirmer'
        >
            <ConfirmationContainer>
                <section className='review-container service-info'>
                    <div className='confirmation-item service-container'>
                        {!service
                            ? <span className='warning'>Choisissez un service</span>
                            : <span>{serviceInfo.name} ({serviceInfo.duration} minutes)</span>
                        }
                        <Link
                            to={`/appointment/service`}
                            className='update-link'
                        >
                            Modifier
                        </Link>
                    </div>
                </section>

                <section className='review-container appointment-info'>
                    <div className='confirmation-item appointment-container'>
                        {!date && !time
                            ? <span className='warning'>Choisissez également une date et une heure</span>
                            : <span className='date'>{selectedDateString} - {time}</span>
                        }
                        <span>{isAway === 'true' ? 'A domicile' : 'Au salon'}</span>
                        <Link
                            to={`/appointment/date`}
                            className='update-link'
                        >
                            Modifier
                        </Link>
                    </div>
                </section>

                <section className='review-container client-info'>
                    <div className='confirmation-item client-container'>
                        {firstName && lastName && <span>{firstName} {lastName}</span>}
                        {phone && <span>{phone}</span>}
                        {email && <span>{email}</span>}
                        <span>{isAway === 'true' ? (address && postalCode && city ? `${address}, ${postalCode} ${city}` : 'A domicile') : null}</span>
                        {!firstName || !lastName || !email ? <span className='warning'>Veuillez compléter vos informations personnelles</span> : null}
                        <Link
                            to={`/appointment/info`}
                            className='update-link'
                        >
                            Modifier
                        </Link>
                    </div>
                </section>
                <section className='pricing-info'>
                    <span>Total</span>
                    <div className='price-container'>
                        <span id='price'>{serviceInfo.price}€</span>
                        {isAway === 'true' && <span id='supplement-fee'>(+ supplément selon grille ServicePublic.fr)</span>}
                    </div>
                </section>
            </ConfirmationContainer>
            <FormActions>
                <Link to={'/appointment/info'} className='back-btn'>Retour</Link>
                <NextStep text='Confirmer' type='submit' className='submit-btn' />
            </FormActions>
        </FormWrapper>
    )
}

const ConfirmationContainer = StyledComponents.section`
    display: flex;
    flex-direction: column;
    margin: .5rem 0 1.5rem 0;

    .review-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .confirmation-item {
            display: flex;
            flex-direction: column;
            width: 100%;

            .date {
                text-transform: capitalize; 
            }

            span {
                line-height: 1.5rem; 

                &.warning {
                    font-weight: bold;
                    color: hsl(354 84% 57% / 1); 
                }
            }

            &.service-container {
                span {
                    font-weight: bold;
                    color: hsl(213 96% 18% / 1); 
                    font-size: 1.25rem;
                }
            }

            &.appointment-container, &.client-container {
                span {
                    color: hsl(231 11% 63% / 1); 
                }
            }
        }

        &.service-info {
            border-bottom: 2px solid hsl(229 24% 87% / 1);
            padding: 1rem 0; 
        }
    
        &.appointment-info {
            border-bottom: 1px solid hsl(229 24% 87% / 1);
        }

        &.appointment-info, &.client-info {
            padding: .75rem 0; 
        }
    }

    .update-link {  
        font-size: 0.875rem;
        font-weight: bold;
        text-decoration: underline;
        text-decoration-thickness: 2px;
        color: hsl(231 11% 63% / 1); 
        transition: color 0.3s cubic-bezier(.4, 0, .2, 1); 
        margin-top: .25rem; 

        &:hover {
            color: hsl(243 100% 62% / 1); 
        }
    }

    .pricing-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: .5rem; 

        span {
            font-weight: bold;
            color: hsl(231 11% 63% / 1);
            line-height: 1.25rem;
        }

        .price-container {
            display: flex;
            flex-direction: column;
            text-align: right;

            #price {
                font-weight: bold;
                color: hsl(213 96% 18% / 1);
                line-height: 1.25rem;
            }

            #supplement-fee {
                font-size: 0.75rem;
                color: hsl(231 11% 63% / 1);
                line-height: 1rem;
            }
        }
    }

    @media screen and (min-width: 1024px) {

    }
`