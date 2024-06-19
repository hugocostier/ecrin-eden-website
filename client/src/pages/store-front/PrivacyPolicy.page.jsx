import StyledComponents from 'styled-components'

export const PrivacyPolicyPage = () => {
    return (
        <PrivacyPolicyContainer>
            <section className='page-header'>
                <h2>Politique de confidentialité</h2>
            </section>

            <section className='content'>
                <h3>Article 1 : Préambule</h3>

                <p className='list-title'>La présente politique de confidentialité a pour but d&apos;informer les utilisateurs du site :</p>
                <ul className='list-container'>
                    <li>Sur la manière dont sont collectées leurs données personnelles. Sont considérées comme des données personnelles, toute information permettant d&apos;identifier un utilisateur. A ce titre, il peut s&apos;agir : de ses noms et prénoms, de son âge, de son adresse postale ou email, de sa localisation ou encore de son adresse IP (liste non-exhaustive);</li>
                    <li>Sur les droits dont ils disposent concernant ces données;</li>
                    <li>Sur la personne responsable du traitement des données à caractère personnel collectées et traitées;</li>
                    <li>Sur les destinataires de ces données personnelles;</li>
                    <li>Sur la politique du site en matière de cookies.</li>
                </ul>
                <p>Cette politique complète les <a className='link' href='/legal-notice'>mentions légales</a> et les <a className='link' href='/term-of-service'>Conditions Générales de vente</a></p>
            </section>

            <section className='content'>
                <h3>Article 2 : Principes relatifs à la collecte et au traitement des données personnelles</h3>

                <p className='list-title'>Conformément à l&apos;article 5 du Règlement européen 2016/679, les données à caractère personnel sont :</p>
                <ul className='list-container'>
                    <li>Traitées de manière licite, loyale et transparente au regard de la personne concernée;</li>
                    <li>Collectées pour des finalités déterminées (cf. Article 3.1 des présentes), explicites et légitimes, et ne pas être traitées ultérieurement d&apos;une manière incompatible avec ces finalités;</li>
                    <li>Adéquates, pertinentes et limitées à ce qui est nécessaire au regard des finalités pour lesquelles elles sont traitées;</li>
                    <li>Exactes et, si nécessaire, tenues à jour. Toutes les mesures raisonnables doivent être prises pour que les données à caractère personnel qui sont inexactes, eu égard aux finalités pour lesquelles elles sont traitées, soient effacées ou rectifiées sans tarder;</li>
                    <li>Conservées sous une forme permettant l&apos;identification des personnes concernées pendant une durée n&apos;excédant pas celle nécessaire au regard des finalités pour lesquelles elles sont traitées;</li>
                    <li>Traitées de façon à garantir une sécurité appropriée des données collectées, y compris la protection contre le traitement non autorisé ou illicite et contre la perte, la destruction ou les dégâts d&apos;origine accidentelle, à l&apos;aide de mesures techniques ou organisationnelles appropriées.</li>
                </ul>

                <p className='list-title'>Le traitement n&apos;est licite que si, et dans la mesure où, au moins une des conditions suivantes est remplie :</p>
                <ul className='list-container'>
                    <li>La personne concernée a consenti au traitement de ses données à caractère personnel pour une ou plusieurs finalités spécifiques;</li>
                    <li>Le traitement est nécessaire à l&apos;exécution d&apos;un contrat auquel la personne concernée est partie ou à l&apos;exécution de mesures précontractuelles prises à la demande de celle-ci;</li>
                    <li>Le traitement est nécessaire au respect d&apos;une obligation légale à laquelle le responsable du traitement est soumis;</li>
                    <li>Le traitement est nécessaire à la sauvegarde des intérêts vitaux de la personne concernée ou d&apos;une autre personne physique;</li>
                    <li>Le traitement est nécessaire à l&apos;exécution d&apos;une mission d&apos;intérêt public ou relevant de l&apos;exercice de l&apos;autorité publique dont est investi le responsable du traitement;</li>
                    <li>Le traitement est nécessaire aux fins des intérêts légitimes poursuivis par le responsable du traitement ou par un tiers, à moins que ne prévalent les intérêts ou les libertés et droits fondamentaux de la personne concernée qui exigent une protection des données à caractère personnel, notamment lorsque la personne concernée est un enfant.</li>
                </ul>
            </section>

            <section className='content'>
                <h3>Article 3 : Données à caractère personnel collectées et traitées dans le cadre de la navigation sur le site</h3>

                <h4>Article 3.1 : Données collectées</h4>
                <p className='list-title'>Les données personnelles collectées dans le cadre de notre activité sont les suivantes :</p>
                <ul className='list-container'>
                    <li>Données de connexion et d&apos;utilisation du site : historique de navigation, adresse IP, identifiant de session, mot de passe, etc.;</li>
                    <li>Données de profil : nom, prénom, adresse postale, adresse e-mail, numéro de téléphone, etc.;</li>
                    <li>Données relatives aux avis et commentaires : avis, commentaires, etc.;</li>
                    <li>Données relatives aux cookies : cookies, etc.</li>
                </ul>

                <p className='list-title'>La collecte et le traitement de ces données répond aux finalités suivantes :</p>
                <ul className='list-container'>
                    <li>Assurer la navigation sur le site et la gestion et la traçabilité des prestations et services commandés par l&apos;utilisateur;</li>
                    <li>Personnaliser les services en proposant à l&apos;utilisateur des contenus adaptés à ses préférences;</li>
                    <li>Permettre une communication entre l&apos;utilisateur et le site;</li>
                    <li>Permettre à l&apos;utilisateur de bénéficier des services du site;</li>
                    <li>Prévenir et lutter contre la fraude informatique (spamming, hacking, etc.);</li>
                    <li>Améliorer la navigation sur le site;</li>
                    <li>Conduire des enquêtes de satisfaction;</li>
                    <li>Assurer la sécurité et la confidentialité des données.</li>
                </ul>

                <h4>Article 3.2 : Mode de collecte des données</h4>
                <p className='list-title'>Lorsque vous utilisez notre site, sont automatiquement collectées les données suivantes :</p>
                <ul className='list-container'>
                    <li>Les données de connexion et d&apos;utilisation du site;</li>
                    <li>Les données de profil;</li>
                    <li>Les données relatives aux cookies.</li>
                </ul>

                <p className='list-title'>D&apos;autres données personnelles sont collectées lorsque vous effectuez les opérations suivantes sur la plateforme :</p>
                <ul className='list-container'>
                    <li>Création de compte;</li>
                    <li>Commande de prestations ou de services;</li>
                    <li>Contact avec le service client.</li>
                </ul>

                <p>Les données collectées sont conservées dans les conditions et selon les durées préconisées par la CNIL.</p>
                <p>La société est susceptible de conserver certaines données à caractère personnel au-delà des délais annoncés ci-dessus afin de remplir ses obligations légales ou réglementaires. </p>

                <h4>Article 3.3 : Hébergement des données</h4>
                <p className='list-title'>Le site ecrin-eden.fr est hébergé par :</p>
                <ul className='list-container'>
                    <li>Nom : Hostinger International Ltd</li>
                    <li>Raison sociale : Société privée à responsabilité limitée de Chypre</li>
                    <li>Adresse : 61 Lordou Vironos str. 6023 Larnaca, Chypre</li>
                    <li>Adresse e-mail : <a className='link' href='mailto:support@hostinger.com'>support@hostinger.com</a></li>
                </ul>

                <h4>Article 3.4 : Politique en matière de cookies</h4>
                <p>Le site ecrin-eden.fr a recours aux techniques de &quot;cookies&quot; lui permettant de traiter des statistiques et des informations sur le trafic, de faciliter la navigation et d&apos;améliorer le service pour le confort de l&apos;utilisateur décrit dans sa <a className='link' href='/cookies'>politique d&apos;utilisation des cookies</a>.</p>
            </section>

            <section className='content'>
                <h3>Article 4 : Responsable du traitement des données et délégué à la protection des données</h3>

                <h4>Article 4.1 : Le responsable du traitement des données</h4>
                <p>Les données à caractère personnelles sont collectées par Écrin d&apos;Eden, entreprise individuelle, dont le numéro d&apos;immatriculation est le [numéro RCS].</p>

                <p className='list-title'>Le responsable du traitement des données à caractère personnel peut être contacté de la manière suivante :</p>
                <ul className='list-container'>
                    <li>Par courrier  à l&apos;adresse 302 Route des Tronquisses, 30960 Les Mages;</li>
                    <li>Par téléphone, au <a className='link' href='tel:0762067782'>07.62.06.77.82</a>;</li>
                    <li>Par mail : <a className='link' href='mailto:contact@ecrin-eden.com'>contact@ecrin-eden.com</a>.</li>
                </ul>

                <h4>Article 4.2 : Le délégué à la protection des données</h4>
                <p>Le délégué à la protection des données de l&apos;entreprise ou du responsable est : Costier Sylvie, <a className='link' href='tel:0762067782'>07.62.06.77.82</a>, <a className='link' href='mailto:contact@ecrin-eden.com'>contact@ecrin-eden.com</a></p>
                <p>Si vous estimez, après nous avoir contactés, que vos droits &quot;Informatique et Libertés&quot;, ne sont pas respectés, vous pouvez adresser une information à la CNIL. </p>
            </section>

            <section className='content'>
                <h3>Article 5 : Les droits de l&apos;utilisateur en matière de collecte et de traitement des données</h3>

                <p className='list-title'>Tout utilisateur concerné par le traitement de ses données personnelles peut se prévaloir des droits suivants, en application du règlement européen 2016/679 et de la Loi Informatique et Liberté (Loi 78-17 du 6 janvier 1978) :</p>
                <ul className='list-container'>
                    <li>Droit d&apos;accès, de rectification et droit à l&apos;effacement des données (posés respectivement aux articles 15, 16 et 17 du RGPD);</li>
                    <li>Droit à la portabilité des données (article 20 du RGPD);</li>
                    <li>Droit à la limitation (article 18 du RGPD) et à l&apos;opposition du traitement des données (article 21 du RGPD);</li>
                    <li>Droit de ne pas faire l&apos;objet d&apos;une décision fondée exclusivement sur un procédé automatisé;</li>
                    <li>Droit de déterminer le sort des données après la mort;</li>
                    <li>Droit de saisir l&apos;autorité de contrôle compétente (article 77 du RGPD).</li>
                </ul>
                <p>Pour exercer vos droits, veuillez adresser votre courrier à Écrin d&apos;Eden - 302 Route des Tronquisses, 30960 Les Mages ou par mail à <a className='link' href='mailto:contact@ecrin-eden.com'>contact@ecrin-eden.com</a></p>
                <p>Afin que le responsable du traitement des données puisse faire droit à sa demande, l&apos;utilisateur peut être tenu de lui communiquer certaines informations telles que : ses noms et prénoms, son adresse e-mail ainsi que son numéro de compte, d&apos;espace personnel ou d&apos;abonné.</p>
                <p>Consultez le site <a className='link' href='https://www.cnil.fr/fr'>cnil.fr</a> pour plus d&apos;informations sur vos droits.</p>
            </section>

            <section className='content'>
                <h3>Article 6 : Conditions de modification de la politique de confidentialité</h3>

                <p>L&apos;éditeur du site ecrin-eden.fr se réserve le droit de pouvoir modifier la présente Politique à tout moment afin d&apos;assurer aux utilisateurs du site sa conformité avec le droit en vigueur.  </p>
                <p>Les éventuelles modifications ne sauraient avoir d&apos;incidence sur les achats antérieurement effectués sur le site, lesquels restent soumis à la Politique en vigueur au moment de l&apos;achat et telle qu&apos;acceptée par l&apos;utilisateur lors de la validation de l&apos;achat.  </p>
                <p>L&apos;utilisateur est invité à prendre connaissance de cette Politique à chaque fois qu&apos;il utilise nos services, sans qu&apos;il soit nécessaire de l&apos;en prévenir formellement.  </p>
                <p>La présente politique, éditée le 19 juin 2024, a été mise à jour le 19 juin 2024.</p>
            </section>
        </PrivacyPolicyContainer>
    )
}

const PrivacyPolicyContainer = StyledComponents.section`
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
        margin-top: 1.5rem; 
        margin-bottom: 2rem;

        a.link {
            color: var(--secondary-500); 
            text-decoration: underline; 
        }
    }

    .list-container {
        list-style: disc; 
        margin-left: 1rem; 
        margin-bottom: 1rem;
        padding-left: 1.5rem;
    }

    h4 {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    .list-title {
        margin: 0; 
    }

    p {
        margin: 0.75rem 0;
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