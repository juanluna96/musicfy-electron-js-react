import React, { useEffect, useState } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link, useLocation } from "react-router-dom";

import "./MenuLeft.scss"
import { isUserAdmin } from '../../../db/Firestore';

const Menuleft = ({ user }) => {
    const location = useLocation()

    const [activeMenu, setActiveMenu] = useState(location.pathname);
    const [userAdmin, setUserAdmin] = useState(false);

    useEffect(() => {
        isUserAdmin(user.uid).then(admin => {
            setUserAdmin(admin)
        })
    }, []);

    const handleMenu = (e, menu) => {
        setActiveMenu(menu.to);
    }

    return (
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
                            <Menu.Item>
                                <Icon name="plus square outline" />Nueva cancion
                            </Menu.Item>
                            <Menu.Item>
                                <Icon name="plus square outline" />Nuevo artista
                            </Menu.Item>
                        </>
                    )
                }
            </div>
        </Menu>
    )
}

export default Menuleft
