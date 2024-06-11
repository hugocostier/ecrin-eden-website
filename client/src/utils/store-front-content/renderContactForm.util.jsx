import { FormError } from '../../components/FormError'

export const renderContactForm = (content, isEditable, register, errors) => (
    <>
        <fieldset className='title-container'>
            <legend className='title-legend'>Titre principal</legend>
            <div className='input-container' name='header-title'>
                <input
                    type='text'
                    {...register('header-title', { required: 'Le titre est requis', disabled: !isEditable })}
                />
                <FormError error={errors['header-title']} />
            </div>
        </fieldset>

        <fieldset className='header-container'>
            <legend className='title-legend'>Informations de contact</legend>
            <div className='input-container' name='header-name'>
                <input
                    type='text'
                    {...register('header-name', { required: 'Le nom est requis', disabled: !isEditable })}
                />
                <FormError error={errors['header-name']} />
            </div>
            <div className='input-container' name='header-address'>
                <input
                    type='text'
                    {...register('header-address', { required: 'L\'adresse est requise', disabled: !isEditable })}
                />
                <FormError error={errors['header-address']} />
            </div>
            <div className='input-container' name='header-zip'>
                <input
                    type='text'
                    {...register('header-zip', { required: 'Le code postal est requis', disabled: !isEditable })}
                />
                <FormError error={errors['header-zip']} />
            </div>
            <div className='input-container' name='header-city'>
                <input
                    type='text'
                    {...register('header-city', { required: 'La ville est requise', disabled: !isEditable })}
                />
                <FormError error={errors['header-city']} />
            </div>
            <div className='input-container' name='header-phone'>
                <input
                    type='text'
                    {...register('header-phone', { required: 'Le téléphone est requis', disabled: !isEditable })}
                />
                <FormError error={errors['header-phone']} />
            </div>
            <div className='input-container' name='header-email'>
                <input
                    type='text'
                    {...register('header-email', { required: 'L\'email est requis', disabled: !isEditable })}
                />
                <FormError error={errors['header-email']} />
            </div>
        </fieldset>
    </>
)