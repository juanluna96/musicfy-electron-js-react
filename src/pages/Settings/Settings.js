import React, { useState } from 'react'
import UploadAvatar from '../../components/Settings/UploadAvatar';
import UserName from '../../components/Settings/UserName';
import UserEmail from '../../components/Settings/UserEmail';
import UserPassword from '../../components/Settings/UserPassword';
import BasicModal from '../../components/Modal/BasicModal';

import './Settings.scss'

const Settings = ({ user, setReloadApp }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [contentModal, setContentModal] = useState(null);

    return (
        <div className="settings">
            <h1>Configuracion</h1>
            <div className="avatar-name">
                <UploadAvatar setReloadApp={ setReloadApp } user={ user } />
                <UserName
                    user={ user }
                    setModalOpen={ setModalOpen }
                    setTitleModal={ setTitleModal }
                    setContentModal={ setContentModal }
                />
            </div>
            <UserEmail
                user={ user }
                setModalOpen={ setModalOpen }
                setTitleModal={ setTitleModal }
                setContentModal={ setContentModal }
            />
            <UserPassword
                user={ user }
                setModalOpen={ setModalOpen }
                setTitleModal={ setTitleModal }
                setContentModal={ setContentModal }
            />
            <BasicModal show={ modalOpen } setShow={ setModalOpen } title={ titleModal }>
                { contentModal }
            </BasicModal>
        </div>
    )
}

export default Settings
