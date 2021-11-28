import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import firebaseApp from '../../db/Firebase';
import 'firebase/auth'

import './TopBar.scss'

const TopBar = ({ user }) => {
    const navigate = useNavigate();
    const avatar = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200";

    const logout = () => {
        firebaseApp.auth().signOut();
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="top-bar">
            <div className="top-bar__left">
                <Icon name="angle left" onClick={ goBack } />
            </div>
            <div className="top-bar__right">
                <Link to="/settings">
                    <Image src={ user.photoURL ? user.photoURL : avatar } avatar />
                    { user.displayName }
                </Link>
                <Icon name="power off" onClick={ logout } />
            </div>
        </div>
    )
}

export default TopBar
