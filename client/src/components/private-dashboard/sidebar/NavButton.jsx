import PropTypes from 'prop-types'
import { NavLink, useNavigate } from 'react-router-dom'
import StyledComponents from 'styled-components'
import { useAuth } from '../../../hooks/useAuth.hook'
import { Icon } from './Icon'

export const NavButton = ({ onClick, name, icon, isActive, hasSubNav, navigateTo }) => {
    const auth = useAuth()
    const navigate = useNavigate()

    if (hasSubNav) {
        return (
            <StyledNavButton
                type='button'
                onClick={() => onClick(name)}
                className={isActive ? 'active' : ''}
            >
                {icon && <Icon icon={icon} />}
                <span>{name}</span>
                <Icon icon={<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z'></path></svg>} />
            </StyledNavButton>
        )
    }

    if (name === 'Déconnexion') {
        return (
            <StyledNavButton
                type='button'
                onClick={() => {
                    navigate('/')
                    auth.logOut()
                }}
                className={isActive ? 'active logout-nav' : 'logout-nav'}
            >
                {icon && <Icon icon={icon} />}
                <span className='title'>{name}</span>
            </StyledNavButton>
        )
    }

    return (
        <StyledNavLink
            to={navigateTo}

            {...(navigateTo === '/user' ? { end: true } : {})}
            {...(navigateTo === '/admin' ? { end: true } : {})}

            onClick={() => onClick(name)}
            className={isActive ? 'active' : ''}
        >
            {icon && <Icon icon={icon} />}
            <span>{name}</span>
            {hasSubNav && <Icon icon={<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z'></path></svg>} />}
        </StyledNavLink>
    )
}

NavButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.element,
    isActive: PropTypes.bool.isRequired,
    hasSubNav: PropTypes.bool,
    navigateTo: PropTypes.string
}

const StyledNavLink = StyledComponents(NavLink)`
    position: relative;
    display: flex;
    background: transparent;
    gap: 16px;
    align-items: center;
    height: 50px;
    width: 100%;
    border: 0;
    border-radius: 6px;
    text-align: left;
    line-height: 1;
    padding: 0 16px;
    color: var(--white);
    cursor: pointer;
    transition: background 0.3s;

    &:is(.active, :hover) {
        background: var(--secondary-300);
        color: var(--white);
    }

    &:not(.active):hover {
        background: var(--secondary-500);
    }

    span {
        transition: 0.3s;

        &:nth-child(2) {
            flex: 1 1 auto;
            white-space: nowrap;
        }
    }

    @media screen and (max-width: 1023px) {
        padding-right: 32px; 

        &:first-of-type {
            margin-left: 16px; 
        }

        span:nth-child(2) {
            white-space: nowrap;
        }
    } 
`

const StyledNavButton = StyledComponents.button`
    position: relative;
    display: flex;
    background: transparent;
    gap: 16px;
    align-items: center;
    height: 50px;
    width: 100%;
    border: 0;
    border-radius: 6px;
    text-align: left;
    line-height: 1;
    padding: 0 16px;
    color: var(--white);
    cursor: pointer;
    transition: background 0.3s;
    font-size: var(--body-font);

    &:is(.active, :hover) {
        background: var(--secondary-300);
        color: var(--white);
    }

    &.active > span:nth-child(3) {
        rotate: -180deg;
    }

    &:not(.active):hover {
        background: var(--secondary-500);
    }

    span {
        transition: 0.3s;
        
        &:nth-child(2) {
            flex: 1 1 auto;
        }
    }

    &.logout-nav:hover {
        span:not(.title) {
            color: var(--red-dark);
        }
    }

    @media screen and (max-width: 1023px) {
        &.logout-nav {
            padding-right: 32px; 
        }

        span:nth-child(3) {
            rotate: 90deg;
        }

        &.active > span:nth-child(3) {
            rotate: -90deg;
        }

        span:nth-child(2) {
            white-space: nowrap;
        }
    } 
`