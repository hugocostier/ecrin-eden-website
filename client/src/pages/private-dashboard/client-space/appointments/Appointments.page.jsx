import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import { FilterAppointments } from '../../../../components/private-dashboard/appointments/FilterAppointments'
import { fetchAppointments, updateAppointment } from '../../../../data/appointments/appointments.fetch'
import { useClientInfo } from '../../../../hooks/useClientInfo.hook'

export const UserAppointments = () => {
    const client = useClientInfo()
    const [appointments, setAppointments] = useState([])
    const [searchParams, setSearchParams] = useSearchParams({
        filter: 'date',
        show: 'showAll'
    })
    const filter = searchParams.get('filter')
    const show = searchParams.get('show')

    useEffect(() => {
        if (!client.id) return

        toast.promise(fetchAppointments({ clientId: client.id, show }), {
            pending: 'Chargement...',
            success: 'Rendez-vous récupérés !',
            error: 'Erreur lors de la récupération des rendez-vous'
        }, { containerId: 'notification' })
            .then(fetchedAppointments => {
                setAppointments(fetchedAppointments.data)
            })
            .catch(error => {
                console.error('Error fetching events:', error)
            })


        return () => {
            setAppointments([])
        }
    }, [client.id, show])

    const handleCancel = (id) => {
        const confirmCancel = window.confirm('Êtes vous sur de vouloir annuler ce rendez-vous ?')

        if (confirmCancel) {
            toast.promise(updateAppointment(id, { status: 'canceled' }), {
                pending: 'Annulation...',
                success: 'Rendez-vous annulé!',
                error: 'Erreur lors de l\'annulation du rendez- vous'
            }, { containerId: 'notification' })
                .then(() => {
                    fetchAppointments({ clientId: client.id, show })
                        .then(fetchedAppointments => {
                            setAppointments(fetchedAppointments.data)
                        })
                        .catch(error => {
                            console.error('Error fetching events:', error)
                        })
                })
                .catch(error => {
                    console.error('Error canceling appointment:', error)
                })
        }

        return
    }

    return (
        <AppointmentsPage>
            <h2>Mes rendez-vous</h2>

            <ActionSection>
                <Link to={'../../../appointment'} className='btn add-appointment'>Ajouter un rendez-vous</Link>
                <FilterAppointments filter={filter} show={show} setSearchParams={setSearchParams} appointments={appointments} />
            </ActionSection>

            {appointments.length === 0 ? (
                <h3>Aucun rendez-vous trouvé</h3>
            ) : (
                <section className='appointments-list'>
                    <AppointmentsTable>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Heure</th>
                                <th>Status</th>
                                <th>Lieu</th>
                                <th>Prestation</th>
                                <th>Durée</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(appointment => (
                                <tr key={appointment.id} >
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time.slice(0, 5)}</td>
                                    <td>{appointment.status}</td>
                                    <td>{appointment.is_away ? 'A domicile' : 'Au salon'}</td>
                                    <td>{appointment.service.name}</td>
                                    <td>{appointment.service.duration}</td>
                                    <td className='table-action'>
                                        <Link to={`update/${appointment.id}`} state={{ disable: false }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path></svg>
                                        </Link>
                                        <Link
                                            onClick={() => handleCancel(appointment.id)}
                                            style={
                                                appointment.status === 'canceled' ? { pointerEvents: 'none', cursor: 'default', opacity: '0.5' } : null
                                            }
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </AppointmentsTable>
                </section>
            )
            }
        </AppointmentsPage >
    )
}

const AppointmentsPage = StyledComponents.main`
    .btn {
        &.add-client {
            padding: 10px 20px;
            border-radius: 10px;
            text-transform: none;  
        }
    }

    .appointments-list {
        overflow-x: auto;
    }

    @media screen and (max-width: 768px) {
        h2 { 
            text-align: center; 
        }
    }
`

const ActionSection = StyledComponents.section`
    display: grid;
    grid-template-columns: 1fr; 
    align-items: center;

    a {
        text-align: center;
        margin-bottom: 1rem;
        justify-self: center;
    }

    .show-container {
        margin-bottom: 0; 
    }

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);

        a {
            justify-self: start;
            margin-bottom: 0;
        }

        .filters {
            grid-column: 1 / 3; 
            grid-row: 2 / 3;
            margin-top: 1rem; 
        }

        .search-bar {
            grid-column: 2 / 3; 
            grid-row: 1 / 2;
            justify-self: end;
        }
    }

    @media screen and (min-width: 1240px) {
        grid-template-columns: repeat(3, 1fr);
        column-gap: 1rem;

        a {
            justify-self: start;
            margin-bottom: 0;
        }

        .filters {
            grid-column: 1 / 3; 
            grid-row: 2 / 3;
            margin-top: 1rem; 
        }

        .search-bar {
            grid-column: 3 / 4; 
            grid-row: 2 / 3;
        }
    }
`

const AppointmentsTable = StyledComponents.table`
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px; 
    margin-top: 20px;

    thead {
        background-color: #f4f4f4;
    }
    
    tbody {
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:nth-child(odd) {
            background-color: #ffffff;
        }
    }

    tr {
        th, td {
            padding: 10px;
            text-align: left;
            vertical-align: middle; 
        }
    
        td {
            text-transform: capitalize;

            a {
                text-decoration: none;
                color: inherit;
        
                &:hover:not(.table-action) {
                    text-decoration: underline;
                }
            }

            &.table-action {        
                a {
                    display: inline-block;
                    width: 1.5rem;
                    height: 1.5rem;

                    &:not(:last-child) {
                        margin-right: 10px;
                    }
        
                    svg {
                        width: 100%;
                        height: 100%;
                        fill: currentColor;
                    }
        
                    &:hover {
                        opacity: 0.6;
                    }
                }
            }   
        }
    }

    @media screen and (max-width: 768px) {
        th, td {
            &:nth-child(1), 
            &:nth-child(2) {
                min-width: 100px;
            }

            &:nth-child(4) {
                min-width: 250px;
            }

            &:nth-child(3),
            &:nth-child(5) {
                min-width: 120px;
            }
        }
    }

    @media screen and (min-width: 768px) {
        th, td {
            &:nth-child(1), 
            &:nth-child(2) {
                width: 15%;
            }

            &:nth-child(3) {
                width: 20%;
            }

            &:nth-child(5) {
                width: 120px;
            }
        }
    } 
`