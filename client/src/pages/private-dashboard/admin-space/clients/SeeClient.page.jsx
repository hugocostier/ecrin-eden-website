import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchAppointments } from '../../../../data'
import { fetchClient } from '../../../../data/admin/clients.fetch'

export const SeeClient = () => {
    const { id: clientId } = useParams()
    const [client, setClient] = useState({})
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        fetchClient(clientId)
            .then(fetchedClient => {
                setClient(fetchedClient)
            })
            .catch(error => {
                console.error('Error fetching client:', error)
            })

        toast.promise(fetchAppointments({ clientId, showAll: true }), {
            pending: 'Chargement...',
            success: 'Rendez-vous récupérés !',
            error: 'Erreur lors de la récupération des rendez-vous'
        }, { containerId: 'notification' })
            .then(fetchedAppointments => {
                setAppointments(fetchedAppointments.data)

                console.log('Appointments fetched:', fetchedAppointments.data)
            })
            .catch(error => {
                console.error('Error fetching events:', error)
            })

        return () => {
            setClient({})
            setAppointments([])
        }
    }, [clientId])

    return (
        <main>
            <h2>Historique client</h2>
            <h3>{client.first_name} {client.last_name}</h3>

            {appointments.length === 0 ? (
                <>
                    <p>Aucun rendez-vous pour ce client</p>
                </>
            ) : (
                <section className='clients-list'>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Heure</th>
                                <th>Status</th>
                                <th>Lieu</th>
                                <th>Prestation</th>
                                <th>Durée</th>
                                <th>Commentaire client</th>
                                <th>Commentaire praticien</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment, index) => (
                                <Fragment key={index}>
                                    <tr key={appointment.id}>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.time}</td>
                                        <td>{appointment.status}</td>
                                        <td>{appointment.is_away ? 'A domicile' : 'Au salon'}</td>
                                        <td>{appointment.service.name}</td>
                                        <td>{appointment.service.duration}</td>
                                        <td>{appointment.clientNotes}</td>
                                        <td>{appointment.privateNotes}</td>
                                    </tr>
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}
        </main>
    )
}