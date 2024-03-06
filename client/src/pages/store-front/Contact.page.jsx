import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import '../../assets/css/store-front/Contact.page.css'
import { Loading } from '../../components/Loading'
import { PageTitle } from '../../components/PageTitle'
import { useLoader } from '../../hooks/useLoader.hook'

export const ContactPage = () => {
    const { contactContent } = useLoaderData()
    const loading = useLoader(contactContent)

    const removeDot = (string) => {
        return string.replace(/\./g, '')
    }

    const checkInput = (input) => {
        if (input.value === '') {
            input.classList.add('incorrect')
        } else {
            input.classList.remove('incorrect')
        }
    }

    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const sendContactForm = async (e) => {
        e.preventDefault()

        const form = {
            lastName,
            firstName,
            phone,
            email,
            message
        }

        const res = await fetch('http://localhost:3000/api/v1/form/send-contact-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        if (res.status === 200) {
            alert('Votre message a bien été envoyé')
        } else {
            alert('Une erreur est survenue, veuillez réessayer plus tard')
        }

        console.log(res)
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                contactContent ? (
                    <>
                        <PageTitle content={contactContent} pageName='contact'></PageTitle>

                        <section className="contact-main">
                            <section className="contact-info">
                                <div className="schedule">
                                    <h4>Horaires</h4>
                                    <p>
                                        Mercredi - Vendredi : 17h - 19h<br />
                                        Samedi : 10h - 19h
                                    </p>
                                </div>

                                <div className="address">
                                    <h4>Adresse</h4>
                                    <p>
                                        {contactContent.header[0].address}<br />
                                        {contactContent.header[0].zip}, {contactContent.header[0].city}<br />
                                        <a href={`tel:${removeDot(contactContent.header[0].phone)}`}>{contactContent.header[0].phone}</a><br />
                                        <a href={`mailto:${contactContent.header[0].email}`}>{contactContent.header[0].email}</a><br />
                                    </p>
                                </div>
                            </section>

                            <section className="contact-form">
                                <div className="title">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298.185 352.082" width="50" height="50"><g><path d="M298.185 264.061l-149.093 88.021L0 264.061V88.021L149.092 0l149.093 88.021v176.04z"></path></g></svg>
                                    <h3>Salon Écrin d&apos;Eden</h3>
                                </div>

                                <form action=''>
                                    <legend>Écrivez-nous</legend>
                                    <input
                                        type="text"
                                        name="last-name"
                                        placeholder='Nom*'
                                        required
                                        onChange={(e) => setLastName(e.target.value)}
                                        onBlur={(e) => checkInput(e.target)}
                                    />

                                    <input
                                        type="text"
                                        name="first-name"
                                        placeholder='Prénom*'
                                        required
                                        onChange={(e) => setFirstName(e.target.value)}
                                        onBlur={(e) => checkInput(e.target)}
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder='Email*'
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={(e) => checkInput(e.target)}
                                    />

                                    <input
                                        type="tel"
                                        name="phone"
                                        pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
                                        maxLength="10"
                                        placeholder='Téléphone'
                                        onChange={(e) => setPhone(e.target.value)}
                                    />

                                    <textarea
                                        name="message"
                                        placeholder='Écrivez votre message ici...'
                                        required
                                        onChange={(e) => setMessage(e.target.value)}
                                        onBlur={(e) => checkInput(e.target)}
                                    ></textarea>

                                    <input
                                        type="submit"
                                        value="Envoyer"
                                        className="contact-submit"
                                        onClick={sendContactForm}
                                    />
                                </form>
                            </section>

                            <section className="google-maps">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d701.1594698066873!2d4.1745485248625185!3d44.22432565040747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b45bbebd052277%3A0xa1a154f9f13ed3b1!2s302%20Rte%20des%20Tronquisses%2C%2030960%20Les%20Mages!5e0!3m2!1sen!2sfr!4v1708537846604!5m2!1sen!2sfr" width="600" height="450" style={{ border: "0" }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </section>
                        </section>
                    </>
                ) : null
            )}
        </>
    )
}
