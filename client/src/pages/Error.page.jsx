import { Link, useRouteError } from 'react-router-dom'
import StyledComponents from 'styled-components'
import error from '../assets/images/error-background.jpg'

export const ErrorPage = () => {
    const error = useRouteError()
    console.error(error)

    return (
        <ErrorContainer id='error-page'>
            <h2 className='error-title'>Oops!</h2>
            <p className='error-status'>404 - Page non trouvée</p>
            <p className='error-description'>La page que vous cherchez à pu être supprimée, son nom à changé ou est temporairement indisponible</p>
            <Link to='/'>Retour à l&apos;accueil</Link>
        </ErrorContainer>
    )
}

const ErrorContainer = StyledComponents.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 1rem;
    max-width: 800px;
    margin: 0 auto;

    .error-title {
        font-size: 16rem;
        margin-bottom: 3rem;

        background: url(${error}) no-repeat center center/cover; 
        -webkit-background-clip: text;
        background-clip: text; 
        -webkit-text-fill-color: transparent;  
        color: transparent; 
    }

    .error-status {
        font-weight: bold;
        font-size: 2rem;
        text-transform: uppercase;
        line-height: 1; 
        margin-bottom: 1rem;
    }
        
    .error-description {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;  
        text-align: center;
        line-height: 1.5;
    }

    a {
        font-size: 1.25rem;
        font-weight: bold; 
        text-transform: uppercase; 
        color: var(--white);
        text-decoration: none;
        transition-duration 0.2s;
        transition-property: opacity color;

        background-color: var(--primary-500); 
        box-shadow: 0 5px 5px rgba(102, 85, 77, 0.5);
        padding: 10px 40px;
        border-radius: 50px; 

        &:hover {
            opacity: .7;
        }
    }
`