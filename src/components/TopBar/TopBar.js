import React from 'react'
import { Link } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import firebaseApp from '../../db/Firebase';
import 'firebase/auth'

import './TopBar.scss'

const TopBar = ({ user }) => {
    const avatar = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200";

    const logout = () => {
        firebaseApp.auth().signOut();
    }

    const closeSideNav = () => {
        document.querySelector('.ui.sidebar').classList.remove('visible');
    }

    return (
        <div className="top-bar">
            <div className="top-bar-left">
                <Icon name="angle left" onClick={ closeSideNav } />
            </div>
            <div className="top-bar-right">
                <Link to="/settings">
                    <Image src={ avatar } avatar />
                    { user.displayName }
                </Link>
                <Icon name="power off" onClick={ logout } />
            </div>
        </div>
    )
}

export default TopBar
