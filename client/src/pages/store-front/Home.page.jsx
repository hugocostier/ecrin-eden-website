import { useLoaderData } from 'react-router-dom'
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
                        {homeContent.header && homeContent.header.map((header, index) => (
                            <div className='home-title' key={index + 1}>
                                <h1>{header.title}</h1>
                                <h2>{header.subtitle}</h2>
                                <img src={header.image} alt={`Home ${index + 1}`}/>
                            </div>
                        ))}

                        <div className='home-main'>
                            {homeContent.main.map((main, index) => (
                                <div className='card' key={index + 1}>
                                    <h3>{main.title}</h3>
                                    <p>{main.text}</p>
                                    <img src={main.image} alt={`Card ${index + 1}`}/>
                                </div>
                            ))}
                        </div>

                        {homeContent.video.map((video, index) => (
                            <div className='home-video' key={index + 1}>
                                <video controls>
                                    <source src={video.video} type='video/mp4'/>
                                </video>
                            </div>
                        ))}

                        {homeContent.footer.map((footer, index) => (
                            <div className='home-footer' key={index + 1}>
                                <p>{footer.text}</p>
                            </div>
                        ))}
                    </>
                ) : null 
            )}
        </div>
    )
}
