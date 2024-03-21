import PropTypes from 'prop-types'
import StyledComponents from 'styled-components'

export const NavHeader = ({ user }) => (
    <StyledNavHeader>
        <div className="profile-picture">
            <img src={user.profilePicture ? user.profilePicture : 'src/assets/images/default-profile-picture.png'} alt='profile' />
        </div>

        <div className='user-info'>
            <h3>{user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : 'John Doe'}</h3>
            <p>{user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}</p>
        </div>
    </StyledNavHeader>
)

NavHeader.propTypes = {
    user: PropTypes.object.isRequired
}

const StyledNavHeader = StyledComponents.header`
    @media screen and (max-width: 1023px) {
        display: none; 
    }

    @media screen and (min-width: 1024px) {
        display: flex;
        flex-direction: column; 
        align-items: center;
        border-bottom: 1px solid #2e303e;
        color: var(--white);
        height: auto; 
        gap: 16px; 

        .profile-picture {
            height: 100px;
            width: 100px;
            overflow: hidden;
            margin-top: 30px;

            img { 
                width: 100%;
                object-fit: cover;    
            }
        }

        .user-info {
            display: flex; 
            flex-direction: column;
            align-items: center;
            gap: 4px;
            margin-bottom: 30px;

            h3 {
                margin: 0;
                font-size: 1.75rem;
                margin-bottom: 8px; 
                text-transform: capitalize;
            }

            p {
                margin: 0;
                font-size: 1.175rem;
            } 
        }
    }
`