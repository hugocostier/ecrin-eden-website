import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StyledComponents from 'styled-components';
import logo from '../../assets/images/logo.jpg';

const StyledHeader = StyledComponents.header`
    display: grid;
    grid-template-columns: auto 1fr auto;
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
        margin-left: 32px;

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

    .title-container {
        grid-column: 2 / 3;
        display: flex;
        justify-content: center;
        align-items: center;
        
        h2 {
            font-size: 2.25rem;
            margin: 0;
            line-height: 1;
        }
    }

    .user-container {
        grid-column: 3 / 4;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .user {
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 32px;

            p {
                margin: 0;
                text-transform: capitalize;
            }
        }
    }
`

export const Header = ({ user }) => {
    return (
        <StyledHeader>
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
                    <img id='user-picture' src={user.profilePicture ? user.profilePicture : 'src/assets/images/default-profile-picture.png'} alt='profile' />
                    <p>{user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : 'John Doe'}</p>
                </div>
            </div>
        </StyledHeader>
    )
}

Header.propTypes = {
    user: PropTypes.object.isRequired
}