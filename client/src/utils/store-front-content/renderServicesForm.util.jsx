import { FormError } from '../../components/FormError'

export const renderServicesForm = (content, isEditable, register, errors) => (
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
            <div className='input-container' name='header-subtitle'>
                <input
                    type='text'
                    {...register('header-subtitle', { required: 'Le sous-titre est requis', disabled: !isEditable })}
                />
                <FormError error={errors['header-subtitle']} />
            </div>
        </fieldset>

        <fieldset className='main-container'>
            <legend className='title-legend'>Corps de page</legend>
            <div className='input-container' name={`main-title`}>
                <input
                    type='text'
                    {...register(`main-title`, { required: 'Le titre est requis', disabled: !isEditable })}
                />
                <FormError error={errors[`main-title`]} />
            </div>
            {content.serviceContent.main[0].text.map((section, index) => (
                <div key={index} className='input-container' name={`text-${index}`}>
                    <textarea
                        type='text'
                        spellCheck='true'
                        rows={6}
                        {...register(`text-${index}`, { required: 'Le texte est requis', disabled: !isEditable })}
                    />
                    <FormError error={errors[`text-${index}`]} />
                </div>
            ))}
        </fieldset >

        <fieldset className='services-container'>
            <legend className='title-legend'>Prestations</legend>
            {content.serviceContent.services.map((service, index) => (
                <div key={index} className='services-content-container'>
                    <legend className='subtitle-legend'>Prestation n°{index + 1}</legend>
                    <div className='input-container' name={`service-${index}-title`}>
                        <input
                            type='text'
                            {...register(`service-${index}-title`, { required: 'Le titre est requis', disabled: !isEditable })}
                        />
                        <FormError error={errors[`service-${index}-title`]} />
                    </div>
                    <div className='input-container' name={`service-${index}-time`}>
                        <input
                            type='text'
                            {...register(`service-${index}-time`, { required: 'La durée est requise', disabled: !isEditable })}
                        />
                        <FormError error={errors[`service-${index}-time`]} />
                    </div>
                    <div className='input-container' name={`service-${index}-price`}>
                        <textarea
                            type='text'
                            spellCheck='true'
                            rows={6}
                            {...register(`service-${index}-text`, { required: 'Le texte est requis', disabled: !isEditable })}
                        />
                        <FormError error={errors[`service-${index}-text`]} />
                    </div>
                </div>
            ))}
        </fieldset>
    </>
)