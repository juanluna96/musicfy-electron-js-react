import React, { useEffect, useState } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";

import "./MenuLeft.scss"

const Menuleft = ({ user }) => {

    return (
        <Menu className="menu-left" vertical>
            <div className="top">
                <Menu.Item as={ Link } to="/" name="home">
                    <Icon name="home" />Inicio
                </Menu.Item>
                <Menu.Item as={ Link } to="/artist" name="artist" >
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
