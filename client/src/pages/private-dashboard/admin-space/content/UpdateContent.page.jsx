import { useEffect, useState } from 'react'
import StyledComponents from 'styled-components'
import { certificationLoader, contactLoader, giftCardLoader, homeLoader, priceLoader, serviceLoader } from '../../../../data'

const storeFrontPages = [
    {
        id: 1,
        name: 'Accueil',
        link: '/'
    },
    {
        id: 2,
        name: 'Prestations',
        link: '/services'
    },
    {
        id: 3,
        name: 'Tarifs',
        link: '/prices'
    },
    {
        id: 4,
        name: 'Cartes cadeau',
        link: '/gift-cards'
    },
    {
        id: 5,
        name: 'FFMBE',
        link: '/certification'
    },
    {
        id: 6,
        name: 'Contact',
        link: '/contact'
    }
]

export const UpdateContent = () => {
    const pageId = window.location.pathname.split('/').pop()
    const [content, setContent] = useState('')
    const [updatedContent, setUpdatedContent] = useState('')

    // const [input, setInput] = useState({})

    console.log('content:', content)
    console.log('updatedContent:', updatedContent)

    useEffect(() => {
        const fetchData = async () => {
            let content = {}

            switch (pageId) {
                case '1':
                    content = await homeLoader()
                    break
                case '2':
                    content = await serviceLoader()
                    break
                case '3':
                    content = await priceLoader()
                    break
                case '4':
                    content = await giftCardLoader()
                    break
                case '5':
                    content = await certificationLoader()
                    break
                case '6':
                    content = await contactLoader()
                    break
                default:
                    break
            }

            return content
        }

        fetchData()
            .then((fetchedContent) => {
                setContent(fetchedContent)
                setUpdatedContent(fetchedContent)
            })

        return () => {
            setContent('')
        }
    }, [pageId])

    useEffect(() => {
        if (content) {
            setUpdatedContent(content)
        }
    }, [content])

    const handleChange = (e) => {
        setUpdatedContent({
            ...updatedContent,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(content)
    }

    const renderInputs = () => {
        if (!content) return null

        switch (pageId) {
            case '1':
                return (
                    <>
                        <fieldset>
                            <legend className='title-legend'>Titre principal</legend>
                            <input
                                type='text'
                                name='main-title'
                                value={updatedContent.homeContent.header[0].title}
                                onChange={handleChange}
                            />
                            <input
                                type='text'
                                name='main-subtitle'
                                value={updatedContent.homeContent.header[0].subtitle}
                                onChange={handleChange}
                            />
                        </fieldset>

                        <fieldset>
                            <legend className='title-legend'>Corps de page</legend>
                            {updatedContent.homeContent.main.map((section, index) => (
                                <div key={index}>
                                    <legend className='subtitle-legend'>Paragraphe n°{index + 1}</legend>
                                    <input
                                        type='text'
                                        name={`paragraph-title-${index}`}
                                        value={section.title}
                                        onChange={handleChange}
                                    />
                                    {index === 0 && (
                                        <input
                                            type='text'
                                            name={`paragraph-subtitle-${index}`}
                                            value={section.subtitle}
                                            onChange={handleChange}
                                        />
                                    )}
                                    <textarea
                                        type='text'
                                        name={`paragraph-text-${index}`}
                                        value={section.text}
                                        onChange={handleChange}
                                        spellCheck='true'
                                        rows={6}
                                    />
                                </div>
                            ))}
                        </fieldset>

                        <fieldset>
                            <legend className='title-legend'>Bas de page</legend>
                            <textarea
                                type='text'
                                name='footer-text'
                                value={updatedContent.homeContent.footer[0].text}
                                onChange={handleChange}
                                spellCheck='true'
                                rows={6}
                            />
                        </fieldset>

                        <fieldset>
                            <legend className='title-legend'>Commentaires</legend>
                            {updatedContent.homeContent.reviews.map((review, index) => (
                                <div key={index}>
                                    <legend className='subtitle-legend'>Commentaire n°{index + 1}</legend>
                                    <textarea
                                        type='text'
                                        name={`comment-text-${index}`}
                                        value={review.text}
                                        onChange={handleChange}
                                        spellCheck='true'
                                        rows={6}
                                    />
                                    <input
                                        type='text'
                                        name={`comment-author-${index}`}
                                        value={review.author}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </fieldset>
                    </>
                )
            case '2':
                return (
                    <>
                        <legend className='title-legend'>Titre principal</legend>
                        <input
                            type='text'
                            value={updatedContent.serviceContent.header[0].title}
                            onChange={handleChange}
                        />
                        <input
                            type='text'
                            value={updatedContent.serviceContent.header[0].subtitle}
                            onChange={handleChange}
                        />

                        <legend className='title-legend'>Corps de page</legend>
                        {updatedContent.serviceContent.main.map((section, index) => (
                            <div key={index}>
                                <legend className='subtitle-legend'>Paragraphe n°{index + 1}</legend>
                                <input
                                    type='text'
                                    value={section.title}
                                    onChange={handleChange}
                                />
                                <textarea
                                    type='text'
                                    value={section.text}
                                    onChange={handleChange}
                                    spellCheck='true'
                                    rows={6}
                                />
                            </div>
                        ))}

                        <legend className='title-legend'>Prestations</legend>
                        {updatedContent.serviceContent.services.map((service, index) => (
                            <div key={index}>
                                <legend className='subtitle-legend'>Prestation n°{index + 1}</legend>
                                <input
                                    type='text'
                                    value={service.title}
                                    onChange={handleChange}
                                />
                                <input
                                    type='text'
                                    value={service.time}
                                    onChange={handleChange}
                                />
                                <textarea
                                    type='text'
                                    value={service.text}
                                    onChange={handleChange}
                                    spellCheck='true'
                                    rows={6}
                                />
                            </div>
                        ))}
                    </>
                )
            case '3':
                return (
                    <>
                        <legend className='title-legend'>Titre principal</legend>
                        <input
                            type='text'
                            value={updatedContent.priceContent.header[0].title}
                            onChange={handleChange}
                        />

                        <legend className='title-legend'>Prix</legend>
                        {updatedContent.priceContent.main.map((price, index) => (
                            <div key={index}>
                                <legend className='subtitle-legend'>Prestation n°{index + 1}</legend>
                                <input
                                    type='text'
                                    value={price.title}
                                    onChange={handleChange}
                                />
                                <input
                                    type='text'
                                    value={price.duration}
                                    onChange={handleChange}
                                />
                                <input
                                    type='text'
                                    value={price.price}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}

                        <legend className='title-legend'>Informations complémentaires</legend>
                        <input
                            type='text'
                            value={updatedContent.priceContent.more[0].title}
                            onChange={handleChange}
                        />
                        <input
                            type='text'
                            value={updatedContent.priceContent.more[0].price}
                            onChange={handleChange}
                        />
                        <input
                            type='text'
                            value={updatedContent.priceContent.more[1].text}
                            onChange={handleChange}
                        />
                        {updatedContent.priceContent.more[1].choices.map((item, index) => (
                            <input
                                type='text'
                                value={item}
                                key={index}
                                onChange={handleChange}
                            />
                        ))}
                        <input
                            type='text'
                            value={updatedContent.priceContent.more[1].more}
                            onChange={handleChange}
                        />
                    </>
                )
            case '4':
                return (
                    <>
                        <legend className='title-legend'>Titre principal</legend>
                        <input
                            type='text'
                            value={updatedContent.giftCardContent.main[0].title}
                            onChange={handleChange}
                        />

                        <legend className='title-legend'>Corps de page</legend>
                        <textarea
                            type='text'
                            value={updatedContent.giftCardContent.main[0].text}
                            onChange={handleChange}
                            spellCheck='true'
                            rows={6}
                        />
                    </>
                )
            case '5':
                return (
                    <>
                        <legend className='title-legend'>Titre principal</legend>
                        <input
                            type='text'
                            value={updatedContent.certificationContent.header[0].title}
                            onChange={handleChange}
                        />

                        <legend className='title-legend'>Corps de page</legend>
                        {updatedContent.certificationContent.main.map((section, index) => (
                            <div key={index}>
                                <legend className='subtitle-legend'>Paragraphe n°{index + 1}</legend>
                                <input
                                    type='text'
                                    value={section.title}
                                    onChange={handleChange}
                                />
                                <textarea
                                    type='text'
                                    value={section.text}
                                    onChange={handleChange}
                                    spellCheck='true'
                                    rows={6}
                                />
                            </div>
                        ))}
                    </>
                )
            case '6':
                return (
                    <>
                        <legend className='title-legend'>Titre principal</legend>
                        <input
                            type='text'
                            value={updatedContent.contactContent.header[0].title}
                            onChange={handleChange}
                        />

                        <legend className='title-legend'>Informations de contact</legend>
                        <input
                            type='text'
                            value={updatedContent.contactContent.header[0].name}
                            onChange={handleChange}
                        />
                        <input
                            type='text'
                            value={updatedContent.contactContent.header[0].address}
                            onChange={handleChange}
                        />
                        <input
                            type='text'
                            value={updatedContent.contactContent.header[0].zip}
                            onChange={handleChange}
                        />
                        <input
                            type='text'
                            value={updatedContent.contactContent.header[0].city}
                            onChange={handleChange}
                        />
                        <input
                            type='text'
                            value={updatedContent.contactContent.header[0].phone}
                            onChange={handleChange}
                        />
                        <input
                            type='text'
                            value={updatedContent.contactContent.header[0].email}
                            onChange={handleChange}
                        />
                    </>
                )
            default:
                return null
        }
    }

    return (
        <UpdateContentPage>
            <h2>Modifier le contenu</h2>
            <h3>{storeFrontPages[pageId - 1].name}</h3>

            <ContentForm>
                {renderInputs()}

                <div id='button-container'>
                    <button type='reset'>Annuler</button>
                    <button type='submit' onClick={handleSubmit}>Enregistrer</button>
                </div>
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
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 2rem;

    fieldset {
        display: grid; 
        grid-template-columns: 1fr;
        column-gap: 1rem;
        row-gap: 1rem;
        margin-bottom: 1rem;
    }

    legend {
        text-align: center;
        font-weight: bold;
        
        &.title-legend {
            font-size: 1.5rem;
            margin-top: 2rem;
        }

        &.subtitle-legend {
            font-size: 1.25rem;
        }
    }

    input {
        margin-top: 0.5rem;
        padding: 0.5rem;
        width: 100%;
    }

    textarea {
        margin-top: 0.5rem;
        padding: 0.5rem;
        resize: vertical;
        width: 100%;
    }

    button {
        margin-top: 1rem;
        padding: 0.5rem;
    }

    #button-container {
        display: grid; 
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (min-width: 640px) {
        fieldset {
            grid-template-columns: 1fr 1fr;
        }

        legend {
            text-align: left;
            grid-column: 1 / 3;
        }

        button {    
            
        }

        #button-container {
            grid-column: 1 / 3;
        }
    }
`