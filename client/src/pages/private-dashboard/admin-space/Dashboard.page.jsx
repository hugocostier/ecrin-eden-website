import { useEffect, useState } from 'react'
import StyledComponents from 'styled-components'
import image from '../../../assets/images/dashboard.jpg'
import { Calendar } from '../../../components/private-dashboard/calendar/Calendar'
import { countAllAppointments } from '../../../data/appointments/appointments.fetch'
import { useClientInfo } from '../../../hooks/useClientInfo.hook'
import { capitalize } from '../../../utils/capitalize.util'
import { formatDate } from '../../../utils/formatDate'

export const AdminDashboard = () => {
    const client = useClientInfo()
    const [count, setCount] = useState(null)

    useEffect(() => {
        if (client.id) {
            countAllAppointments(formatDate(new Date().toLocaleDateString('fr-FR')))
                .then(count => {
                    setCount(count.data)
                })
                .catch(error => {
                    console.error('Error fetching data:', error)
                })
        }

        return () => {
            setCount(null)
        }
    }, [client.id]) // Fetch data whenever client.id changes

    return (
        <StyledDashboard>
            <section className='page-header'>
                <h2>Bonjour {capitalize(client.firstName)},</h2>
                {count !== null && count > 0 ? (
                    <p>Tu as {count} rendez-vous aujourd&apos;hui.</p>
                ) : (count !== null && count === 0) ? (
                    <p>Tu n&apos;as pas de rendez-vous aujourd&apos;hui.</p>
                ) : (
                    <p>Loading...</p>
                )}
            </section>

            <Calendar />

            <aside>
                <img src={image} alt='dashboard' />
            </aside>
        </StyledDashboard>
    )
}

const StyledDashboard = StyledComponents.main`
    display: grid; 
    grid-template-columns: 1fr; 
    gap: 20px;   
    overflow-y: auto;

    .page-header {
        grid-column: 1 / 2; 
    }

    .calendar-container {
        grid-column: 1 / 2;
        grid-row: 2 / 3; 
    }

    @media screen and (max-width: 1023px) {
        aside {
            display: none; 
        }
    }

    @media screen and (min-width: 1024px) {
        grid-template-columns: 3fr 1fr; 
        grid-template-rows: 150px max-content;

        .page-header {
            grid-column: 1 / 3; 
        }
    
        .calendar-container {
            grid-column: 1 / 2;
            grid-row: 2 / 3; 
        }

        aside {
            grid-column: 2 / 3;
            grid-row: 2 / 3; 
    
            img {
                width: 100%; 
                height: 100%;
                object-fit: cover; 
                object-position: 70% 30%; 
                border-radius: 10px;
            }
        }
    }
`