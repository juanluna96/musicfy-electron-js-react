import React, { useState } from 'react';
import { Button, Icon, Input, Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { validateEmail } from '../../helpers/Validations';
import firebase from '../../db/Firebase';
import 'firebase/auth';

import './scss/LoginForm.scss';

const formLoginDefault = {
    email: '',
    password: ''
}

const Loginform = ({ setSelectedForm }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [formLogin, setFormLogin] = useState(formLoginDefault);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [userActive, setUserActive] = useState(false);
    const [user, setUser] = useState(null);

    const changePasswordType = () => {
        setShowPassword(!showPassword);
    }

    const onChange = e => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        setError({});
        let errors = {};
        let formOk = true;


        if (!validateEmail(formLogin.email)) {
            errors.email = true;
            formOk = false;
        }

        if (formLogin.password.length < 6) {
            errors.password = true;
            formOk = false;
        }

        setError(errors);

        if (formOk) {
            firebase.auth().signInWithEmailAndPassword(formLogin.email, formLogin.password)
                .then(res => {
                    setLoading(false);
                    setUserActive(true);
                    setUser(res.user);
                    setSelectedForm('home');
                })
                .catch(err => {
                    setLoading(false);
                    toast.error(err.message);
                })
        }

        setLoading(false);
    }

    return (
        <div className="login-form">
            <h1>Musica para todos</h1>
            <h1>{ loading ? 'Loading' : 'Not loading' }</h1>

            <Form onSubmit={ onSubmit } onChange={ onChange }>
                <Form.Field>
                    <Input icon='user' name='email' placeholder='Correo electrónico' error={ error.email } />
                    {
                        error.email &&
                        <span className="error-text">
                            El correo electrónico no es válido
                        </span>
                    }
                </Form.Field>
                <Form.Field>
                    <Input type={ showPassword ? 'text' : 'password' } name="password" placeholder="Contraseña"
                        error={ error.password }
                        icon={
                            <Icon name={ showPassword ? 'eye slash' : 'eye' } link onClick={ () => changePasswordType() } />
                        }
                    />
                    {
                        error.password &&
                        <span className="error-text">
                            La contraseña debe tener al menos 6 caracteres
                        </span>
                    }
                </Form.Field>
                <Button type='submit' loading={ loading }>Iniciar sesion</Button>
            </Form>

            <div className="login-form__options">
                <p onClick={ () => setSelectedForm(null) }> Volver </p>
                <p>¿No tienes cuenta?
                    <span onClick={ () => setSelectedForm('register') }>
                        Registrate
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Loginform
