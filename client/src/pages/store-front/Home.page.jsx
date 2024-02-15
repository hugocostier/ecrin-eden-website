import { useLoaderData } from 'react-router-dom'
import '../../assets/css/Home.page.css'
import { Loading } from '../../components/Loading'
import { useLoader } from '../../hooks/useLoader.hook'

export const HomePage = () => {
    const { homeContent } = useLoaderData() 

    const loading = useLoader(homeContent)

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                homeContent ? (
                    <>
                        <section className='home-hero' style={{backgroundImage:`url(${homeContent.header[0].image})`}}>
                            <div className='hero-content'>
                                <h1>{homeContent.header[0].title}</h1>
                                <h2>{homeContent.header[0].subtitle}</h2>
                                <button className='btn'>Massages bien-être</button>
                            </div>
                        </section>

                        <section className='home-card first-card'>
                            <div className='card-content'>
                                <div>
                                    <h3>{homeContent.main[0].title}</h3>
                                    <h4>{homeContent.main[0].subtitle}</h4>
                                    <p>{homeContent.main[0].text}</p>
                                </div>
                            </div>
                            <div className='card-image'>
                                {homeContent.main[0].image.map((image, index) => (
                                    <img src={image} alt={`Image ${index + 1}`} key={index + 1}/>
                                ))}
                            </div>
                        </section>

                        <section className='home-video'>
                            <video controls>
                                <source src={homeContent.video[0].video} type='video/mp4'/>
                            </video>
                        </section>

                        <section className='home-card second-card'>
                            <div className='card-content'>
                                <div>
                                    <h3>{homeContent.main[1].title}</h3>
                                    <p>{homeContent.main[1].text}</p>
                                </div>
                            </div>
                            <div className='card-background'></div>
                            <div className='card-image'>
                                <img src={homeContent.main[1].image} alt={`Image 1`}/>
                            </div>
                        </section>

                        <section className='home-warning'>
                            <div>
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='60' height='60' fill='rgba(24,24,24,1)'><path d='M12.8659 3.00017L22.3922 19.5002C22.6684 19.9785 22.5045 20.5901 22.0262 20.8662C21.8742 20.954 21.7017 21.0002 21.5262 21.0002H2.47363C1.92135 21.0002 1.47363 20.5525 1.47363 20.0002C1.47363 19.8246 1.51984 19.6522 1.60761 19.5002L11.1339 3.00017C11.41 2.52187 12.0216 2.358 12.4999 2.63414C12.6519 2.72191 12.7782 2.84815 12.8659 3.00017ZM4.20568 19.0002H19.7941L11.9999 5.50017L4.20568 19.0002ZM10.9999 16.0002H12.9999V18.0002H10.9999V16.0002ZM10.9999 9.00017H12.9999V14.0002H10.9999V9.00017Z'></path></svg>
                            </div>
                            <p>{homeContent.footer[0].text}</p>
                        </section>

                        <section className='home-reviews'>
                            {homeContent.reviews.map((review, index) => (
                                <div className='review' key={index + 1}>
                                    <img src={review.image} alt={`Image ${index + 1}`}/>
                                    <div className='review-content'>
                                        <p><q>{review.text}</q></p>
                                        <h3>{review.author}</h3>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </>
                ) : null 
            )}
        </div>
    )
}
