import PropTypes from 'prop-types'
import StyledComponent from 'styled-components'

const StyledIcon = StyledComponent.span`
    transition: 0.3s; 

    svg {
        display: block;
        width: 20px;
        height: 20px;
    }
`

export const Icon = ({ icon }) => (
    <StyledIcon>
        {icon}
    </StyledIcon>
)

Icon.propTypes = {
    icon: PropTypes.element.isRequired,
}