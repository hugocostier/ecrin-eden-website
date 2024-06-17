import PropTypes from 'prop-types'
import StyledComponents from 'styled-components'

export const TimeCard = ({ time, watch, register }) => {
    const isSelected = watch('time') === time

    return (
        <StyledTimeCard
            className={`time-card ${isSelected ? 'selected' : ''}`}
            id={time}
        >
            <div className='time-container'>
                <h4>{time}</h4>
            </div>
            <input
                type='radio'
                name='time'
                value={time}
                className='time-radio'
                {...register('time', { required: 'Veuillez choisir une heure' })}
            />
        </StyledTimeCard>
    )
}

TimeCard.propTypes = {
    time: PropTypes.string.isRequired,
    watch: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

const StyledTimeCard = StyledComponents.label`
    display: inline-block;
    background-color: #e5f9ff; 
    border-radius: 4px; 
    margin: 0 6px 12px;
    padding: 0 16px; 
    height: 44px; 
    cursor: pointer; 

    &.selected {
        background-color: #007ab3; 
        
        .time-container {
            h4 {
                color: #fff;
            }   
        }
    }

    &:hover {
        background-color: #ccf2ff; 
    }

    .time-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    
        h4 {
            font-family: var(--body-font); 
            font-size: 1rem;
            color: #294056;
            line-height: 1.5rem;
            margin: 0;  
        }
    }

    .time-radio {
        display: none;
    }
  
    @media screen and (min-width: 1024px) {

    }
`