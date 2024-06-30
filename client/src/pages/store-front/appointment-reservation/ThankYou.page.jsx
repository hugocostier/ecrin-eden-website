import StyledComponents from 'styled-components'
import thankYou from '../../../assets/images/appointment-reservation/thank-you-icon.svg'

export const ThankYouPage = () => {

    return (
        <ThankYouContainer>
            <img src={thankYou} alt='Merci' />
            <h2>Merci !</h2>
            <p>Votre rendez-vous à été enregistré avec succès. Un email récapitulatif vous sera envoyé sous peu, suivi d&apos;un second email une fois que le praticien aura validé manuellement votre rendez-vous.</p>
            <p>Si vous avez besoin d&apos;aide ou pour toute question, n&apos;hésitez pas à nous envoyer un email à <a href='mailto:contact@ecrin-eden.com'>contact@ecrin-eden.com</a></p>
        </ThankYouContainer>
    )
}

const ThankYouContainer = StyledComponents.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 1.75rem 1.5rem 2rem 1.5rem; 
    background-color: var(--white);
    border-radius: .5rem;
    box-shadow: 0 0 rgba(0, 0, 0, 0), 0 0 rgba(0, 0, 0, 0), 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -4px rgba(0, 0, 0, .1);

    img {
        max-width: 100%; 
        height: auto;
        width: 60px; 
    }

    h2 {
        margin: 1rem 0 0 0;
        color: var(--tertiary-900); 
        font-size: 2.5rem;
    }

    p {
        color: var(--grey-500); 
        margin: .75rem 0 0 0;

        a {
            color: var(--tertiary-900); 
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    @media screen and (min-width: 1024px) {
        max-width: 694px;
        padding: 2rem 50px 1rem 50px; 
        background-color: transparent;
        border-radius: 0;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);

        img {
            width: auto; 
        }
    }
`