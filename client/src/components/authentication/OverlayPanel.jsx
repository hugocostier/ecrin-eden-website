import PropTypes from 'prop-types'
import StyledComponents from 'styled-components'

export const OverlayPanel = ({ onSignUpClick, onSignInClick }) => {
    return (
        <OverlayContainer className='overlay-container'>
            <section className='overlay'>
                <div className='overlay-panel overlay-left'>
                    <h2>Bon retour !</h2>
                    <p>Pour rester en lien avec nous merci de te connecter avec tes informations personnelles</p>
                    <button className='ghost' id='signIn' onClick={onSignInClick}>Se connecter</button>
                </div>

                <div className='overlay-panel overlay-right'>
                    <h2>Bonjour !</h2>
                    <p>Saisissez vos informations personnelles et débutez votre aventure avec nous</p>
                    <button className='ghost' id='signUp' onClick={onSignUpClick}>Inscription</button>
                </div>
            </section>
        </OverlayContainer>
    )
}

OverlayPanel.propTypes = {
    onSignUpClick: PropTypes.func,
    onSignInClick: PropTypes.func
}

const OverlayContainer = StyledComponents.section`
    position: absolute;
    width: 100%;
    height: 40%;
    top: 0; 
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;

    .overlay {
        background: var(--primary-400);
        background: linear-gradient(to right, var(--primary-600), var(--primary-200)) no-repeat 0 0 / cover;

        color: var(--white);
        position: relative;
        height: 100%;
        width: 100%;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;

        .overlay-panel {
            position: absolute;
            top: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 0 40px;
            height: 100%;
            transform: translateX(0);
            transition: transform 0.6s ease-in-out;

            &.overlay-right {
                right: 0;
                transform: translateX(0);
            }

            button.ghost {
                background: transparent;
                border-color: var(--white);
                cursor: pointer; 
            }
        }
    }

    @media screen and (max-width: 1023px) {
        grid-column: 1 / 2;
        grid-row: 2 / 3; 

        height: 100%;

        .overlay {
            display: grid; 
            grid-template-columns: 1fr; 

            .overlay-panel {
                width: 100%;
                
                p {
                    margin: 2vh 0 2.5vh; 
                }
                
                &.overlay-left, 
                &.overlay-right {
                    background: linear-gradient(to right, var(--primary-600), var(--primary-200)) no-repeat 0 0 / cover;
                    grid-column: 1 / 2;
                    grid-row: 1 / 2;
                    padding: 0 10vw; 
                }
            }

        }
    }

    @media screen and (min-width: 1024px) {
        top: 0; 
        left: 50%;
        width: 50%;
        height: 100%;

        .overlay {
            width: 200%; 
            left: -100%;

            .overlay-panel {
                width: 50%;

                &.overlay-left {
                    transform: translateX(-20%);
                }
            }
        }
    }
`