import PropTypes from 'prop-types';

export const OverlayPanel = ({ onSignUpClick, onSignInClick }) => {
    return (
        <section className="overlay-container">
            <section className="overlay">
                <div className="overlay-panel overlay-left">
                    <h2>Bon retour !</h2>
                    <p>Pour rester en lien avec nous merci de te connecter avec tes informations personnelles</p>
                    <button className="ghost" id="signIn" onClick={onSignInClick}>Se connecter</button>
                </div>

                <div className="overlay-panel overlay-right">
                    <h2>Bonjour !</h2>
                    <p>Saisissez vos informations personnelles et débutez votre aventure avec nous</p>
                    <button className="ghost" id="signUp" onClick={onSignUpClick}>Inscription</button>
                </div>
            </section>
        </section>
    )
}

OverlayPanel.propTypes = {
    onSignUpClick: PropTypes.func,
    onSignInClick: PropTypes.func
}