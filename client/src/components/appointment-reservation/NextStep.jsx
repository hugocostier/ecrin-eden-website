import PropTypes from 'prop-types'
import StyledComponents from 'styled-components'

export const NextStep = ({ validateStep, type, text }) => (
    <NextButton
        type={type || 'button'}
        onClick={validateStep}
        className={type === 'submit' ? 'submit-btn' : ''}
    >
        {text || 'Suivant'}
    </NextButton>
)

NextStep.propTypes = {
    validateStep: PropTypes.func,
    type: PropTypes.string,
    text: PropTypes.string,
}

const NextButton = StyledComponents.button`
    color: hsl(217 100% 97% / 1); 
    line-height: 1.25rem;
    background-color: hsl(213 96% 18% / 1); 
    margin-left: auto; 
    padding: 10px 17px; 
    border: none; 
    border-radius: 8px;
    cursor: pointer; 
    transition-duration: .3s; 
    transition-property: color, background-color, opacity;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);

    &.submit-btn {
        color: hsl(217 100% 97% / 1); 
        background-color: hsl(243 100% 62% / 1);
    }
    
    &:hover {
        opacity: .8;
    }

    @media screen and (min-width: 1024px) {
        line-height: 1.5rem; 
        padding: .75rem 2rem;
        border-radius: .5rem; 
    }
`