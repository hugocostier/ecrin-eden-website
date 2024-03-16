import PropTypes from 'prop-types'
import { useState } from 'react'
import StyledComponents from 'styled-components'
import { NavButton } from './NavButton'
import { NavHeader } from './NavHeader'
import { SubMenu } from './SubMenu'

const StyledSidebar = StyledComponents.aside`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 260px;
    height: 100%;
    padding: 0 16px;
    background: #1d212a;
    border-right: 1px solid #2e303e;
    transition: width 0.4s;    
`

export const Sidebar = ({ menuItems, user }) => {
    const [activeItem, setActiveItem] = useState('')

    const handleClick = (item) => {
        setActiveItem(item !== activeItem ? item : '')
    }

    return (
        <StyledSidebar>
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