import React, { useState } from 'react'
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import firebase from '../../db/Firebase';
import 'firebase/auth';

import './scss/RegisterForm.scss';

const Registerform = ({ setSelectedForm }) => {
    const [error, setError] = useState(false);

    const onSubmit = () => {
        console.log('Formulario enviado')
    }

    return (
        <div className="register-form">
            <h1>Empieza a escuchar con una cuenta de Musicfy gratis</h1>
            <form onSubmit={ onSubmit }>
                <Form.Field>
                    <Input type="text" name="email" placeholder="Correo electronico" icon="mail outline"
                    // onChange="" error={ error } 
                    />
                </Form.Field>
                <Form.Field>
                    <Input type="password" name="password" placeholder="Contraseña" icon="eye"
                    // onChange="" error={ error } 
                    />
                </Form.Field>
                <Form.Field>
                    <Input type="password" name="username" placeholder="¿Como deberiamos llamarte?" icon="user circle outline"
                    // onChange="" error={ error } 
                    />
                </Form.Field>
                <Button type="submit" class="button">Continuar</Button>
            </form>

            <div className="register-form__options">
                <p onClick={ () => setSelectedForm(null) }>Volver</p>
                <p>
                    Ya tienes Musicfy?
                    <span onClick={ () => setSelectedForm('login') }>Iniciar sesion</span>
                </p>
            </div>
        </div>
    )
}

export default Registerform
