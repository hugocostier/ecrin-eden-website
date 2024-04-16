import { PropTypes } from 'prop-types';
import { useState } from 'react';

export const UpdateAppointment = ({ appointment, user }) => {
    const [input, setInput] = useState({
        date: appointment.date,
        time: appointment.time,
        is_away: appointment.is_away,
        notes: appointment.notes
    })

    const handleInput = (e) => {
        const { name, value } = e.target

        setInput({
            ...input,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const data = {
            date: formData.get('date'),
            time: formData.get('time'),
            is_away: formData.get('is_away'),
            notes: formData.get('notes')
        }
    }

    const updateAppointment = (data) => {
        return new Promise((resolve, reject) => {
            fetch(`/appointments/${appointment.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error updating appointment')
                    }

                    return response.json()
                })
                .then(updatedAppointment => {
                    resolve(updatedAppointment)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    if (!user.id) return (
        <div>
            <h1>Modifier un rendez-vous</h1>
            <p>Vous devez être connecté pour modifier un rendez-vous</p>
        </div>
    )

    if (!appointment) return (
        <div>
            <h1>Modifier un rendez-vous</h1>
            <p>Le rendez-vous n&apos;existe pas</p>
        </div>
    )

    return (
        <div>
            <h1>Modifier un rendez-vous</h1>
            <form>
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" value={appointment.date} />
                <label htmlFor="time">Heure:</label>
                <input type="time" id="time" name="time" value={appointment.time} />
                <label htmlFor="is_away">Lieu:</label>
                <select id="is_away" name="is_away" value={appointment.is_away}>
                    <option value={true}>A domicile</option>
                    <option value={false}>Au salon de massage</option>
                </select>
                <label htmlFor="notes">Informations partagées:</label>
                <textarea id="notes" name="notes" value={appointment.notes}></textarea>
                <button>Modifier le rendez-vous</button>
                <button>Annuler</button>
            </form>
        </div>
    )
}

UpdateAppointment.propTypes = {
    appointment: PropTypes.object,
    user: PropTypes.object
}