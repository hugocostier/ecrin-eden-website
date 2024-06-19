import StyledComponents from 'styled-components'

export const LegalNoticePage = () => {
    return (
        <LegalNoticeContainer>
            <section className='page-header'>
                <h2>Mentions légales</h2>
            </section>

            <section className='content'>
                <h4>Qui suis-je ?</h4>
                <p>Sylvie Costier</p>
                <p>302 Route des Tronquisses</p>
                <p>30960 Les Mages</p>
                <p>07 62 06 77 82</p>
            </section>

            <section className='content'>
                <h4>Éditeur</h4>
                <p>Ce site est édité par Sylvie Costier.</p>
            </section>

            <section className='content'>
                <h4>Réalisation</h4>
                <p>Ce site a été réalisé par Lauryne Costier</p>
            </section>

            <section className='content'>
                <h4>Développement et intégration</h4>
                <p>Hugo Costier - Développeur FullStack</p>
                <p>44 Rue des Viviers</p>
                <p>49000 Angers</p>
            </section>

            <section className='content'>
                <h4>Hébergement et diffusion</h4>
                <p>Hostinger International Ltd</p>
                <p>61 Lordou Vironos str. 6023 Larnaca, Chypre</p>
                <p><a className='link' href='mailto:support@hostinger.com'>support@hostinger.com</a></p>
                <p><a className='link' href='https://www.hostinger.fr/'>www.hostinger.fr</a></p>
            </section>

            <section className='content'>
                <h4>Politique de confidentialité</h4>
                <p>Je m&apos;engage à ce que <a className='link' href='/privacy-policy'>la collecte et le traitement de vos données</a>, effectués à partir du site ecrin-eden.fr, soient conformes au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.</p>
            </section>

            <section className='content'>
                <h4>Droits photographiques</h4>
                <p>Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont proposés sous license ouverte.</p>
                <p>© Sylvie Costier</p>
            </section>
        </LegalNoticeContainer>
    )
}

const LegalNoticeContainer = StyledComponents.section`
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

        a.link {
            color: var(--secondary-500); 
            text-decoration: underline; 
        }

        h4 {
            margin-bottom: .75rem;
        }

        p {
            margin: 0;
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