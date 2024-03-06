import { library } from '@fortawesome/fontawesome-svg-core';
import { faApple, faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

library.add(faFacebookF, faGoogle, faApple)

export const RegisterForm = () => {
    const auth = useAuth()

    const [input, setInput] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })

    const handleRegister = (e) => {
        e.preventDefault()

        if (input.email !== '' && input.password !== '' && input.first_name !== '' && input.last_name !== '') {
            auth.register(input)
            return
        }

        alert('Merci de saisir votre nom, prénom, email et mot de passe')
    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const checkInput = (input) => {
        if (input.value === '') {
            input.classList.add('incorrect')
        } else {
            input.classList.remove('incorrect')
        }
    }

    return (
        <section className="form-container register-container">
            <form onSubmit={handleRegister}>
                <h2>Inscription</h2>
                <div className="social-container">
                    <a href="" className="social">
                        <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                    </a>
                    <a href="" className="social">
                        <FontAwesomeIcon icon='fa-brands fa-google' />
                    </a>
                    <a href="" className="social">
                        <FontAwesomeIcon icon='fa-brands fa-apple' />
                    </a>
                </div>
                <span>ou utilise ton email pour l&apos;inscription</span>
                <input
                    type="text"
                    name='last_name'
                    placeholder="Nom"
                    required
                    onChange={handleInput}
                    onBlur={(e) => checkInput(e.target)}
                />
                <input
                    type="text"
                    name='first_name'
                    placeholder="Prénom"
                    required
                    onChange={handleInput}
                    onBlur={(e) => checkInput(e.target)}
                />
                <input
                    type="email"
                    name='email'
                    placeholder="Email"
                    required
                    onChange={handleInput}
                    onBlur={(e) => checkInput(e.target)}
                />
                <input
                    type="password"
                    name='password'
                    required
                    placeholder="Mot de passe"
                    onChange={handleInput}
                    onBlur={(e) => checkInput(e.target)}
                />
                <button>S&apos;inscrire</button>
            </form>
        </section>
    )
} 