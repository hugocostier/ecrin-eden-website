import { Link, useNavigate } from 'react-router-dom';
import StyledComponents from 'styled-components';
import defaultPicture from '../../assets/images/default-profile-picture.png';
import logo from '../../assets/images/logo-white.png';
import { useAuth } from '../../hooks/useAuth.hook';
import { useClientInfo } from '../../hooks/useClientInfo.hook';
import { SERVER_URL } from '../../utils/serverUrl.util';

export const Header = () => {
    const auth = useAuth()
    const client = useClientInfo()
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/')
        auth.logOut()
    }

    return (
        <StyledHeader className='user-header'>
            <div className='logo-container'>
                <Link to={'/'} key={'logo-accueil'} className='logo-nav'>
                    <img src={logo} alt='logo' />
                </Link>
            </div>

            <div className='title-container'>
                <h2>Espace personnel</h2>
            </div>

            <div className='user-container'>
                <div className='user'>
                    <img id='user-picture' src={client.profilePicture ? `${SERVER_URL}/${client.profilePicture}` : defaultPicture} alt='profile' />
                    <p>{client.firstName && client.lastName ? client.firstName + ' ' + client.lastName : 'John Doe'}</p>
                    <button
                        onClick={() => handleLogout()}
                        className='logout'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path></svg>
                    </button>
                </div>
            </div>
        </StyledHeader>
    )
}

const StyledHeader = StyledComponents.header`
    display: grid;
    grid-template-columns: auto 1fr; 
    justify-content: center;
    align-items: center;
    height: 60px;
    background: #2e303e;
    color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;

    .logo-container {
        grid-column: 1 / 2;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5vw;

        .logo-nav {
            height: 100%;
            width: 100%;

            img {
                height: 100%;
                width: auto;
                object-fit: cover;
            }
        }
    }

    .user-container {
        grid-column: 3 / 4;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5vw;

        .user {
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;

            #user-picture {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 10px;
            }

            p {
                margin: 0;
                text-transform: capitalize;
            }

            .logout {
                width: 26px;
                height: 26px;
                margin-left: 16px; 
                color: var(--red-light);
                cursor: pointer;
                background: transparent;
                border: none;
    
                &:hover {
                    color: var(--red-dark);
                }
            }
        }
    }

    @media screen and (max-width: 639px) {
        .title-container {
            display: none;
        }
    }

    @media screen and (min-width: 640px) {
        grid-template-columns: auto 1fr auto;

        .logo-container {
            margin-left: 32px; 
        }

        .title-container {
            display: flex;
            grid-column: 2 / 3;
            justify-content: center;
            align-items: center;
            
            h2 {
                font-size: 2.25rem;
                margin: 0;
                line-height: 1;
            }
        }

        .user-container {
            margin-right: 32px;
        }
    }

    @media screen and (min-width: 1024px) {

    }
`