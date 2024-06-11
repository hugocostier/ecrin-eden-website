import { useLoaderData } from 'react-router-dom'
import StyledComponents from 'styled-components'
import { Loading } from '../../components'
import { useLoader } from '../../hooks/useLoader.hook'

export const CertificationPage = () => {
    const { certificationContent } = useLoaderData()

    const loading = useLoader(certificationContent)

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                certificationContent ? (
                    <>
                        <CertificationTitle
                            className='certification-title'
                            style={{ backgroundImage: `url(${certificationContent.header[0].images})` }}
                        >
                            <h2>{certificationContent.header[0].title}</h2>
                        </CertificationTitle>

                        <CertificationContent className='certification-main'>
                            {certificationContent.main.map((main, index) => (
                                <div className={`card card-${index + 1}`} key={index + 1}>
                                    <div className='card-content'>
                                        <h3>{main.title}</h3>
                                        <p>{main.text.map((text) => (`${text} `))}</p>
                                    </div>

                                    <div className='card-image'>
                                        {main.images && main.images.map((image, index) => (
                                            <img key={index + 1} src={image} alt={`Card ${index + 1}`} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </CertificationContent>
                    </>
                ) : null
            )}
        </>
    )
}

const CertificationTitle = StyledComponents.section`
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;

    padding: 100px 0;
    text-align: center;
    color: var(--white);

    h2 {
        margin: 0 10%;
    }

    @media screen and (min-width: 1024px) {
        h2 {
            margin-bottom: 20px;
        }
    }
`

const CertificationContent = StyledComponents.section`
    text-align: justify;
    color: var(--white);

    .card {
        background-color: var(--primary-500);
        align-items: center;

        .card-content {
            margin: 0 8%;

            h3 {
                font-weight: normal;
                padding-top: 20px;
            }
        }

        .card-image {
            img {
                width: 100%;
                object-fit: cover;
                object-position: 50% 50%;
            }
        }
    }

    .card-1 {
        padding-bottom: 50px;

        .card-image {
            display: grid;
            grid-template-columns: 1fr;
            margin: 0 8%;
            align-items: center;

            img {
                width: 60%;
            }

            img:nth-child(1) {
                grid-column: 1 / 2;
                grid-row: 1 / 2;
            }

            img:nth-child(2) {
                width: 60%;
                aspect-ratio: 1/1;
                grid-column: 1 / 2;
                grid-row: 1 / 2;
                justify-self: right;
            }
        }
    }

    .card-2 {
        border-top: 1px solid rgba(255, 255, 255, 0.3);

        .card-image {
            background-color: var(--white);
            display: grid;
            grid-template-columns: 1fr;
            row-gap: 10px;

            img {
                max-height: 400px;
            }
        }
    }

    @media screen and (min-width: 640px) {
        .card-2 {
            .card-image {
                grid-template-columns: repeat(3, 1fr);
                column-gap: 10px;
                padding-top: 20px;
            }
        }
    }
    
    @media screen and (min-width: 1024px) {    
        .card-1 {
            display: grid;
            grid-template-columns: 0.8fr 1.2fr;
            padding: 0;

            .card-content {
                grid-column: 2 / 3;
                grid-row: 1 /2;
            }

            .card-image {
                grid-column: 1 / 2;
                grid-row: 1 /2;

                align-self: center;
                justify-self: center;
            }
        }

        .card-2 {
            background-color: transparent;

            .card-content {
                background-color: var(--primary-500);
                margin: 0;
                padding: 0 10%;

                p {
                    padding-bottom: 20px;
                    margin: 0;
                }
            }

            .card-image {
                background-color: transparent;
                max-width: 1024px;
                margin: 0 auto;
            }
        }
    }

    @media screen and (min-width: 1400px) {
        .card-1 {
            padding: 20px 0;
        }
    }
`
