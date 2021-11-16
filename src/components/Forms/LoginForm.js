import React from 'react';
import { Button, Icon, Input, Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { validateEmail } from '../../helpers/Validations';
import firebase from '../../db/Firebase';
import 'firebase/auth';

import './scss/LoginForm.scss';

const Loginform = ({ setSelectedForm }) => {

    const onSubmit = () => {

    }

    return (
        <div className="login-form">
            <h1>Musica para todos.</h1>

            <Form onSubmit={ onSubmit }>
                <Form.Field>
                    <Input icon='user' iconPosition='left' placeholder='Correo electrónico' />
                </Form.Field>
                <Form.Field>
                    <Input icon='lock' iconPosition='left' placeholder='Contraseña' type='password' />
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
