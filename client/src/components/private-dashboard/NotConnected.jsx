import { Link } from 'react-router-dom'
import StyledComponents from 'styled-components'

export const NotConnected = () => {
    return (
        <NotConnectedStyled>
            <section className='not-connected-container'>
                <h2>Oops ! Vous n&apos;êtes pas connecté...</h2>
                <Link to='/login'>Revenir à la page de connexion</Link>
            </section>
        </NotConnectedStyled>
    )
}

const NotConnectedStyled = StyledComponents.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .not-connected-container {
        background-color: #ffffff;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
        align-self: center;
        
        h2 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }

        a {
            color: var(--grey-500);
            margin: 0; 
            height: 50px; 
            font-size: 1.25rem;

            &:hover {
                text-decoration: underline;
            }
        }
    }
`