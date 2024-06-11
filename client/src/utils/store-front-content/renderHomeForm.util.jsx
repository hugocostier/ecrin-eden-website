import { FormError } from '../../components/FormError'

export const renderHomeForm = (content, isEditable, register, errors) => (
    <>
        <fieldset className='header-container'>
            <legend className='title-legend'>Titre principal</legend>
            <div className='input-container' name='header-title'>
                <input
                    type='text'
                    name='header-title'
                    {...register('header-title', { required: 'Le titre est requis', disabled: !isEditable })}
                />
                <FormError error={errors['header-title']} />
            </div>
            <div className='input-container' name='header-subtitle'>
                <input
                    type='text'
                    name='header-subtitle'
                    {...register('header-subtitle', { required: 'Le sous-titre est requis', disabled: !isEditable })}
                />
                <FormError error={errors['header-subtitle']} />
            </div>
        </fieldset>

        <fieldset className='main-container'>
            <legend className='title-legend'>Corps de page</legend>
            {content.homeContent.main.map((section, index) => (
                <div key={index} className='main-content-container'>
                    <legend className='subtitle-legend'>Paragraphe n°{index + 1}</legend>
                    <div className='input-container' name={`main-${index}-title`}>
                        <input
                            type='text'
                            name={`main-${index}-title`}
                            {...register(`main-${index}-title`, { required: 'Le titre est requis', disabled: !isEditable })}
                        />
                        <FormError error={errors[`main-${index}-title`]} />
                    </div>
                    {index === 0 && (
                        <div className='input-container' name={`main-${index}-subtitle`}>
                            <input
                                type='text'
                                name={`main-${index}-subtitle`}
                                {...register(`main-${index}-subtitle`, { required: 'Le sous-titre est requis', disabled: !isEditable })}
                            />
                            <FormError error={errors[`main-${index}-subtitle`]} />
                        </div>
                    )}
                    {section.text.map((text, i) => (
                        <div key={i} className='input-container' name={`main-${index}-text-${i}`}>
                            <textarea
                                type='text'
                                name={`main-${index}-text-${i}`}
                                spellCheck='true'
                                rows={6}
                                {...register(`main-${index}-text-${i}`, { required: 'Le texte est requis', disabled: !isEditable })}
                            />
                            <FormError error={errors[`main-${index}-text-${i}`]} />
                        </div>
                    ))}
                </div>
            ))}
        </fieldset>

        <fieldset className='footer-container'>
            <legend className='title-legend'>Bas de page</legend>
            {content.homeContent.footer[0].text.map((section, index) => (
                <div key={index} className='input-container' name={`footer-text-${index}`}>
                    <textarea
                        type='text'
                        name={`footer-text-${index}`}
                        spellCheck='true'
                        rows={6}
                        {...register(`footer-text-${index}`, { required: 'Le texte est requis', disabled: !isEditable })}
                    />
                    <FormError error={errors[`footer-text-${index}`]} />
                </div>
            ))}
        </fieldset>

        <fieldset className='reviews-container'>
            <legend className='title-legend'>Commentaires</legend>
            {content.homeContent.reviews.map((review, index) => (
                <div key={index} className='reviews-content-container'>
                    <legend className='subtitle-legend'>Commentaire n°{index + 1}</legend>
                    <div className='input-container' name={`review-${index}-text`}>
                        <textarea
                            type='text'
                            name={`review-${index}-text`}
                            spellCheck='true'
                            rows={6}
                            {...register(`review-${index}-text`, { required: 'Le texte est requis', disabled: !isEditable })}
                        />
                        <FormError error={errors[`review-${index}-text`]} />
                    </div>
                    <div className='input-container' name={`review-${index}-author`}>
                        <input
                            type='text'
                            name={`review-${index}-author`}
                            {...register(`review-${index}-author`, { required: 'L\'auteur est requis', disabled: !isEditable })}
                        />
                        <FormError error={errors[`review-${index}-author`]} />
                    </div>
                </div>
            ))}
        </fieldset>
    </>
)