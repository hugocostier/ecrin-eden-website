import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import { fetchClientPreferences, updateClientPreferences } from '../../../data/admin/preferences.fetch'
import { useClientInfo } from '../../../hooks/useClientInfo.hook'

export const UserPreferences = () => {
    const navigate = useNavigate()
    const client = useClientInfo()
    const [isEditable, setIsEditable] = useState(false)
    const [preferences, setPreferences] = useState({})

    const [input, setInput] = useState({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
    })

    useEffect(() => {
        fetchClientPreferences(client.id)
            .then(preferences => {
                setPreferences(preferences)
                setInput({
                    question1: preferences.question_1 ? preferences.question_1 : '',
                    question2: preferences.question_2 ? preferences.question_2 : '',
                    question3: preferences.question_3 ? preferences.question_3 : '',
                    question4: preferences.question_4 ? preferences.question_4 : '',
                    question5: preferences.question_5 ? preferences.question_5 : '',
                })
            })
            .catch(error => {
                console.error('Error fetching client preferences:', error)
            })

        return () => {
            setPreferences({})
        }
    }, [client.id])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const handleCancel = () => {
        setInput({
            question1: preferences.question_1 ? preferences.question_1 : '',
            question2: preferences.question_2 ? preferences.question_2 : '',
            question3: preferences.question_3 ? preferences.question_3 : '',
            question4: preferences.question_4 ? preferences.question_4 : '',
            question5: preferences.question_5 ? preferences.question_5 : '',
        })

        setIsEditable(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        toast.promise(updateClientPreferences(client.id, input), {
            pending: 'Modification...',
            success: 'Préférences modifiées !',
            error: 'Erreur lors de la modification de vos informations préférences'
        }, { containerId: 'notification' })
            .then(() => {
                setInput({
                    question1: '',
                    question2: '',
                    question3: '',
                    question4: '',
                    question5: '',
                })

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
            <PreferencesForm>
                <label htmlFor="question-1">Êtes-vous frileux&#x28;se&#x29; ?</label>
                <select
                    name="question1"
                    id="question-1"
                    value={input.question1}
                    disabled={!isEditable}
                    onChange={handleChange}
                >
                    <option
                        value="non"
                    >
                        Non
                    </option>
                    <option
                        value="parfois"
                    >
                        Parfois
                    </option>
                    <option
                        value="oui"
                    >
                        Oui
                    </option>
                    <option
                        value="ne sais pas"
                    >
                        Je ne sais pas
                    </option>
                </select>

                <label htmlFor="question-2">Quelles sont les zones où vous préférez recevoir des massages ?</label>
                <input
                    type="text"
                    name="question2"
                    id="question-2"
                    value={input.question2}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Votre réponse...'
                />

                <label htmlFor="question-3">Quelles sont les zones où vous n&apos;appréciez pas trop être massé ?</label>
                <input
                    type="text"
                    name="question3"
                    id="question-3"
                    value={input.question3}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Votre réponse...'
                />

                <label htmlFor="question-4">Quel type de pression aimez-vous ?</label>
                <select
                    name="question4"
                    id="question-4"
                    value={input.question4}
                    disabled={!isEditable}
                    onChange={handleChange}
                >
                    <option
                        value="faible"
                    >
                        Faible
                    </option>
                    <option
                        value="modérée"
                    >
                        Modérée
                    </option>
                    <option
                        value="forte"
                    >
                        Forte
                    </option>
                    <option
                        value="ne sais pas"
                    >
                        Je ne sais pas
                    </option>
                </select>

                <label htmlFor="question-5">Avez vous des éléments particuliers à signaler ?</label>
                <textarea
                    name="question5"
                    id="question-5"
                    value={input.question5}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder='Votre réponse...'
                    rows={6}
                />

                {!isEditable && (
                    <button
                        type="button"
                        id="edit"
                        onClick={() => setIsEditable(true)}
                    >
                        Modifier
                    </button>
                )}

                {isEditable && (
                    <div id='button-container'>
                        <button
                            type="button"
                            id='cancel'
                            onClick={handleCancel}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            id='save'
                            onClick={handleSubmit}
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
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
    row-gap: 0.5rem;
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 2rem;
    
    label {
        grid-column: 1 / 3;
    }

    input, select {
        margin-top: 0.5rem;
        padding: 0.5rem;
        width: 100%;

        &#question-1, 
        &#question-2, 
        &#question-3, 
        &#question-4 {
            grid-column: 1 / 3;     
        }
    }

    textarea {
        margin-top: 0.5rem;
        padding: 0.5rem;
        resize: none;
        
        &#question-5 {
            grid-column: 1 / 3; 
        }
    }

    button {
        margin-top: 1rem;
        padding: 0.5rem;

        &#edit {
            grid-column: 1 / 3;
        }
    }

    #button-container {
        grid-column: 1 / 3;
        display: grid; 
        grid-template-columns: 1fr 1fr;
    }
`