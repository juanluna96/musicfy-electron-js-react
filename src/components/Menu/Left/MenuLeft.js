import React, { useEffect, useState } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link, useLocation } from "react-router-dom";
import BasicModal from '../../Modal/BasicModal';
import AddArtistForm from '../../Artists/AddArtistForm';

import "./MenuLeft.scss"
import { isUserAdmin } from '../../../db/Firestore';
import AddAlbumForm from '../../Albumns/AddAlbumnForm/AddAlbumForm';
import AddSongForm from '../../Songs/AddSongForm';

const Menuleft = ({ user, setUpdateArtist, setUpdateAlbum, setUpdateSong }) => {
    const location = useLocation()

    const [activeMenu, setActiveMenu] = useState(location.pathname);
    const [userAdmin, setUserAdmin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);

    const modalAdmin = [
        {
            title: 'Nuevo artista',
            content: <AddArtistForm setUpdateArtist={ setUpdateArtist } setShowModal={ setShowModal } />,
        },
        {
            title: 'Nuevo album',
            content: <AddAlbumForm setShowModal={ setShowModal } setUpdateAlbum={ setUpdateAlbum } />,
        },
        {
            title: 'Nueva canción',
            content: <AddSongForm setUpdateSong={ setUpdateSong } setShowModal={ setShowModal } />
        }
    ]

    const routes = [
        {
            name: 'Inicio',
            path: '/',
            icon: 'home'
        },
        {
            name: 'Artistas',
            path: '/artists',
            icon: 'users',
        },
        {
            name: 'Albums',
            path: '/albums',
            icon: 'music',
        }
    ]


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
                    {
                        routes.map(route => (
                            <Menu.Item
                                key={ route.name }
                                name={ route.name }
                                active={ activeMenu === route.path }
                                onClick={ handleMenu }
                                as={ Link }
                                to={ route.path }
                            >
                                { route.name }
                                <Icon name={ route.icon } />
                            </Menu.Item>
                        ))
                    }
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
