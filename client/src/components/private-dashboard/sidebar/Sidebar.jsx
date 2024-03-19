import PropTypes from 'prop-types'
import { useState } from 'react'
import StyledComponents from 'styled-components'
import { NavButton } from './NavButton'
import { NavHeader } from './NavHeader'
import { SubMenu } from './SubMenu'

const StyledSidebar = StyledComponents.aside`
    display: flex;
    height: 100%;
    background: #1d212a;
    border-right: 1px solid #2e303e;
    transition: width 0.4s;    
    
    @media screen and (max-width: 1023px) {
        overflow-x: auto; 
    }
    
    @media screen and (min-width: 1024px) {
        flex-direction: column;
        width: 260px;
        gap: 8px;
        padding: 0 16px;
    }
`

export const Sidebar = ({ menuItems, user }) => {
    const [activeItem, setActiveItem] = useState('Accueil')

    const handleClick = (item) => {
        setActiveItem((prevActiveItem) => prevActiveItem !== item ? item : '')
    }

    return (
        <StyledSidebar className='user-navbar'>
            <NavHeader user={user} />
            {menuItems.map((item) => (
                <>
                    {!item.items && (
                        <NavButton
                            onClick={handleClick}
                            name={item.name}
                            icon={item.icon}
                            isActive={activeItem === item.name}
                            hasSubNav={!!item.items}
                            navigateTo={item.to ? item.to : null}
                        />
                    )}
                    {item.items && (
                        <>
                            <NavButton
                                onClick={handleClick}
                                name={item.name}
                                icon={item.icon}
                                isActive={activeItem === item.name}
                                hasSubNav={!!item.items}
                                to={item.to ? item.to : null}
                            />
                            <SubMenu
                                activeItem={activeItem}
                                handleClick={handleClick}
                                item={item}
                            />
                        </>
                    )}
                </>
            ))}
        </StyledSidebar>
    )
}

Sidebar.propTypes = {
    menuItems: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
}