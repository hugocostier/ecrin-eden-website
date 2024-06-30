import PropTypes from 'prop-types'
import StyledComponents from 'styled-components'

export const CalendarPickerHeader = ({ currentDate, updateMonth }) => {
    const months = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ]

    return (
        <HeaderContainer>
            <h3 className='current-date'>{months[currentDate.month]} {currentDate.year}</h3>
            <div className='icons'>
                <span onClick={() => updateMonth('prev')} className='direction-arrow'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z'></path></svg>
                </span>
                <p onClick={() => updateMonth('today')}>
                    Aujourd&apos;hui
                </p>
                <span onClick={() => updateMonth('next')} className='direction-arrow'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z'></path></svg>
                </span>
            </div>
        </HeaderContainer>
    )
}

CalendarPickerHeader.propTypes = {
    currentDate: PropTypes.object.isRequired,
    updateMonth: PropTypes.func.isRequired
}

const HeaderContainer = StyledComponents.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px; 

    .current-date {
        font-family: var(--body-font); 
        font-size: 1.125rem;
        margin: 0;
    }

    .icons {
        display: flex;
        align-items: center;
        justify-content: center;

        span, p {
            display: flex;
            align-items: center;
            color: var(--grey-600);
            margin: 0 1px; 
            text-align: center;
            line-height: 40px;
            height: 30px; 
        
            &:hover {
                background-color: var(--grey-100); 
            }
        
            &:last-child {
                margin-right: -10px; 
            }
        }

        p {
            font-size: 1rem;
            border-radius: 10px; 
            padding: 0 10px;
            cursor: pointer;
        }

        .direction-arrow {
            border-radius: 50%;
            width: 30px;
            cursor: pointer;
        }
    }
`