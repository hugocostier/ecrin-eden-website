import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchAppointments } from '../../../../data'
import { useClientInfo } from '../../../../hooks/useClientInfo.hook'

export const MyAppointments = () => {
    const client = useClientInfo()
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        if (!client.id) return

        toast.promise(fetchAppointments({ clientId: client.id }), {
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
            setAppointments([])
        }
    }, [client.id])

    return (
        <main>
            {appointments.length === 0 ? (
                <>
                    <h2>Vous n&apos;avez pas de rendez-vous à venir</h2>
                    <button>Prendre un rendez-vous</button>
                </>
            ) : (
                <section>
                    <h2>Vos 10 prochains rendez-vous</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Heure</th>
                                <th>Status</th>
                                <th>Lieu</th>
                                <th>Informations partagées</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment, index) => (
                                <Fragment key={index}>
                                    <tr key={appointment.id}>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.time}</td>
                                        <td>{appointment.status}</td>
                                        <td>{appointment.is_away ? 'A domicile' : 'Au salon de massage'}</td>
                                        <td>{appointment.notes}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <Link>Modifier le rendez-vous</Link>
                                        </td>
                                        <td colSpan={2}>
                                            <Link>Annuler le rendez-vous</Link>
                                        </td>
                                    </tr >
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}
        </main>
    )
}