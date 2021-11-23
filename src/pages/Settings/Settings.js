import React, { useState } from 'react'
import UploadAvatar from '../../components/Settings/UploadAvatar';

import './Settings.scss'

const Settings = ({ user }) => {
    const [state, setstate] = useState('0');
    console.log(user);
    return (
        <div className="settings">
            <h1>Configuracion</h1>
            <div className="avatar-name">
                <UploadAvatar user={ user } />
                <h2>Nombre { user.displayName }</h2>
            </div>
        </div>
    )
}

export default Settings
