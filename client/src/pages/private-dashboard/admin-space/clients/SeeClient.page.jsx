import { Fragment, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import { FilterAppointments } from '../../../../components/private-dashboard/appointments/FilterAppointments'
import { fetchAppointments } from '../../../../data'
import { fetchClient } from '../../../../data/admin/clients.fetch'
import { filterAppointments } from '../../../../utils/filterAppointments.util'

export const SeeClient = () => {
    const { id: clientId } = useParams()
    const [client, setClient] = useState({})
    const [appointments, setAppointments] = useState([])

    const [searchParams, setSearchParams] = useSearchParams({
        filter: 'date',
        show: 'showAll'
    })

    const filter = searchParams.get('filter')
    const show = searchParams.get('show')

    useEffect(() => {
        fetchClient(clientId)
            .then(fetchedClient => {
                setClient(fetchedClient)
            })
            .catch(error => {
                console.error('Error fetching client:', error)
            })

        toast.promise(fetchAppointments({ clientId, show }), {
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
            setClient({})
            setAppointments([])
        }
    }, [clientId, show])

    return (
        <main>
            <PageHeader>
                <h2>Historique client</h2>
                <h3>{client.first_name} {client.last_name}</h3>
            </PageHeader>

            <FilterAppointments filter={filter} show={show} setSearchParams={setSearchParams} appointments={appointments} />

            {appointments.length === 0 ? (
                <>
                    <p>Aucun rendez-vous pour ce client</p>
                </>
            ) : (filterAppointments(filter, show, appointments) &&
                <ClientHistory>
                    <div>
                        <p>Nombre de rendez-vous: {appointments.length}</p>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Heure</th>
                                <th>Status</th>
                                <th>Lieu</th>
                                <th>Prestation</th>
                                <th>Durée</th>
                                <th>Commentaire praticien</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment, index) => (
                                <Fragment key={index}>
                                    <tr key={appointment.id}>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.time.slice(0, 5)}</td>
                                        <td>{appointment.status}</td>
                                        <td>{appointment.is_away ? 'A domicile' : 'Au salon'}</td>
                                        <td>{appointment.service.name}</td>
                                        <td>{appointment.service.duration}</td>
                                        <td className='comment'>{appointment.privateNotes}</td>
                                    </tr>
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </ClientHistory>
            )}
        </main>
    )
}

const PageHeader = StyledComponents.section`
    margin-bottom: 30px;    

    h2, h3 {
        margin: 0;
        margin-bottom: 10px; 
        text-align: center;
        text-transform: capitalize; 
    }
`

const ClientHistory = StyledComponents.section`
    overflow-x: auto;

    table {
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
            th, td:not(.comment) {
                white-space: nowrap;
                text-transform: capitalize;
            }

            th, td {
                padding: 10px;
                text-align: left;
                vertical-align: middle; 
            }

            td {
                &.comment {
                    white-space: pre-wrap;
                }
            }
        }
    }

    @media screen and (max-width: 1023px) {
        table {
            td {
                &.comment {
                    min-width: 95vw; 
                }
            }
        }
    }

    @media screen and (min-width: 1024px) {
        td {
            &.comment {
                max-width: 30vw; 
            }
        }
    } 
`