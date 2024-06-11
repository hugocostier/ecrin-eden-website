import { FormError } from '../../components/FormError'

export const renderGiftCardForm = (content, isEditable, register, errors) => (
    <>
        <fieldset className='title-container'>
            <legend className='title-legend'>Titre principal</legend>
            <div className='input-container' name='title'>
                <input
                    type='text'
                    {...register('title', { required: 'Le titre est requis', disabled: !isEditable })}
                />
                <FormError error={errors['title']} />
            </div>
        </fieldset>

        <fieldset className='main-container'>
            <legend className='title-legend'>Corps de page</legend>
            {content.giftCardContent.main[0].text.map((section, index) => (
                <div key={index} className='input-container' name={`text-${index}`}>
                    <textarea
                        type='text'
                        spellCheck='true'
                        rows={2}
                        {...register(`text-${index}`, { required: 'Le texte est requis', disabled: !isEditable })}
                    />
                    <FormError error={errors[`text-${index}`]} />
                </div>
            ))}
        </fieldset>
    </>
)