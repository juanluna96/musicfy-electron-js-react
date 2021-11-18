import React from 'react'
import { Button } from 'semantic-ui-react';

import './AuthOptions.scss'

const AuthOptions = ({ setSelectedForm }) => {
    return (
        <div className="auth-options">
            <h2>Millones de canciones, gratis en Musicfy</h2>
            <Button className="register" onClick={ () => setSelectedForm('register') }>
                Registrarte gratis
            </Button>
            <Button className="login" onClick={ () => setSelectedForm('login') }>
                Iniciar Sesion
            </Button>
        </div>
    )
}

export default AuthOptions
