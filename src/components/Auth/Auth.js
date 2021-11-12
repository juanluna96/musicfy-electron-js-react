import React from 'react'
import { useState } from 'react';
import Registerform from '../Forms/RegisterForm';
import Loginform from '../Forms/LoginForm';
import AuthOptions from './AuthOptions/AuthOptions';
import BackgroundAuth from '../../assets/img/jpg/background-auth.jpg'
import LogoBlackWhite from '../../assets/img/png/logo-name-white.png'

import "./Auth.scss";

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
        <div className="auth" style={ { backgroundImage: `url(${BackgroundAuth})` } }>
            <div className="auth__dark">
                <div className="auth__box">
                    <div className="auth__box-logo">
                        <img src={ LogoBlackWhite } alt="MusicFY" />
                    </div>
                    { handleForm() }
                </div>
            </div>
        </div>
    )
}

export default Auth
