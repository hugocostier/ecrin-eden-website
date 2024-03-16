import { library } from '@fortawesome/fontawesome-svg-core';
import { faApple, faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.hook';

library.add(faFacebookF, faGoogle, faApple)

export const LoginForm = () => {
    const auth = useAuth()

    const [input, setInput] = useState({
        username: '',
        password: ''
    })

    const handleLogin = (e) => {
        e.preventDefault()

        if (input.username !== '' && input.password !== '') {
            auth.logIn(input)
            return
        }

        alert('Saisissez votre email et mot de passe')
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
        <section className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
                <h2>Connexion</h2>
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
                <span>ou utilise ton compte</span>
                <input
                    type="email"
                    name="username"
                    placeholder="Email"
                    required
                    onChange={handleInput}
                    onBlur={(e) => checkInput(e.target)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    required
                    onChange={handleInput}
                    onBlur={(e) => checkInput(e.target)}
                />
                <div className="remember-me">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Se souvenir de moi</label>
                </div>
                <a href="">Mot de passe oublié ?</a>
                <button>Se connecter</button>
            </form>
        </section>
    )
}