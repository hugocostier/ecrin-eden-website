import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import { fetchPageContent, updateContent } from '../../../../data/page-content/content.fetch'
import { generateDataToSend } from '../../../../utils/store-front-content/generateDataToSend.util'
import { renderCertificationForm } from '../../../../utils/store-front-content/renderCertificationForm.util'
import { renderContactForm } from '../../../../utils/store-front-content/renderContactForm.util'
import { renderGiftCardForm } from '../../../../utils/store-front-content/renderGiftCardForm.util'
import { renderHomeForm } from '../../../../utils/store-front-content/renderHomeForm.util'
import { renderPricesForm } from '../../../../utils/store-front-content/renderPricesForm.util'
import { renderServicesForm } from '../../../../utils/store-front-content/renderServicesForm.util'
import { storeFrontPages } from '../../../../utils/store-front-content/storeFrontPages.util'

export const UpdateContent = () => {
    const navigate = useNavigate()
    const pageId = window.location.pathname.split('/').pop()

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const [content, setContent] = useState('')
    const [isEditable, setIsEditable] = useState(false)

    useEffect(() => {
        fetchPageContent(pageId, storeFrontPages, reset)
            .then((fetchedContent) => {
                setContent(fetchedContent)
            })

        return () => {
            setContent('')
        }
    }, [pageId, reset])

    const renderInputs = () => {
        if (!content) return null

        switch (pageId) {
            case '1':
                return renderHomeForm(content, isEditable, register, errors)
            case '2':
                return renderServicesForm(content, isEditable, register, errors)
            case '3':
                return renderPricesForm(content, isEditable, register, errors)
            case '4':
                return renderGiftCardForm(content, isEditable, register, errors)
            case '5':
                return renderCertificationForm(content, isEditable, register, errors)
            case '6':
                return renderContactForm(content, isEditable, register, errors)
            default:
                return null
        }
    }

    const handleCancel = () => {
        reset()
        setIsEditable(false)
    }

    const sendForm = async (data) => {
        const dataToSend = generateDataToSend(pageId, data, content)
        const pageName = storeFrontPages[pageId - 1].name.toLowerCase()

        toast.promise(updateContent(pageName, dataToSend), {
            pending: 'Modification en cours...',
            success: 'Contenu modifié avec succès !',
            error: 'Erreur lors de la modification du contenu...',
        })
            .then((response) => {
                reset(response)
                navigate(-1)
            })
            .catch((error) => {
                console.error('Error updating content:', error)
            })

        setIsEditable(false)
    }

    return (
        <UpdateContentPage>
            <h2>Modifier le contenu</h2>
            <h3>{storeFrontPages[pageId - 1].displayedName}</h3>

            <ContentForm onSubmit={handleSubmit(sendForm)}>
                {renderInputs()}

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
            </ContentForm>
        </UpdateContentPage>
    )
}

const UpdateContentPage = StyledComponents.main`
    h2, h3 {
        text-align: center;
    }

    h2 {
        margin-bottom: 10px; 
    }
`

const ContentForm = StyledComponents.form`
    display: grid; 
    grid-template-columns: 1fr 1fr;
    max-width: 1600px;
    margin: 0 auto;
    margin-bottom: 2rem;

    fieldset {
        display: grid;
        grid-template-columns: 1fr;
        column-gap: 1rem;
        grid-column: 1 / 3;
        margin-bottom: 1rem;

        legend {
            text-align: center;
            font-weight: bold;
    
            &.title-legend {
                font-size: 1.5rem;
                margin-top: 2rem;
            }
    
            &.subtitle-legend {
                font-size: 1.25rem;
                margin-bottom: 0.25rem; 
            }
        }

        input {
            padding: 0.5rem;
            width: 100%;
        }
    
        textarea {
            padding: 0.5rem;
            resize: vertical;
            width: 100%;
        }
    }

    button {
        padding: 0.5rem;
        cursor: pointer; 
        
        &#edit {
            grid-column: 1 / 3;
        }
    }

    #button-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column: 1 / 3;
    }

    @media screen and (min-width: 640px) {
        fieldset {
            grid-template-columns: 1fr 1fr;
        }

        legend {
            text-align: left;
            grid-column: 1 / 3;
        }
    }
`