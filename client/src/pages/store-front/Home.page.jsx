import { Link, useLoaderData } from 'react-router-dom'
import StyledComponents from 'styled-components'

export const HomePage = () => {
    const { homeContent } = useLoaderData()

    return (
        <>
            {homeContent && (
                <>
                    <HomeHero className='home-hero' style={{ backgroundImage: `url(${homeContent.header[0].image})` }}>
                        <div className='hero-content'>
                            <h1>{homeContent.header[0].title}</h1>
                            <h2>{homeContent.header[0].subtitle}</h2>
                            <Link to='services'><button className='btn'>Massages bien-être</button></Link>
                        </div>
                    </HomeHero>

                    <HomeCard className='home-card first-card'>
                        <div className='card-content'>
                            <div>
                                <h3>{homeContent.main[0].title}</h3>
                                <h4>{homeContent.main[0].subtitle}</h4>
                                <p>{homeContent.main[0].text}</p>
                            </div>
                        </div>
                        <div className='card-image'>
                            {homeContent.main[0].image.map((image, index) => (
                                <img src={image} alt={`Image ${index + 1}`} key={index + 1} />
                            ))}
                        </div>
                    </HomeCard>

                    <HomeVideo className='home-video'>
                        <video controls>
                            <source src={homeContent.video[0].video} type='video/mp4' />
                        </video>
                    </HomeVideo>

                    <HomeCard className='home-card second-card'>
                        <div className='card-content'>
                            <div>
                                <h3>{homeContent.main[1].title}</h3>
                                <p>{homeContent.main[1].text}</p>
                            </div>
                        </div>
                        <div className='card-background'></div>
                        <div className='card-image'>
                            <img src={homeContent.main[1].image} alt={`Image 1`} />
                        </div>
                    </HomeCard>

                    <HomeWarning className='home-warning'>
                        <div>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='60' height='60' fill='rgba(24,24,24,1)'><path d='M12.8659 3.00017L22.3922 19.5002C22.6684 19.9785 22.5045 20.5901 22.0262 20.8662C21.8742 20.954 21.7017 21.0002 21.5262 21.0002H2.47363C1.92135 21.0002 1.47363 20.5525 1.47363 20.0002C1.47363 19.8246 1.51984 19.6522 1.60761 19.5002L11.1339 3.00017C11.41 2.52187 12.0216 2.358 12.4999 2.63414C12.6519 2.72191 12.7782 2.84815 12.8659 3.00017ZM4.20568 19.0002H19.7941L11.9999 5.50017L4.20568 19.0002ZM10.9999 16.0002H12.9999V18.0002H10.9999V16.0002ZM10.9999 9.00017H12.9999V14.0002H10.9999V9.00017Z'></path></svg>
                        </div>
                        <p>{homeContent.footer[0].text}</p>
                    </HomeWarning>

                    <HomeReviews className='home-reviews'>
                        {homeContent.reviews.map((review, index) => (
                            <div className='review' key={index + 1}>
                                <img src={review.image} alt={`Image ${index + 1}`} />
                                <div className='review-content'>
                                    <p><q>{review.text}</q></p>
                                    <h3>{review.author}</h3>
                                </div>
                            </div>
                        ))}
                    </HomeReviews>
                </>
            )}
        </>
    )
}

const HomeHero = StyledComponents.section`
    background-repeat: no-repeat;  
    background-size: cover; 
    background-position: 60% 55%; 
    height: calc(100vh - 80px); 

    .hero-content {
        display: flex; 
        flex-direction: column;
        padding-top: 25vh; 
        margin-left: 5vw;

        h1 {
            color: var(--white);
            margin: 0; 
        }

        h2 {
            font-size: 1.25rem;
            color: var(--white);
            margin-top: 6px;
            margin-bottom: 20px;
        }

        button {
            background: var(--tertiary-500);
            padding: 15px 30px;
            border-radius: 30px; 
            width: 70%; 
            margin-top: 6px;

            &:hover {
                background: var(--tertiary-800);
            }
        }
    }

    @media screen and (min-width: 640px) {
        .hero-content {
            padding-top: 45vh; 
            width: max-content;

            h2 {
                font-size: 1.5rem;
            }

            button {
                font-size: 1.175rem;
                width: 50%; 
            }
        }
    }

    @media screen and (min-width: 1024px) {
        background-position: 50% 55%; 

        .hero-content {
            display: flex; 
            flex-direction: column;
            padding-top: 30vh; 
        
            h2 {
                font-size: 1.75rem;
            }
        
            button {
                font-size: 1.25rem;
                width: 60%;
            }
        }
    }
`

