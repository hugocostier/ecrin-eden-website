import PropTypes from 'prop-types'
import StyledComponents from 'styled-components'

export const FormActions = ({ children }) => {
    return (
        <FormActionContainer>
            {children}
        </FormActionContainer>
    )
}

FormActions.propTypes = {
    children: PropTypes.node.isRequired,
}

const FormActionContainer = StyledComponents.section`
    display: flex; 
    align-items: center;
    justify-content: space-between;
    background-color: hsl(0 0% 100% / 1); 
    position: static; 
    padding: 0 1rem 0 1rem; 
    margin-top: auto; 

    .back-btn {
        font-size: 1.125rem;
        font-weight: bold;
        color: hsl(231 11% 63% / 1); 
        line-height: 1.25rem;
    }

    @media screen and (min-width: 1024px) {
        background-color: transparent;
        padding: 0;
        
        .back-btn {
            line-height: 1.5rem; 
        }
    }
`