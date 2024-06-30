import PropTypes from 'prop-types';
import StyledComponents from 'styled-components';

export const FormWrapper = ({ children, title, description }) => {
    return (
        <FormHeader>
            <h2>{title}</h2>
            <p className='header-description'>{description}</p>
            {children}
        </FormHeader>
    )
}

FormWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

const FormHeader = StyledComponents.section`
    display: grid; 
    grid-template-rows: auto auto 1fr auto;
    width: 100%;
    height: 100%;
    padding: 1.75rem 1.5rem 2rem 1.5rem; 
    background-color: var(--white);
    border-radius: .5rem;
    box-shadow: 0 0 rgba(0, 0, 0, 0), 0 0 rgba(0, 0, 0, 0), 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -4px rgba(0, 0, 0, .1);

    h2 {
        font-family: var(--body-font); 
        font-weight: bold;
        font-size: 1.5rem;
        line-height: 2rem;
        color: var(--tertiary-900); 
        margin: 0; 
    }

    p {
        color: var(--grey-500);
        margin: 0;
        margin-top: .75rem;
        line-height: 1rem;

        &.header-description {
            line-height: 1.5rem;
        }
    }
    
    @media screen and (min-width: 1024px) {
        max-width: 694px;
        padding: 2rem 50px 1rem 50px; 
        background-color: transparent;
        border-radius: 0;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);

        h2 {
            font-size: 34px;
        }
    }
`