import StyledComponents from 'styled-components'

export const CookiePolicyPage = () => {
    return (
        <CookiePolicyContainer>
            <section className='page-header'>
                <h2>Politique de cookies</h2>
            </section>

            <section className='content about-container'>
                <h3>À propos des cookies</h3>
                <p>
                    Lors de la consultation de notre plateforme des cookies sont déposés sur votre ordinateur, votre mobile ou votre tablette. A l&apos;occasion de votre première visite sur notre site, un bandeau vous informe de la présence de ces cookies et vous invite à indiquer votre choix. Les cookies ne sont déposés que si vous les acceptez. Vous pouvez en outre refuser ces cookies en configurant les paramètres de votre navigateur.
                </p>
                <p>
                    Nous utilisons différents cookies pour sécuriser notre site, mesurer sa fréquentation, vous permettre de vous connecter à votre espace personnel mais également pour vous proposer des vidéos, des contenus animés et interactifs et plus largement pour améliorer votre expérience de navigation.
                </p>
            </section>

            <section className='content details-container'>
                <h3>Deux types de cookies sont déposés sur notre site :</h3>
                <div className='functional-cookie-container'>
                    <h4>Cookies strictement nécessaires au site pour fonctionner.</h4>
                    <p>
                        Ces cookies permettent aux services principaux du site de fonctionner de manière optimale. Vous pouvez techniquement les bloquer en utilisant les paramètres de votre navigateur mais votre expérience sur le site risque d&apos;être dégradée.
                    </p>
                    <table>
                        <caption>Cookies techniques</caption>
                        <thead>
                            <tr>
                                <th>Nom du cookie</th>
                                <th>Finalité</th>
                                <th>Durée de conservation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>connect.sid</td>
                                <td>Permet la connection d&apos;un utilisateur à son espace personnel</td>
                                <td>7 ou 14 jours</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='tier-cookie-container'>
                    <h4>Cookies tiers destinés à améliorer l&apos;interactivité du site.</h4>
                    <p>Notre site s&apos;appuie sur ces tiers :</p>
                    <ul>
                        <li>API : <a className='link' href='https://policies.google.com/privacy?hl=fr-FR'>Google Maps (service de cartographie)</a></li>
                        <li>API : <a className='link' href='https://policies.google.com/privacy?hl=fr-FR'>Google Maps Embed (service de cartographie)</a></li>
                        <li>API : <a className='link' href='https://policies.google.com/privacy?hl=fr-FR'>reCAPTCHA (prévention des spams)</a></li>
                        <li>Vidéos : <a className='link' href='https://policies.google.com/privacy?hl=fr&gl=fr'>YouTube</a></li>
                    </ul>
                    <p>
                        Ces fonctionnalités utilisent des cookies tiers directement déposés par ces services.
                    </p>
                    <p>
                        Via ces cookies, ces tiers collecteront et utiliseront également vos données de navigation pour leur propre compte afin de proposer de la publicité ciblée et des contenus en fonction de votre historique de navigation. Pour plus d&apos;informations, nous vous encourageons à consulter leur politique de confidentialité.
                    </p>
                    <p>
                        Consultez notre <a className='link' href='/privacy-policy'>politique de confidentialité</a>
                    </p>
                </div>
            </section>
        </CookiePolicyContainer>
    )
}

const CookiePolicyContainer = StyledComponents.section`
    margin: 0 auto;
    padding-bottom: 2rem;
    background-color: white; 

    .page-header {
        background-color: var(--secondary-500); 
        margin: 0; 
        padding: 20px 0; 
        text-align: center;

        h2 {
            margin: 0;
            line-height: 1; 
            color: var(--white);
        }
    }

    .content {
        padding: 0 4%;
        margin: 1.5rem 0; 

        &.about-container {
            padding-bottom: 1rem; 
            border-bottom: 1px solid var(--grey-300);
        }

        .functional-cookie-container, .tier-cookie-container {
            h4 {
                margin-bottom: 0.5rem;
            }

            p {
                margin: 0.5rem 0;
            }
        }

        .functional-cookie-container {
            table {
                width: 100%; 
                border-collapse: collapse; 
                margin-top: 1rem; 
                margin-bottom: 2rem;

                caption {
                    font-weight: bold; 
                    color: var(--grey-500);
                    margin-bottom: 0.5rem;
                    text-align: left;
                }

                th, td {
                    border: 1px solid var(--grey-300); 
                    padding: 0.5rem; 
                    text-align: left;

                    &:first-child {
                        width: 20%;
                    }
                }

                th {
                    
                }
            }
        }

        .tier-cookie-container {
            ul {
                list-style: disc; 
                margin-left: 1rem; 
                margin-bottom: 1rem;
                padding-left: 1.5rem;
            }

            p:first-of-type {
                margin-bottom: 0; 
            }

            a.link {
                color: var(--secondary-500); 
                text-decoration: underline; 
            }
        }
    }

    @media screen and (min-width: 768px) {
        width: 750px; 
        padding-left: 16px;
        padding-right: 16px;
    }

    @media screen and (min-width: 1024px) {
        width: 970px; 

        .page-header {
            h2 {
                font-size: 3.5rem;
            }
        }

        .content {
            width: 80%; 
            margin-left: auto;
            margin-right: auto;
        }
    }
`