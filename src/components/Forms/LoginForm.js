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
    const [userActive, setUserActive] = useState(true);
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
                    setUserActive(res.user.emailVerified);
                    setUser(res.user);
                    if (!res.user.emailVerified) {
                        toast.warning('Por favor verifique su correo');
                    } else {
                        toast.success('Bienvenido');
                        setSelectedForm('home');
                    }
                })
                .catch(err => {
                    handleError(err.code);
                }).finally(() => {
                    setLoading(false);
                })
        }

        setLoading(false);
    }

    return (
        <div className="login-form">
            <h1>Musica para todos</h1>

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

            {
                !userActive &&
                <ButtonResendEmailVerification user={ user } setUserActive={ setUserActive } setLoading={ setLoading } />
            }

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

const ButtonResendEmailVerification = ({ user, setUserActive, setLoading }) => {

    const FirebaseResendEmailVerification = () => {
        setLoading(true);
        user.sendEmailVerification()
            .then(() => {
                toast.success('Se ha enviado un correo de verificación');
            })
            .catch(err => {
                console.log(err);
                handleError(err.code);
            }).finally(() => {
                setLoading(false);
                setUserActive(false);
            });
    }

    return (
        <div className="resend-verification-email">
            <p>
                Si no has recibido el correo de verificación, puedes reenviarlo
                haciendo click en el botón
                <span onClick={ FirebaseResendEmailVerification }>
                    aquí
                </span>
                .
            </p>
        </div>
    )
}

const handleError = (code) => {
    switch (code) {
        case 'auth/user-not-found':
            toast.warning('El usuario o la contraseña son incorrectos')
            break;

        case 'auth/too-many-request':
            toast.warning('Demasiados intentos fallidos, por favor intente más tarde')
            break;

        case 'auth/wrong-password':
            toast.warning('El usuario o la contraseña son incorrectos')
            break;

        default:
            toast.error('Error desconocido')
            break;
    }
}


export default Loginform
