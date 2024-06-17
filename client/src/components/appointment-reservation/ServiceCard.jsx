import PropTypes from 'prop-types'
import StyledComponents from 'styled-components'
import icon from '../../assets/images/appointment-reservation/icon-advanced.svg'

export const ServiceCard = ({ service, watch, setValue, register }) => {
    const isSelected = parseInt(watch('service')) === service.id

    return (
        <StyledServiceCard
            className={`service-card ${isSelected ? 'selected' : ''}`}
            id={service.id}
            onClick={() => setValue('duration', service.duration)}
        >
            <img src={icon} alt='' className='service-icon' />
            <div className='service-info'>
                <h4>{service.name}</h4>
                <p>{service.duration}min</p>
                <p>{service.price}€</p>
            </div>
            <input
                type='radio'
                name='service'
                value={service.id}
                className='service-radio'
                {...register('service', { required: 'Veuillez sélectionner une prestation' })}
            />
        </StyledServiceCard>
    )
}

ServiceCard.propTypes = {
    service: PropTypes.object.isRequired,
    watch: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

const StyledServiceCard = StyledComponents.label`
    display: flex;
    flex-direction: row; 
    align-items: center;
    column-gap: 1rem;
    width: 100%;
    padding: 1rem; 
    background-color: transparent;
    border: 1px solid hsl(229 24% 87% / 1);
    border-radius: .375rem; 
    cursor: pointer;
    transition-duration: .3s;
    transition-property: color, background-color, border-color;
    transition-timing-function: cubic-bezier(.4,0,.2,1);

    &:hover, 
    &.selected {
        border-color: hsl(243 100% 62% / 1)
    }

    .service-icon {
        display: block; 
        max-width: 100%; 
        height: auto;
        color: transparent;
        vertical-align: middle;
    }

    .service-info {
        display: flex; 
        flex-direction: column;

        h4 {
            font-family: var(--body-font); 
            font-size: 1rem;
            font-weight: bold;
            text-transform: capitalize;
            color: hsl(213 96% 18% / 1); 
            margin: 0;
        }

        p {
            font-size: .875rem;
            line-height: 1.25rem;
            color: hsl(231 11% 63% / 1);
            margin: 0; 
        }
    }

    .service-radio {
        display: none;
    }

    @media screen and (min-width: 1024px) {
        flex-direction: column;
        align-items: flex-start;

        .service-info {
            margin-top: .5rem; 
        }
    }
`