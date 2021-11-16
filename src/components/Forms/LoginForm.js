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
        console.log(formLogin)
    }

    return (
        <div className="login-form">
            <h1>Musica para todos.</h1>

            <Form onSubmit={ onSubmit } onChange={ onChange }>
                <Form.Field>
                    <Input icon='user' name='email' placeholder='Correo electrónico' />
                </Form.Field>
                <Form.Field>
                    <Input type={ showPassword ? 'text' : 'password' } name="password" placeholder="Contraseña"
                        // error={ error.password }
                        icon={
                            <Icon name={ showPassword ? 'eye slash' : 'eye' } link onClick={ () => changePasswordType() } />
                        }
                    />
                </Form.Field>
                <Button type='submit' >Iniciar sesion</Button>
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
