import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import StyledComponents from 'styled-components'
import { FormActions } from '../../../components/appointment-reservation/FormActions'
import { FormWrapper } from '../../../components/appointment-reservation/FormWrapper'
import { NextStep } from '../../../components/appointment-reservation/NextStep'

export const ClientInformationPage = () => {
    const navigate = useNavigate()
    const { register, trigger, watch, formState: { errors, isValid } } = useFormContext()

    const isAway = watch('isAway')

    const validateStep = async () => {
        await trigger()
        if (isValid) {
            navigate('/appointment/confirm')
        }
    }

    return (
        <FormWrapper
            title='Vos informations'
            description='Veuillez renseigner vos informations personnelles pour finaliser votre rendez-vous'
        >
            <ClientInformationContainer>
                <div className='input-container' name='lastName'>
                    <div className='label-container'>
                        <label htmlFor='last-name'>Nom*</label>
                        {errors.lastName && <span className='error-message'>{errors.lastName.message}</span>}
                    </div>
                    <input
                        type='text'
                        name='lastName'
                        id='last-name'
                        placeholder='ex: Doe'
                        autoComplete='family-name'
                        className={errors.lastName ? 'error' : ''}
                        onBlur={() => trigger('lastName')}
                        {...register('lastName', { required: 'Veuillez entrer votre nom', pattern: { value: /^[a-zA-ZÀ-ÿ\s-]+$/, message: 'Veuillez entrer un nom valide' } })}
                    />
                </div>

                <div className='input-container' name='firstName'>
                    <div className='label-container'>
                        <label htmlFor='first-name'>Prénom*</label>
                        {errors.firstName && <span className='error-message'>{errors.firstName.message}</span>}
                    </div>
                    <input
                        type='text'
                        name='firstName'
                        id='first-name'
                        placeholder='ex: John'
                        autoComplete='given-name'
                        className={errors.firstName ? 'error' : ''}
                        onBlur={() => trigger('firstName')}
                        {...register('firstName', { required: 'Veuillez entrer votre prénom', pattern: { value: /^[a-zA-ZÀ-ÿ\s-]+$/, message: 'Veuillez entrer un prénom valide' } })}
                    />
                </div>

                <div className='input-container' name='phone'>
                    <div className='label-container'>
                        <label htmlFor='phone'>Téléphone</label>
                        {errors.phone && <span className='error-message'>{errors.phone.message}</span>}
                    </div>
                    <input
                        type='tel'
                        name='phone'
                        id='phone'
                        placeholder='ex: 0601020304'
                        autoComplete='tel'
                        className={errors.phone ? 'error' : ''}
                        onBlur={() => trigger('phone')}
                        {...register('phone', { pattern: { value: /^[0-9]{10}$/, message: 'Veuillez entrer un numéro de téléphone valide' } })}
                    />
                </div>

                <div className='input-container' name='email'>
                    <div className='label-container'>
                        <label htmlFor='email'>Email*</label>
                        {errors.email && <span className='error-message'>{errors.email.message}</span>}
                    </div>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='ex: adresse@mail.fr'
                        autoComplete='email'
                        className={errors.email ? 'error' : ''}
                        onBlur={() => trigger('email')}
                        {...register('email', { required: 'Veuillez entrer votre email', pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Veuillez entrer un email valide' } })}
                    />
                </div>

                {isAway === 'true' && (
                    <>
                        <div className='input-container' name='address'>
                            <div className='label-container'>
                                <label htmlFor='address'>Adresse*</label>
                                {errors.address && <span className='error-message'>{errors.address.message}</span>}
                            </div>
                            <input
                                type='text'
                                name='address'
                                id='address'
                                placeholder='ex : 1 rue de Rivoli'
                                autoComplete='street-address'
                                className={errors.address ? 'error' : ''}
                                onBlur={() => trigger('address')}
                                {...register('address', { required: 'Veuillez entrer votre adresse' })}
                            />
                        </div>

                        <div className='input-container' name='postalCode'>
                            <div className='label-container'>
                                <label htmlFor='postal-code'>Code postal*</label>
                                {errors.postalCode && <span className='error-message'>{errors.postalCode.message}</span>}
                            </div>
                            <input
                                type='text'
                                name='postalCode'
                                id='postal-code'
                                placeholder='ex: 75000'
                                autoComplete='postal-code'
                                className={errors.postalCode ? 'error' : ''}
                                onBlur={() => trigger('postalCode')}
                                {...register('postalCode', { required: 'Veuillez entrer votre code postal', pattern: { value: /^[0-9]{5}$/, message: 'Veuillez entrer un code postal valide' } })}
                            />
                        </div>

                        <div className='input-container' name='city'>
                            <div className='label-container'>
                                <label htmlFor='city'>Ville*</label>
                                {errors.city && <span className='error-message'>{errors.city.message}</span>}
                            </div>
                            <input
                                type='text'
                                name='city'
                                id='city'
                                placeholder='ex: Paris'
                                autoComplete='address-level2'
                                className={errors.city ? 'error' : ''}
                                onBlur={() => trigger('city')}
                                {...register('city', { required: 'Veuillez entrer votre ville', pattern: { value: /^[a-zA-ZÀ-ÿ\s-]+$/, message: 'Veuillez entrer une ville valide' } })}
                            />
                        </div>
                    </>
                )}
            </ClientInformationContainer>
            <FormActions>
                <Link to={'/appointment/time'} className='back-btn'>Retour</Link>
                <NextStep validateStep={validateStep} />
            </FormActions>
        </FormWrapper>
    )
}

const ClientInformationContainer = StyledComponents.section`
    display: flex;
    flex-direction: column;
    margin: 1rem 0;

    .input-container {
        display: flex;
        flex-direction: column;

        &:not(:first-child) {
            margin-top: 1rem;
        }

        .label-container {
            display: flex;
            justify-content: space-between;

            label, .error-message {
                text-transform: capitalize;
                letter-spacing: .025em;
                color: hsl(213 96% 18% / 1); 
                line-height: 1rem;
                font-size: .875rem;
                font-weight: bold;
            }

            .error-message {
                color: hsl(354 84% 57% / 1);
                text-transform: none;
            }
        }

        input {
            margin: 0; 
            margin-top: .25rem; 
            border-radius: 4px; 
            border: 1px solid hsl(229 24% 87% / 1);
            padding: .5rem .75rem; 
            color: hsl(213 96% 18% /1); 

            &.error {
                border-color: hsl(354 84% 57% / 1);
            }
        }
    }

    @media screen and (min-width: 1024px) {
        .input-container {

            .label-container {

                label {
                    line-height: 1.25rem;
                    font-size: 1rem;
                }

                .error-message {

                }
            }

            input {
                border-radius: .5rem; 
                padding: .75rem 1rem;
                line-height: 1.5rem;
                font-weight: bold; 
            }
        }
    }
`