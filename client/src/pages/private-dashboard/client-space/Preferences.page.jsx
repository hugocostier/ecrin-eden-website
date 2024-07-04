import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import { FormError } from '../../../components/FormError'
import { fetchClientPreferences, updateClientPreferences } from '../../../data/admin/preferences.fetch'
import { useClientInfo } from '../../../hooks/useClientInfo.hook'

export const UserPreferences = () => {
    const navigate = useNavigate()
    const client = useClientInfo()
    const [isEditable, setIsEditable] = useState(false)
    const [preferences, setPreferences] = useState({})

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    useEffect(() => {
        if (!client.id) return

        fetchClientPreferences(client.id)
            .then(preferences => {
                setPreferences(preferences)
                reset({
                    question1: preferences.question_1 || '',
                    question2: preferences.question_2 || '',
                    question3: preferences.question_3 || '',
                    question4: preferences.question_4 || '',
                    question5: preferences.question_5 || '',
                })
            })
            .catch(error => {
                console.error('Error fetching client preferences:', error)
            })

        return () => {
            setPreferences({})
        }
    }, [client.id, reset])

    const handleCancel = () => {
        reset({
            question1: preferences.question_1 || '',
            question2: preferences.question_2 || '',
            question3: preferences.question_3 || '',
            question4: preferences.question_4 || '',
            question5: preferences.question_5 || '',
        })

        setIsEditable(false)
    }

    const sendForm = async (data) => {
        toast.promise(updateClientPreferences(client.id, data), {
            pending: 'Modification...',
            success: 'Préférences modifiées !',
            error: 'Erreur lors de la modification de vos informations préférences'
        }, { containerId: 'notification' })
            .then(() => {
                reset()
                setIsEditable(false)

                const currentPath = window.location.pathname
                navigate(currentPath.replace('/preferences', ''))
            })
            .catch(error => {
                console.error('Error updating preferences:', error)
            })
    }

    return (
        <Preference>
            <h2>Mes préférences</h2>
            <PreferencesForm onSubmit={handleSubmit(sendForm)}>
                <label htmlFor='question-1'>Êtes-vous frileux&#x28;se&#x29; ?</label>
                <div className='input-container' name='question1'>
                    <select
                        name='question1'
                        id='question-1'
                        {...register('question1', { disabled: !isEditable })}
                    >
                        <option value=''>Choisissez une réponse</option>
                        <option
                            value='non'
                        >
                            Non
                        </option>
                        <option
                            value='parfois'
                        >
                            Parfois
                        </option>
                        <option
                            value='oui'
                        >
                            Oui
                        </option>
                        <option
                            value='ne sais pas'
                        >
                            Je ne sais pas
                        </option>
                    </select>
                    <FormError errors={errors.question1} name='question1' />
                </div>

                <label htmlFor='question-2'>Quelles sont les zones où vous préférez recevoir des massages ?</label>
                <div className='input-container' name='question2'>
                    <input
                        type='text'
                        name='question2'
                        id='question-2'
                        placeholder='Votre réponse...'
                        {...register('question2', { disabled: !isEditable })}
                    />
                    <FormError errors={errors.question2} name='question2' />
                </div>

                <label htmlFor='question-3'>Quelles sont les zones où vous n&apos;appréciez pas trop être massé ?</label>
                <div className='input-container' name='question3'>
                    <input
                        type='text'
                        name='question3'
                        id='question-3'
                        placeholder='Votre réponse...'
                        {...register('question3', { disabled: !isEditable })}
                    />
                    <FormError errors={errors.question3} name='question3' />
                </div>

                <label htmlFor='question-4'>Quel type de pression aimez-vous ?</label>
                <div className='input-container' name='question4'>
                    <select
                        name='question4'
                        id='question-4'
                        {...register('question4', { disabled: !isEditable })}
                    >
                        <option value=''>Choisissez une réponse</option>
                        <option
                            value='faible'
                        >
                            Faible
                        </option>
                        <option
                            value='modérée'
                        >
                            Modérée
                        </option>
                        <option
                            value='forte'
                        >
                            Forte
                        </option>
                        <option
                            value='ne sais pas'
                        >
                            Je ne sais pas
                        </option>
                    </select>
                    <FormError errors={errors.question4} name='question4' />
                </div>

                <label htmlFor='question-5'>Avez vous des éléments particuliers à signaler ?</label>
                <div className='input-container' name='question5'>
                    <textarea
                        name='question5'
                        id='question-5'
                        placeholder='Votre réponse...'
                        spellCheck='true'
                        rows={6}
                        {...register('question5', { disabled: !isEditable })}
                    />
                    <FormError errors={errors.question5} name='question5' />
                </div>

                {!isEditable ? (
                    <button
                        type='button'
                        id='edit'
                        onClick={() => setIsEditable(true)}
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
            </PreferencesForm>
        </Preference>
    )
}

const Preference = StyledComponents.main`
    h2 {
        text-align: center;
    }
`

const PreferencesForm = StyledComponents.form`
    display: grid; 
    grid-template-columns: 1fr;
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 2rem;
    
    .input-container {
        input, select, textarea {
            margin-top: 0.5rem;
            padding: 0.5rem;
            width: 100%;

            &:focus {
                outline-color: var(--primary-400);
            }
        }

        select {
            cursor: pointer; 
        }

        textarea {
            resize: none;
        }
    }

    button {
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
`