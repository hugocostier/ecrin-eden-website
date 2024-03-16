import PropTypes from 'prop-types';
import StyledComponents from 'styled-components';

const StyledCalendarHeader = StyledComponents.div`
    .view-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 14px;

        div {
            display: flex;
            border: 1px solid var(--grey-600);
            border-radius: 10px;

            p {
                width: 80px; 
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
    }

    .month-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px 30px 10px; 
    
        .current-date {
            font-size: 1.5rem;
            margin: 0;
        }
    
        .icons {
            display: flex;
            align-items: center;
            justify-content: center;

            span, p {
                display: inline-block;
                color: var(--grey-600);
                margin: 0 1px; 
                text-align: center;
                line-height: 40px;
                height: 40px; 
                
            
                &:hover {
                    background-color: var(--grey-400); 
                }
            
                &:last-child {
                    margin-right: -10px; 
                }
            }

            p {
                border-radius: 10px; 
                padding: 0 10px;
            }

            .direction-arrow {
                border-radius: 50%;
                width: 40px;
            }
        }
    }
`

export const CalendarHeader = ({ currentDate, currentView, prevNextFunction, changeView }) => {
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
        <StyledCalendarHeader>
            <div className='view-container'>
                <div>
                    <p
                        onClick={() => changeView('day')}
                        className={currentView === 'day' ? 'active' : ''}
                    >
                        Day
                    </p>
                    <p
                        onClick={() => changeView('week')}
                        className={currentView === 'week' ? 'active' : ''}
                    >
                        Week
                    </p>
                    <p
                        onClick={() => changeView('month')}
                        className={currentView === 'month' ? 'active' : ''}
                    >
                        Month
                    </p>
                </div>
            </div>

            <div className='month-container'>
                {currentView === 'day' ? (
                    <p className='current-date'>{currentDate.day} {months[currentDate.month]} {currentDate.year}</p>
                ) : (
                    <p className='current-date'>{months[currentDate.month]} {currentDate.year}</p>
                )}
                <div className='icons'>
                    <span onClick={() => prevNextFunction(currentView, 'prev')} className='direction-arrow'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
                    </span>
                    <p onClick={() => prevNextFunction(currentView, 'today')}>
                        Aujourd&apos;hui
                    </p>
                    <span onClick={() => prevNextFunction(currentView, 'next')} className='direction-arrow'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
                    </span>
                </div>
            </div>
        </StyledCalendarHeader>
    )
}

CalendarHeader.propTypes = {
    currentDate: PropTypes.object.isRequired,
    currentView: PropTypes.string.isRequired,
    prevNextFunction: PropTypes.func.isRequired,
    changeView: PropTypes.func.isRequired,
}