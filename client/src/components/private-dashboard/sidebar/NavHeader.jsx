import StyledComponents from 'styled-components';
import defaultPicture from "../../../assets/images/default-profile-picture.png";
import { useAuth } from '../../../hooks/useAuth.hook';
import { useClientInfo } from '../../../hooks/useClientInfo.hook';

export const NavHeader = () => {
    const auth = useAuth()
    const client = useClientInfo()

    return (
        <StyledNavHeader>
            <div className="profile-picture">
                <img src={client.profilePicture ? `${import.meta.env.VITE_APP_SERVER_URL}/${client.profilePicture}` : defaultPicture} alt='profile' />
            </div>

            <div className='user-info'>
                <h3>{client.firstName && client.lastName ? client.firstName + ' ' + client.lastName : 'John Doe'}</h3>
                <p>{auth.user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}</p>
            </div>
        </StyledNavHeader>
    )
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
            border-radius: 50%;
            margin-top: 30px;

            img { 
                max-width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: 50% 50%;   
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