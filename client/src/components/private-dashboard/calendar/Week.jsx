import PropTypes from 'prop-types'
import StyledComponents from 'styled-components'

const StyledWeek = StyledComponents.thead`
    th {
        width: calc(100% / 7); 
    }
`

export const Week = ({ days }) => {
    return (
        <StyledWeek>
            <tr>
                <th>Lun {days ? days[0] : null}</th>
                <th>Mar {days ? days[1] : null}</th>
                <th>Mer {days ? days[2] : null}</th>
                <th>Jeu {days ? days[3] : null}</th>
                <th>Ven {days ? days[4] : null}</th>
                <th>Sam {days ? days[5] : null}</th>
                <th>Dim {days ? days[6] : null}</th>
            </tr>
        </StyledWeek>
    )
}

Week.propTypes = {
    days: PropTypes.array
}