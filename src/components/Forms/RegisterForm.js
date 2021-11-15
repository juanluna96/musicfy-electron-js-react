import React, { useState } from 'react'
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { validateEmail } from '../../helpers/Validations';
import firebase from '../../db/Firebase';
import 'firebase/auth';
import { toast } from 'react-toastify';

import './scss/RegisterForm.scss';

const formRegisterDefault = {
    email: '',
    password: '',
    username: ''
}

const Registerform = ({ setSelectedForm }) => {
    const [formRegister, setFormRegister] = useState(formRegisterDefault);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    const onChange = (e) => {
        setFormRegister({
            ...formRegister,
            [e.target.name]: e.target.value
        })
    }

    const changePasswordType = () => {
        setShowPassword(!showPassword);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setError({});
        let errorsForm = {};
        let formOk = true;

        setLoading(true);

        if (!validateEmail(formRegister.email)) {
            errorsForm.email = true;
            formOk = false;
        }

        if (formRegister.password.length < 6) {
            errorsForm.password = true;
            formOk = false;
        }

        if (formRegister.username.length < 3) {
            errorsForm.username = true;
            formOk = false;
        }

        if (!formOk) {
            setError(errorsForm);
            setLoading(false);
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(formRegister.email, formRegister.password)
            .then(() => {
                toast.success('Usuario creado');
            }).catch(err => {
                toast.error('Error al crear la cuenta');
                console.log(err);
            }).finally(() => {
                setLoading(false);
                setSelectedForm(null);
            })
    }

    return (
        <div className="register-form">
            <h1>Empieza a escuchar con una cuenta de Musicfy gratis</h1>
            <form onSubmit={ onSubmit }>
                <Form.Field>
                    <Input type="text" name="email" placeholder="Correo electronico" icon="mail outline"
                        onChange={ onChange } error={ error.email }
                    />
                    { error.email && <span>El correo electronico es invalido</span> }
                </Form.Field>
                <Form.Field>
                    <Input type={ showPassword ? 'text' : 'password' } name="password" placeholder="Contraseña"
                        onChange={ onChange } error={ error.password }
                        icon={
                            <Icon name={ showPassword ? 'eye slash' : 'eye' } link onClick={ () => changePasswordType() } />
                        }
                    />
                    { error.password && <span>La contraseña debe tener al menos 6 caracteres</span> }
                </Form.Field>
                <Form.Field>
                    <Input type="text" name="username" placeholder="¿Como deberiamos llamarte?" icon="user circle outline"
                        onChange={ onChange } error={ error.username }
                    />
                    { error.username && <span>El nombre de usuario debe tener al menos 3 caracteres</span> }
                </Form.Field>
                <Button type="submit" className="button" loading={ loading }>Continuar</Button>
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
