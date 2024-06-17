import { Link, useLoaderData } from 'react-router-dom'
import StyledComponents from 'styled-components'
import { Loading, PageTitle } from '../../components'
import { useLoader } from '../../hooks/useLoader.hook'

export const ServicesPage = () => {
    const { serviceContent } = useLoaderData()

    const loading = useLoader(serviceContent)

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                serviceContent ? (
                    <>
                        <PageTitle content={serviceContent} pageName='service'></PageTitle>

                        <ServiceContent className='service-main'>
                            <section className='card card-intro'>
                                <div className='svg-container'>
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='88.458 89.863 23.063 20.276'><g><path d='m109.66 91.75-.36.35.36-.35a6.25 6.25 0 0 0-4.45-1.84 6.25 6.25 0 0 0-4.45 1.84l-.76.76-.76-.76a6.29 6.29 0 1 0-8.9 8.89l9.31 9.36a.51.51 0 0 0 .7 0l9.31-9.31a6.3 6.3 0 0 0 0-8.94Zm-.66 8.19-9 9-9-9a5.29 5.29 0 1 1 7.48-7.48l1.12 1.11a.48.48 0 0 0 .7 0l1.12-1.12a5.29 5.29 0 0 1 3.74-1.54 5.26 5.26 0 0 1 3.84 1.55 5.3 5.3 0 0 1 0 7.48Z'></path></g></svg>
                                </div>

                                <div className='card-content'>
                                    <h3>{serviceContent.main[0].title}</h3>
                                    {serviceContent.main[0].text.map((text, index) => (
                                        <p key={index}>{text}</p>
                                    ))}
                                </div>
                            </section>

                            {serviceContent.services.map((service, index) => (
                                <section className={`card card-${index}`} key={index + 1}>
                                    <div className='card-content'>
                                        <h3 className='title'>{service.title}</h3>
                                        <p className='time'>{service.time}</p>
                                        <div className='text'>
                                            <p>{service.text}</p>
                                        </div>
                                        <Link to={'/appointment/service'} className='btn-book'>
                                            Réserver maintenant
                                        </Link>
                                    </div>

                                    <div className='card-image'>
                                        <img src={service.image} alt={`service ${index + 1}`} />
                                    </div>
                                </section>
                            ))}
                        </ServiceContent>

                        <ServiceFooter className='service-footer'>
                            <h4>{serviceContent.header[0].subtitle}</h4>
                        </ServiceFooter>
                    </>
                ) : null
            )}
        </>
    )
}

const ServiceContent = StyledComponents.section`
    .card {
        .card-content {
            display: grid;
            grid-template-columns: 1fr 0.5fr;
            align-items: center;
            text-align: justify;
            margin: 30px 8% 20px 8%;

            a { 
                color: inherit; 
                text-decoration: none; 
            }

            .title {
                grid-column: 1 / 2;
                grid-row: 1 / 2;
                text-align: left;
                font-weight: normal;
            }

            .time {
                grid-column: 2 / 3;
                grid-row: 1 / 2;
                text-align: center;
                font-size: 1.125rem;
            }

            .text {
                grid-column: 1 / 3;
                grid-row: 2 / 3;
            }

            .btn-book {
                grid-column: 1 / 2;
                grid-row: 3 / 4;

                border: 1px solid var(--black);
                border-radius: 30px;
                text-align: center;
                padding: 6px 0;

                &:hover {
                    opacity: 0.6;
                }
            }
        }

        .card-image {
            display: grid;

            img {
                width: 100%;
                /* max-height: 400px;  */
                object-fit: cover;
                object-position: 50% 50%;
            }
        }
    }

    .card-intro {
        margin-top: 40px;

        .svg-container {
            text-align: center;

            svg {
                width: 50px;
                height: 50px;
            }
        }

        .card-content {
            display: block;
            margin-top: 0;
            margin-bottom: 50px;

            h3 {
                text-align: center;
            }
        }
    }


    @media screen and (min-width: 640px) {
        margin-bottom: 30px;

        .card:not(:first-of-type) {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;

            img {
                max-height: 500px;
            }
        }

        .card-1,
        .card-3 {
            .card-content {
                grid-column: 2 / 3;
                grid-row: 1 / 2;
            }

            .card-image {
                grid-column: 1 / 2;
                grid-row: 1 / 2;
            }
        }
    }

    @media screen and (min-width: 1024px) {
        .card:not(:first-of-type) {
            height: calc(100vh - 80px);

            img {
                max-height: calc(100vh - 80px);
            }
        }
    }
`

const ServiceFooter = StyledComponents.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    height: 250px;
    background-color: var(--primary-500);
    color: var(--white);
    text-align: center;

    h4 {
        text-transform: uppercase;
        font-weight: normal;
        margin: 0 8%;
    }

    @media screen and (min-width: 640px) {
        height: 400px;
    }
`