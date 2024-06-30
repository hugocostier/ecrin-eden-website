import { useLocation } from 'react-router-dom'
import StyledComponents from 'styled-components'
import bgSidebarDesktop from '../../assets/images/appointment-reservation/bg-sidebar-desktop.svg'
import { Step } from './Step'

export const Sidebar = () => {
    const location = useLocation()
    const segment = location.pathname.split('/')[2]

    const steps = [
        {
            id: 1,
            title: 'Prestations',
            segment: 'service',
        },
        {
            id: 2,
            title: 'Date',
            segment: 'date',
        },
        {
            id: 3,
            title: 'Heure',
            segment: 'time',
        },
        {
            id: 4,
            title: 'Vos infos',
            segment: 'info',
        },
        {
            id: 5,
            title: 'Confirmation',
            segment: 'confirm',
        }
    ]

    const Steps = steps.map(step => (
        <Step
            key={step.id}
            step={step}
            segment={segment}
        />
    ))

    return (
        <SidebarContainer>
            <StepsContainer>
                {Steps}
            </StepsContainer>
            <img src={bgSidebarDesktop} alt='' className='desktop-sidebar-image' />
        </SidebarContainer>
    )
}

const SidebarContainer = StyledComponents.section`
    position: relative;
    flex-shrink: 0;

    img {
        max-width: 100%;
        height: auto;
        vertical-align: middle;
        color: transparent; 

        &.desktop-sidebar-image {
            display: none; 
            z-index: -10; 
        }
    }

    @media screen and (min-width: 1024px) {
        img {
            &.desktop-sidebar-image {
                display: block; 
            }
        }
    }
`

const StepsContainer = StyledComponents.div`
    display: flex; 
    flex-direction: row; 
    justify-content: center;
    padding: 2rem 0;
    gap: 1rem;

    @media screen and (min-width: 1024px) {
        position: absolute; 
        justify-content: stretch;
        flex-direction: column;
        gap: 1.5rem; 
        padding: 2.5rem 2rem;
        inset: 0; 
    }
`