import React, { useEffect, useState } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link, useLocation } from "react-router-dom";
import BasicModal from '../../Modal/BasicModal';

import "./MenuLeft.scss"
import { isUserAdmin } from '../../../db/Firestore';

const modalAdmin = [
    {
        title: 'Nuevo artista',
        content: <div>
            <p>Nombre del artista</p>
            <input type="text" />
            <p>Nombre de la banda</p>
            <input type="text" />
            <p>Año de nacimiento</p>
            <input type="text" />
            <p>Género</p>
            <input type="text" />
            <p>Biografía</p>
            <textarea></textarea>
        </div>,
    },
    {
        title: 'Nueva canción',
        content: <div>
            <p>Nombre de la canción</p>
            <input type="text" />
            <p>Nombre del artista</p>
            <input type="text" />
            <p>Año de lanzamiento</p>
            <input type="text" />
            <p>Género</p>
            <input type="text" />
            <p>Biografía</p>
            <textarea></textarea>
        </div>,
    }
]

const Menuleft = ({ user }) => {
    const location = useLocation()

    const [activeMenu, setActiveMenu] = useState(location.pathname);
    const [userAdmin, setUserAdmin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);

    useEffect(() => {
        isUserAdmin(user.uid).then(admin => {
            setUserAdmin(admin)
        })
    }, [user]);

    useEffect(() => {
        setActiveMenu(location.pathname)
    }, [location]);

    const handleMenu = (e, menu) => {
        setActiveMenu(menu.to);
    }

    const handleModal = (title, content) => {
        setTitleModal(title);
        setContentModal(content);
        setShowModal(true);
    }

    return (
        <>
            <Menu className="menu-left" vertical>
                <div className="top">
                    <Menu.Item as={ Link } to="/" active={ activeMenu === '/' } onClick={ handleMenu } name="home">
                        <Icon name="home" />Inicio
                    </Menu.Item>
                    <Menu.Item as={ Link } to="/artist" active={ activeMenu === '/artist' } onClick={ handleMenu } name="artist" >
                        <Icon name="music" />Artistas
                    </Menu.Item>
                </div>
                <div className="footer">
                    {
                        userAdmin && (
                            <>
                                {
                                    modalAdmin.map((modal, index) => {
                                        return (
                                            <Menu.Item key={ index } onClick={ () => handleModal(modal.title, modal.content) }>
                                                <Icon name="plus square outline" />{ modal.title }
                                            </Menu.Item>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                </div>
            </Menu>
            <BasicModal show={ showModal } setShow={ setShowModal } title={ titleModal }>
                { contentModal }
            </BasicModal>
        </>
    )
}

export default Menuleft
