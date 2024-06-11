import { FormError } from '../../components/FormError'

export const renderCertificationForm = (content, isEditable, register, errors) => (
    <>
        <fieldset className='header-container'>
            <legend className='title-legend'>Titre principal</legend>
            <div className='input-container' name='header-title'>
                <input
                    type='text'
                    {...register('header-title', { required: 'Le titre est requis', disabled: !isEditable })}
                />
                <FormError error={errors['header-title']} />
            </div>
        </fieldset>

        <fieldset className='main-container'>
            <legend className='title-legend'>Corps de page</legend>
            {content.certificationContent.main.map((section, index) => (
                <div key={index} className='main-content-container'>
                    <legend className='subtitle-legend'>Paragraphe n°{index + 1}</legend>
                    <div className='input-container' name={`main-${index}-title`}>
                        <input
                            type='text'
                            {...register(`main-${index}-title`, { required: 'Le titre est requis', disabled: !isEditable })}
                        />
                        <FormError error={errors[`main-${index}-title`]} />
                    </div>
                    {section.text.map((text, i) => (
                        <div key={i} className='input-container' name={`main-${index}-text-${i}`}>
                            <textarea
                                type='text'
                                spellCheck='true'
                                rows={4}
                                {...register(`main-${index}-text-${i}`, { required: 'Le texte est requis', disabled: !isEditable })}
                            />
                            <FormError error={errors[`main-${index}-text-${i}`]} />
                        </div>
                    ))}
                </div>
            ))}
        </fieldset>
    </>
)