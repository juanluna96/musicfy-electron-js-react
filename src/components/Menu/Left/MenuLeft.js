import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link, withRouter } from "react-router-dom";

import "./MenuLeft.scss"

const Menuleft = ({ user }) => {

    return (
        <Menu className="menu-left" vertical>
            <div className="top">
                <Menu.Item name="home">
                    <Icon name="home" />Inicio
                </Menu.Item>
                <Menu.Item name="artist">
                    <Icon name="music" />Artistas
                </Menu.Item>
            </div>
            <div className="footer">
                <Menu.Item>
                    <Icon name="plus square outline" />Nueva cancion
                </Menu.Item>
                <Menu.Item>
                    <Icon name="plus square outline" />Nuevo artista
                </Menu.Item>
            </div>
        </Menu>
    )
}

export default Menuleft
