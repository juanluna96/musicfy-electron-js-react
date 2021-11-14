import React, { useState } from 'react'
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import firebase from '../../db/Firebase';
import 'firebase/auth';

import './scss/RegisterForm.scss';

const formRegisterDefault = {
    email: '',
    password: '',
    username: ''
}

const Registerform = ({ setSelectedForm }) => {
    const [formRegister, setFormRegister] = useState(formRegisterDefault);
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e) => {
        setFormRegister({
            ...formRegister,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = () => {
        console.log('Formulario enviado')
    }

    return (
        <div className="register-form">
            <h1>Empieza a escuchar con una cuenta de Musicfy gratis</h1>
            <form onSubmit={ onSubmit }>
                <Form.Field>
                    <Input type="text" name="email" placeholder="Correo electronico" icon="mail outline"
                        onChange={ onChange } error={ error }
                    />
                </Form.Field>
                <Form.Field>
                    <Input type={ showPassword ? 'text' : 'password' } name="password" placeholder="Contraseña"
                        onChange={ onChange } error={ error }
                        icon={
                            <Icon name={ showPassword ? 'eye slash' : 'eye' } link onClick={ () => setShowPassword(!showPassword) } />
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <Input type="password" name="username" placeholder="¿Como deberiamos llamarte?" icon="user circle outline"
                        onChange={ onChange } error={ error }
                    />
                </Form.Field>
                <Button type="submit" className="button">Continuar</Button>
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
