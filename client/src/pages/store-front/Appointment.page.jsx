import PropTypes from 'prop-types'
import StyledComponents from 'styled-components'
import bgSidebarMobile from '../../assets/images/appointment-reservation/bg-sidebar-mobile.svg'
import { PageTitle } from '../../components'
import { Provider } from '../../components/appointment-reservation/Provider'
import { Sidebar } from '../../components/appointment-reservation/Sidebar'

const appointmentContent = {
    header: [
        {
            title: 'Prendre rendez-vous',
            images: [
                "/src/assets/images/services/hero1.jpeg",
                "/src/assets/images/services/hero2.jpeg"
            ]
        }
    ]
}

export const AppointmentPage = ({ children }) => {
    return (
        <>
            <PageTitle content={appointmentContent} pageName='appointment'></PageTitle>

            <SectionContainer>
                <ReservationContainer>
                    <SidebarBackground />
                    <Sidebar />
                    <Provider>{children}</Provider>
                </ReservationContainer>
            </SectionContainer>
        </>
    )
}

AppointmentPage.propTypes = {
    children: PropTypes.node.isRequired
}

const SidebarBackground = StyledComponents.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 172px;
    background-image: url(${bgSidebarMobile});
    background-size: cover;
    background-position: center;

    @media screen and (min-width: 1024px) {
        background-image: none; 
        display: none;
    }
`

const SectionContainer = StyledComponents.section`
    position: relative; 
    width: 100%; 
    user-select: none;
    
    @media screen and (min-width: 1024px) {
        margin: 1rem auto;
        max-width: 1000px; 
    }
`

const ReservationContainer = StyledComponents.section`
    display: flex; 
    flex-direction: column; 
    width: 100%; 
    padding: 0 1rem; 
    border-radius: 1rem;

    @media screen and (min-width: 1024px) {
        background-color: hsl(0 0% 100% / 1); 
        flex-direction: row; 
        padding: 1rem; 
        box-shadow: 0 0 rgba(0, 0, 0, 0), 0 0 rgba(0, 0, 0, 0), 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -4px rgba(0, 0, 0, .1);
    }
`