const HomeCard = StyledComponents.section`
    display: grid; 
    grid-template-columns: 1fr; 

    .card-content {
        div {           
            h3, h4 {
                font-weight: normal; 
            }

            p {
                text-align: justify;
            }
        }
    }

    .card-image {
        img {
            object-fit: cover; 
            object-position: 50% 50%; 
        }
    }

    &.first-card {
        .card-content {
            background-color: var(--tertiary-500);
            color: var(--white); 
    
            div {
                margin: 60px 10% 100px 10%;
            }
        }
    
        .card-image {
            display: flex; 
            flex-direction: column; 
            flex-wrap: nowrap; 
            justify-content: flex-start; 
            align-self: center; 
            row-gap: 3.2vw; 
            margin: -60px 10% 60px 10%;
    
            img {
                width: 100%;
                max-height: 500px;
            } 
        }
    }
    
    &.second-card {
        .card-content {
            color: var(--black); 
    
            div {
                margin: 40px 10% 80px 10%;
            }
        }
        
        .card-image {
            background-color: var(--secondary-500);
    
            img {
                width: 80%; 
                max-height: 400px; 
                margin: -10% 10% 10% 10%;
            }
        }
    }

    @media screen and (min-width: 640px) {
        .card-image {
            grid-row: 1 /2; 
        }

        &.first-card {
            .card-content {
                margin-top: -100px; 

                div {
                margin: 140px 4% 60px 4%;
                }
            }

            .card-image {
                flex-direction: row; 
                flex-wrap: wrap; 
                justify-content: space-between; 
                margin: 4% 4% 0 4%;
                column-gap: 1.85vw;
                grid-row: 1 /2; 

                img {
                    height: 100%;
                    width: calc(((33.3% - ((0px + 0px) + 1.227vw)) - 1px));
                }
            }
        }

        &.second-card {
            grid-template-columns: 0.5fr 80px 1fr; 
            margin-bottom: 50px; 

            .card-content {
                grid-column: 3 / 4; 
                grid-row: 1 / 2;
                align-self: center; 

                div {
                    margin: 40px 8% 20px 10%;
                }
                
            }

            .card-background {
                grid-column: 1 / 2; 
                grid-row: 1 / 2;

                background-color: var(--secondary-500);
            }

            .card-image {
                background-color: transparent; 

                grid-column: 1 / 3; 
                grid-row: 1 / 2;
                margin: 50px 0 50px 10%; 
                align-self: center; 

                img {
                    width: 100%; 
                    height: auto;
                    margin: 0; 
                }
            }
        }
    }

    @media screen and (min-width: 1024px) {   
        .card-content {
            div {           
                h3, h4 {
                    font-weight: normal; 
                }
            }
        }
    
        &.first-card {
            grid-template-columns: 1fr 100px 1fr;
    
            .card-content {
                display: grid; 
                grid-template-columns: 100px 1fr; 
                justify-content: center; 
                align-items: center; 
                grid-column: 2 / 4;
                grid-row: 1 / 2;
                margin: 0; 
                align-self: center; 
        
                div {
                    grid-column: 2 / 3;
                    margin: 50px 30px; 
                }
            }
        
            .card-image {
                flex-wrap: nowrap; 
                grid-column: 1 / 3; 
                column-gap: 0; 
                margin: 30px 0 30px 4%; 
        
                img {
                    min-height: 42vh; 
                    height: auto; 
                    width: calc(((33.3% - ((0px + 0px) + 0.805vw)) - 1px));
                }
            }
        }
    
        &.second-card {
            grid-template-columns: 0.8fr 100px 1fr; 
        } 
    }

    @media screen and (min-width: 1200px) {   
        .card-content {
            div {           
                h3 {
                    font-weight: normal; 
                }
    
                h4 {
                    font-weight: normal;
                }
            }
        }
        
        &.first-card {
            grid-template-columns: 1.6fr 100px 1fr;
    
            .card-content {
                div {
                    margin: 60px; 
                }
            }
    
            .card-image {
                margin-top: 60px; 
                margin-left: 8%; 
                margin-bottom: 60px; 
            }
        }
    }
`

const HomeVideo = StyledComponents.section`
    margin: 50px 0 40px 0;

    video {
        width: 100%; 
        height: auto;
        max-height: 700px; 
        background-color: var(--grey-500);
    }
`

const HomeWarning = StyledComponents.section`
    margin: 10%;

    div {
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: center; 
        margin-bottom: 20px; 
    }

    p {
        text-align: justify; 
    }


    @media screen and (min-width: 640px) {
        margin: 0 4%; 
    }
`

const HomeReviews = StyledComponents.section`
    display: grid; 
    grid-template-columns: 1fr; 
    row-gap: 50px; 
    margin-top: 100px; 

    .review {
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: center; 
        
        .review-content {
            text-align: center; 
            color: var(--white); 
            padding: 0 8%;

            p {
                margin: 10px 0;  
            }

        }
        
        img {
            width: 80px; 
            height: 80px; 
            border-radius: 50%; 
            margin-top: -40px; 
            margin-bottom: 10px;
            border: 2px solid var(--grey-200); 
        }

        &:nth-child(1) {
            background-color: var(--secondary-500);
        }
        
        &:nth-child(2) {
            background-color: var(--primary-500);
        }
        
        &:nth-child(3) {
            background-color: var(--tertiary-500);
        }
    }

    @media screen and (min-width: 640px) {
        grid-template-columns: 1fr 1fr 1fr; 
        height: 300px;

        .review {
            display:grid; 

            .review-content {
                grid-column: 1 / 2; 
                grid-row: 1 / 2; 

                h3 {
                    margin-bottom: 0; 
                }
            }

            img {
                justify-self: center;
                margin-top: -290px;
                grid-column: 1 / 2; 
                grid-row: 1 / 2; 
            }
        }
    }

    @media screen and (min-width: 1024px) {
        .review {    
            img {
                width: 100px; 
                height: 100px; 
            }
        }
    }
`