import React, { useState } from 'react'
import UploadAvatar from '../../components/Settings/UploadAvatar';

import './Settings.scss'

const Settings = ({ user, setReloadApp }) => {
    return (
        <div className="settings">
            <h1>Configuracion</h1>
            <div className="avatar-name">
                <UploadAvatar setReloadApp={ setReloadApp } user={ user } />
                <h2>Nombre { user.displayName }</h2>
            </div>
        </div>
    )
}

export default Settings
