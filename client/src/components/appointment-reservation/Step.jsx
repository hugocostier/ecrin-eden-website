import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import StyledComponents from 'styled-components'

export const Step = ({ step, segment }) => {
    return (
        <Link to={`/appointment/${step.segment}`}>
            <StepContainer>
                <button className={`step-btn ${step.segment === segment ? 'active' : 'inactive'}`}>{step.id}</button>
                <StepInfoContainer>
                    <h3 className='step-number'>Étape {step.id}</h3>
                    <h2 className='step-title'>{step.title}</h2>
                </StepInfoContainer>
            </StepContainer>
        </Link>
    )
}

Step.propTypes = {
    step: PropTypes.object.isRequired,
    segment: PropTypes.string.isRequired,
}

const StepContainer = StyledComponents.div`
    display: flex; 
    align-items: center;
    gap: 1rem; 

    .step-btn {
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: bold; 
        width: 33px; 
        height: 33px;
        border-radius: 50%;
        border-width: 1px;
        border-style: solid;
        transition-duration: 0.3s;
        transition-property: color, background-color, border-color;
        transition-timing-function: cubic-bezier(.4,0,.2,1);

        margin: 0;
        padding: 0;
        text-transform: none;
        background-image: none;
        cursor: pointer;

        &.active {
            background-color: hsl(206 94% 87% / 1); 
            color: hsl(213 96% 18% / 1); 
            border-color: transparent; 
        }

        &.inactive {
            border-color: hsl(0 0% 100% / 1); 
            background-color: transparent; 
            color: hsl(0 0% 100% / 1);
        }
    }
`

const StepInfoContainer = StyledComponents.div`
    display: none; 
    flex-direction: column;
    text-transform: uppercase;

    .step-number {
        font-family: var(--body-font); 
        font-size: 13px;
        font-weight: normal;
        color: hsl(231 11% 63% / 1); 
        margin: 0; 
    }

    .step-title {
        font-family: var(--body-font); 
        font-size: 14px;
        font-weight: bold;
        color: hsl(0 0% 100% / 1); 
        letter-spacing: .1em; 
        margin: 0; 
    }

    @media screen and (min-width: 1024px) {
        display: flex; 
    }
`