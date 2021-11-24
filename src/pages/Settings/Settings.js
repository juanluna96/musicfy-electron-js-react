import React, { useState } from 'react'
import UploadAvatar from '../../components/Settings/UploadAvatar';
import UserName from '../../components/Settings/UserName';

import './Settings.scss'

const Settings = ({ user, setReloadApp }) => {
    return (
        <div className="settings">
            <h1>Configuracion</h1>
            <div className="avatar-name">
                <UploadAvatar setReloadApp={ setReloadApp } user={ user } />
                <UserName user={ user } />
            </div>
        </div>
    )
}

export default Settings
