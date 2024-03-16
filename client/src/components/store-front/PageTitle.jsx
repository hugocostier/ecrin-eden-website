import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const slideRight= keyframes`
    0% {
        opacity: 0; 
        transform: translateX(-100%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
`

const slideLeft= keyframes`
    0% {
        opacity: 0; 
        transform: translateX(100%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
`

const PageTitleSection = styled.section`
    display: grid; 
    grid-template-columns: 1fr; 
    background-color: var(--secondary-500);
    color: var(--white); 
    text-align: center; 
    align-items: center;
    padding: 40px 0;
    
    h2 {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        margin: 0 8% 30px 8%; 
    }

    .image {
        grid-column: 1 / 2; 
        grid-row: 2 / 3;
        margin: 0 8%; 
        
        img {
            width: 100%;
            object-fit: cover; 
            object-position: 50% 50%; 
        }

        &:first-of-type {
            width: 64%; 
            animation: ${slideRight} 1.5s ease;
        }

        &:last-of-type {
            width: 50%; 
            justify-self: end; 
            animation: ${slideLeft} 1.5s ease; 
        }
    }

    @media screen and (min-width: 640px) {
        .image {            
            &:first-of-type {
                width: 43%; 
                justify-self: center; 
                margin-right: 20%; 
            }
    
            &:last-of-type {
                width: 26%; 
                justify-self: center; 
                margin-left: 40%;
            }
        }
    }

    @media screen and (min-width: 1024px) {
        grid-template-rows: 1fr; 
        padding: 40px 0; 

        h2 {
            margin: 0; 
            z-index: 1;
            translate: -10vw 0; 
        }
    
        .image {
            display: grid; 
            grid-row: 1 / 2;
    
            &:first-of-type {
                width: 30%; 
            }
    
            &:last-of-type {
                width: 20%; 
            }
        }
    }
`


export const PageTitle = ({ content, pageName }) => {
    return (
        <>
            <PageTitleSection className={`${pageName}-title`}>
                <h2>{content.header[0].title}</h2>
                {content.header[0].images.map((images, index) => (
                    <div className="image" key={index} >
                        <img src={images} alt={`${pageName} ${index + 1}`}/>
                    </div>
                ))}
            </PageTitleSection>
        </>
    )
}

PageTitle.propTypes = {
    content: PropTypes.object.isRequired,
    pageName: PropTypes.string.isRequired
};
