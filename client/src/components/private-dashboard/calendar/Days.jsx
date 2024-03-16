import PropTypes from 'prop-types';
import StyledComponents from 'styled-components';

const StyledDays = StyledComponents.tbody`
    td {
        height: 95px; 
        vertical-align: top;
        border: 1px solid var(--grey-500);
        padding: 5px; 

        &:hover {
            background: var(--grey-200); 
        }

        &.inactive {
            color: var(--grey-500);
        }

        .day-number {
            text-align: right; 
            margin-right: 5px; 

            &.today {
                color: var(--red-dark);
            }
        }   
        
        .appointment-info {
            padding-left: 10px; 
            border-radius: 5px; 
            background: var(--red-dark);
        }

        .more-appointments {
            padding-left: 10px;  
            color: var(--grey-600)       
        }
    } 
`

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