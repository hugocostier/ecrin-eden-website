import PropTypes from 'prop-types'
import { useRef } from 'react'
import StyledComponents from 'styled-components'
import { NavButton } from './NavButton'

const StyledSubMenu = StyledComponents.div`
    overflow: hidden;
    transition: 0.5s;

    button {
        padding-left: 15px;
    }
`

export const SubMenu = ({ item, activeItem, handleClick }) => {
    const navRef = useRef(null)

    const isSubNavOpen = (item, items) =>
        items.some((i) => i === activeItem) || item === activeItem

    return (
        <StyledSubMenu
            className={`${isSubNavOpen(item.name, item.items) ? 'open' : ''}`}
            style={{
                height: !isSubNavOpen(item.name, item.items)
                    ? 0
                    : navRef.current?.clientHeight,
            }}
        >
            <div ref={navRef}>
                {item?.items.map((subItem) => (
                    <NavButton
                        onClick={handleClick}
                        name={subItem.name}
                        icon={subItem.icon}
                        isActive={activeItem === subItem}
                        hasSubNav={!!subItem.items}
                        key={subItem.name}
                    />
                ))}
            </div>
        </StyledSubMenu>
    )
}

SubMenu.propTypes = {
    item: PropTypes.object.isRequired,
    activeItem: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
}