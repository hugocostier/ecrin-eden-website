import StyledComponents from 'styled-components'

export const Week = () => {
    return (
        <StyledWeek>
            <tr>
                <th>Lun</th>
                <th>Mar</th>
                <th>Mer</th>
                <th>Jeu</th>
                <th>Ven</th>
                <th>Sam</th>
                <th>Dim</th>
            </tr>
        </StyledWeek>
    )
}

const StyledWeek = StyledComponents.thead`
    th {
        width: calc(100% / 7); 
    }
`