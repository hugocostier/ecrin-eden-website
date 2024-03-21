import PropTypes from 'prop-types'
import { useRef } from 'react'
import StyledComponents from 'styled-components'
import { NavButton } from './NavButton'

export const SubMenu = ({ item, activeItem, handleClick }) => {
    const navRef = useRef(null)

    const isSubNavOpen = (item, items) =>
        items.some((i) => i === activeItem) || item === activeItem

    return (
        <StyledSubMenu
            className={`${isSubNavOpen(item.name, item.items) ? 'open' : ''}`}
            style={{ height: !isSubNavOpen(item.name, item.items) ? 0 : navRef.current?.clientHeight }}
        >
            <div ref={navRef}>
                {item?.items.map((subItem, index) => (
                    <NavButton
                        onClick={handleClick}
                        name={subItem.name}
                        icon={subItem.icon}
                        isActive={activeItem === subItem}
                        hasSubNav={!!subItem.items}
                        navigateTo={subItem.to ? subItem.to : null}
                        key={index}
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

const StyledSubMenu = StyledComponents.div`
    overflow: hidden;
    transition: 0.5s;

    button {
        padding-left: 15px;
    }

    @media screen and (max-width: 1023px) { 
        &.open {
            width: 100%;
            overflow: visible; 
            animation: slide-right 0.5s ease-in-out;
        }

        @keyframes slide-right {
            0% {
                transform: translateX(-10%);
                overflow: hidden;
            }
            50% {
                overflow: visible;
            }
            100% {
                transform: translateX(0);
                overflow: visible;
            }
        }

        div {
            display: flex; 
            flex-direction: row; 
        }
    }
`