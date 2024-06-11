import { FormError } from '../../components/FormError'

export const renderPricesForm = (content, isEditable, register, errors) => (
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
            <legend className='title-legend'>Prix</legend>
            {content.priceContent.main.map((price, index) => (
                <div key={index} className='main-content-container'>
                    <legend className='subtitle-legend'>Prestation n°{index + 1}</legend>
                    <div className='input-container' name={`main-${index}-title`}>
                        <input
                            type='text'
                            {...register(`main-${index}-title`, { required: 'Le titre est requis', disabled: !isEditable })}
                        />
                        <FormError error={errors[`main-${index}-title`]} />
                    </div>
                    <div className='input-container' name={`main-${index}-duration`}>
                        <input
                            type='text'
                            {...register(`main-${index}-duration`, { required: 'La durée est requise', disabled: !isEditable })}
                        />
                        <FormError error={errors[`main-${index}-duration`]} />
                    </div>
                    <div className='input-container' name={`main-${index}-price`}>
                        <input
                            type='text'
                            {...register(`main-${index}-price`, { required: 'Le prix est requis', disabled: !isEditable })}
                        />
                        <FormError error={errors[`main-${index}-price`]} />
                    </div>
                </div>
            ))}
        </fieldset>

        <fieldset className='more-container'>
            <legend className='title-legend'>Informations complémentaires</legend>
            <div className='input-container' name='more-0-title'>
                <input
                    type='text'
                    {...register('more-0-title', { required: 'Le titre est requis', disabled: !isEditable })}
                />
                <FormError error={errors['more-0-title']} />
            </div>
            <div className='input-container' name='more-0-price'>
                <input
                    type='text'
                    {...register('more-0-price', { required: 'Le prix est requis', disabled: !isEditable })}
                />
                <FormError error={errors['more-0-price']} />
            </div>
            <div className='input-container' name='more-1-text'>
                <input
                    type='text'
                    {...register('more-1-text', { required: 'Le texte est requis', disabled: !isEditable })}
                />
                <FormError error={errors['more-1-text']} />
            </div>
            {content.priceContent.more[1].choices.map((item, index) => (
                <div key={index} className='input-container' name={`choice-${index}`}>
                    <input
                        type='text'
                        {...register(`choice-${index}`, { required: 'Le choix est requis', disabled: !isEditable })}
                    />
                    <FormError error={errors[`choice-${index}`]} />
                </div>
            ))}
            <div className='input-container' name='more-1-more'>
                <input
                    type='text'
                    {...register('more-1-more', { required: 'Le texte est requis', disabled: !isEditable })}
                />
                <FormError error={errors['more-1-more']} />
            </div>
        </fieldset>
    </>
)