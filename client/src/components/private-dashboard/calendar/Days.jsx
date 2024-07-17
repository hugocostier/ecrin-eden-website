import PropTypes from 'prop-types';
import StyledComponents from 'styled-components';

export const Days = ({ render }) => {

    return (
        <StyledDays>
            {render}
        </StyledDays>
    )
}

Days.propTypes = {
    render: PropTypes.array.isRequired
}

const StyledDays = StyledComponents.tbody`
    td {
        vertical-align: top;
        border: 1px solid var(--grey-500);
        padding: 5px; 

        &:hover {
            background: var(--quaternary-500); 
        }

        &.inactive {
            color: var(--grey-500);
        }

        &.day-time {
            width: 80px;
            text-align: center;
            align-content: center; 
        }

        .day-number {
            text-align: right; 
            margin-right: 5px; 
            font-size: 1rem;

            &.today {
                color: var(--red-dark);
                font-weight: bold;
            }
        }   
        
        .appointment-info {
            padding-left: 10px;
            padding-right: 10px; 
            border-radius: 5px; 
            font-size: 0.875rem;
            margin-top: 2px;
            cursor: pointer;
        }

        .appointment-link {
            display: block; 
            width: 100%;
            color: inherit;
            text-decoration: none;
        }
        
        .more-appointments {
            padding-left: 10px;  
            color: var(--grey-600); 
            font-size: 0.8rem;      
        }
    } 
`