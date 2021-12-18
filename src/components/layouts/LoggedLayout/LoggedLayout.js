import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react';
import { BrowserRouter } from 'react-router-dom';

import "./Loggedlayout.scss"

import RouterComponent from '../../../routes/Routes';
import Menuleft from '../../Menu/Left';
import TopBar from '../../TopBar';
import Player from '../../Player/Player';

const Loggedlayout = ({ user, setReloadApp }) => {
    const [updateArtist, setUpdateArtist] = useState(false);
    const [updateAlbum, setUpdateAlbum] = useState(false);

    return (
        <BrowserRouter>
            <Grid className="logged-layout">
                <Grid.Row>
                    <Grid.Column width={ 3 }>
                        <Menuleft setUpdateArtist={ setUpdateArtist } setUpdateAlbum={ setUpdateAlbum } user={ user } />
                    </Grid.Column>
                    <Grid.Column className="content" width={ 13 }>
                        <TopBar user={ user } />
                        <RouterComponent updateArtist={ updateArtist } updateAlbum={ updateAlbum } user={ user } setReloadApp={ setReloadApp } />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={ 16 }>
                        <Player />
                    </Grid.Column>
                </  Grid.Row>
            </Grid>
        </BrowserRouter>
    )
}

export default Loggedlayout
