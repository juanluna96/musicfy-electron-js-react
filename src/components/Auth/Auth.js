import React from 'react'
import { useState } from 'react';
import Registerform from '../Forms/RegisterForm';
import Loginform from '../Forms/LoginForm';
import AuthOptions from './AuthOptions/AuthOptions';

const Auth = () => {
    const [selectedForm, setSelectedForm] = useState(null);

    const handleForm = () => {
        switch (selectedForm) {
            case 'login':
                return <Loginform />
                break;

            case 'register':
                return <Registerform />
                break;

            default:
                return <AuthOptions />
                break;
        }
    }

    return (
        <div>
            <h1>Iniciar Sesion</h1>
            <h2>Registrarse</h2>
        </div>
    )
}

export default Auth
