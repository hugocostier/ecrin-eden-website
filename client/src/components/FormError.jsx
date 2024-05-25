import PropTypes from 'prop-types'
import StyledComponents from 'styled-components'

export const FormError = ({ error }) => {
    return (
        <ErrorContainer>
            {error &&
                <span className="input-error">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"></path></svg>
                    {error.message}
                </span>
            }
        </ErrorContainer>
    )
}

FormError.propTypes = {
    error: PropTypes.object
}

const ErrorContainer = StyledComponents.div`
    display: flex;
    align-items: center;
    height: 20px;
    margin-bottom: 4px; 
 
    .input-error {
        display: flex;
        align-items: center;
        color: var(--red);
        font-size: 0.9rem;
        line-height: 1; 

        svg {
            width: 14px;
            height: 14px;
            margin-right: 5px;
        }
    }
`