import PropTypes from 'prop-types'
import { Fragment, useState } from 'react'
import StyledComponents from 'styled-components'
import { NavButton } from './NavButton'
import { NavHeader } from './NavHeader'
import { SubMenu } from './SubMenu'

export const Sidebar = ({ menuItems }) => {
    const [activeItem, setActiveItem] = useState('')

    const handleClick = (item) => {
        setActiveItem((prevActiveItem) => prevActiveItem !== item ? item : '')
    }

    return (
        <StyledSidebar className='user-navbar'>
            <NavHeader />
            {menuItems.map((item, index) => (
                <Fragment key={index}>
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
                </Fragment>
            ))}
        </StyledSidebar>
    )
}

Sidebar.propTypes = {
    menuItems: PropTypes.array.isRequired
}

const StyledSidebar = StyledComponents.aside`
    display: flex;
    height: 100%;
    background: var(--primary-500); 
    border-right: 1px solid bar(--primary-900);
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