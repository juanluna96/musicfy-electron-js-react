import React, { useState } from 'react'

import './Settings.scss'

const Settings = ({ user }) => {
    const [state, setstate] = useState('0');
    console.log(user);
    return (
        <div className="settings">
            <h1>Settings</h1>
        </div>
    )
}

export default Settings
