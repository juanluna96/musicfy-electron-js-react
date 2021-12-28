import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react';
import { HashRouter } from 'react-router-dom';

import "./Loggedlayout.scss"

import RouterComponent from '../../../routes/Routes';
import Menuleft from '../../Menu/Left';
import TopBar from '../../TopBar';
import Player from '../../Player/Player';

const Loggedlayout = ({ user, setReloadApp }) => {
    const [updateArtist, setUpdateArtist] = useState(false);
    const [updateAlbum, setUpdateAlbum] = useState(false);
    const [updateSong, setUpdateSong] = useState(false);
    const [songData, setSongData] = useState(null);

    const playerSong = (id, image, name, url, artist_name) => {
        setSongData({
            id,
            image,
            name,
            url,
            artist_name
        });
    }

    const song = {
        name: 'Efectos vocales',
        image: 'https://firebasestorage.googleapis.com/v0/b/musicfy-cfb06.appspot.com/o/albums%2F61e98ecb-ade4-4910-88e8-dee0ab8220e1?alt=media&token=fe8e1352-cf8a-4536-9bd8-ca3ab3a5d8d5',
        url: 'https://firebasestorage.googleapis.com/v0/b/musicfy-cfb06.appspot.com/o/songs%2FSteve%20Combs%20-%20Pop.mp3?alt=media&token=7841f9ba-dd9c-42f5-a7bb-c24c0331bf2e'
    }

    return (
        <HashRouter>
            <Grid className="logged-layout">
                <Grid.Row>
                    <Grid.Column width={ 3 }>
                        <Menuleft setUpdateSong={ setUpdateSong } setUpdateArtist={ setUpdateArtist } setUpdateAlbum={ setUpdateAlbum } user={ user } />
                    </Grid.Column>
                    <Grid.Column className="content" width={ 13 }>
                        <TopBar user={ user } />
                        <RouterComponent playerSong={ playerSong } updateSong={ updateSong } updateArtist={ updateArtist } updateAlbum={ updateAlbum } user={ user } setReloadApp={ setReloadApp } />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={ 16 }>
                        <Player playerSong={ playerSong } songData={ songData } />
                    </Grid.Column>
                </  Grid.Row>
            </Grid>
        </HashRouter>
    )
}

export default Loggedlayout
