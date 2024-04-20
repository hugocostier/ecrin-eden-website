import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAppointment } from '../../../../data/appointments/appointments.fetch'

export const SeeAppointment = () => {
    const { id: appointmentID } = useParams()
    const [appointment, setAppointment] = useState([])

    useEffect(() => {
        fetchAppointment(appointmentID)
            .then(fetchedAppointment => {
                setAppointment(fetchedAppointment.data)
            })
            .catch(error => {
                console.error('Error fetching appointment:', error)
            })

        return () => {
            setAppointment([])
        }
    }, [appointmentID])

    return (
        <main>
            {appointment.length !== 0 && (
                <>
                    <h2>Détails du rendez-vous</h2>

                    <section>
                        <h3>Informations du rendez-vous</h3>
                        <p>Date: {appointment.date}</p>
                        <p>Heure: {appointment.time.slice(0, 5)}</p>
                        <p>Statut: {appointment.status}</p>
                        <p>Lieu: {appointment.is_away ? `${appointment.client.address}, ${appointment.client.city} ${appointment.client.postal_code}` : 'Au salon'}</p>
                        <p>Notes: {appointment.private_notes}</p>


                        <h3>Informations du client</h3>
                        <p>Prénom: {appointment.client.first_name}</p>
                        <p>Nom: {appointment.client.last_name}</p>
                        <p>Téléphone: <a href={`tel:${appointment.client.phone}`}>{appointment.client.phone}</a></p>

                        <h3>Informations du service</h3>
                        <p>Nom: {appointment.service.name}</p>
                        <p>Prix: {appointment.service.price} €</p>
                        <p>Durée: {appointment.service.duration} minutes</p>
                    </section>
                </>
            )}
        </main>
    )
}