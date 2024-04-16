import PropTypes from 'prop-types';
import StyledComponents from 'styled-components';
import { filterAppointments } from '../../../utils/filterAppointments.util';

export const FilterAppointments = ({ appointments, filter, show, setSearchParams }) => {
    return (
        <FilterContainer>
            <div className='choice-container'>
                <label htmlFor='filter'>Filtrer par:</label>
                <select
                    name='filter'
                    id='filter'
                    value={filter}
                    onChange={event => {
                        setSearchParams(prev => {
                            prev.set('filter', event.target.value)
                            return prev
                        }, { replace: true })

                        filterAppointments(event.target.value, show, appointments)
                    }}
                >
                    <option value='date'>Date</option>
                    <option value='time'>Heure</option>
                    <option value='status'>Status</option>
                    <option value='service'>Prestation</option>
                    <option value='duration'>Durée</option>
                </select>
            </div>

            <div className='show-container'>
                <p
                    data-value='showAll'
                    onClick={(event) => {
                        setSearchParams(prev => {
                            prev.set('show', event.target.getAttribute('data-value'))
                            return prev
                        }, { replace: true })

                        filterAppointments(event.target.value, show, appointments)
                    }}
                    className={show === 'showAll' ? 'active' : ''}
                >
                    Tous
                </p>
                <p
                    data-value='showUpcoming'
                    onClick={(event) => {
                        setSearchParams(prev => {
                            prev.set('show', event.target.getAttribute('data-value'))
                            return prev
                        }, { replace: true })

                        filterAppointments(event.target.value, show, appointments)
                    }}
                    className={show === 'showUpcoming' ? 'active' : ''}
                >
                    Prochains
                </p>
                <p
                    data-value='showHistory'
                    onClick={(event) => {
                        setSearchParams(prev => {
                            prev.set('show', event.target.getAttribute('data-value'))
                            return prev
                        }, { replace: true })

                        filterAppointments(event.target.value, show, appointments)
                    }}
                    className={show === 'showHistory' ? 'active' : ''}
                >
                    Passés
                </p>
            </div>
        </FilterContainer >
    )
}

FilterAppointments.propTypes = {
    appointments: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
    show: PropTypes.string.isRequired,
    setSearchParams: PropTypes.func.isRequired
}

const FilterContainer = StyledComponents.section`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    .choice-container, .show-container {
        display: flex;
        align-items: center;
    }

    .choice-container {
        label {
            margin-right: 1rem;
        }
          
        select {
            margin-left: 1rem;
        }
    }

    .show-container {
        display: flex;
        border: 1px solid var(--grey-600);
        border-radius: 10px;

        p {
            width: 120px; 
            border-radius: 9px;
            text-align: center;
            margin: 0;

            &.active {
                background-color: var(--grey-500);
            }
        }

        &:hover {
            background-color: var(--grey-400);
        }
    }

    @media screen and (max-width: 640px) {
        flex-direction: column;

        .choice-container {
            margin: 0 auto; 
        }
        
        .choice-container, .show-container {
            margin-bottom: 1rem;
        }

        .show-container {
            p {
                width: 100%;
            }
        }
    }
`