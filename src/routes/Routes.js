import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Pages
import Home from '../pages/Home'
import Settings from '../pages/Settings';
import Artist from '../pages/Artist';
import Artists from '../pages/Artists';
import Albumns from '../pages/Albums';
import Album from '../pages/Album';

const RouterComponent = ({ user, updateArtist, updateAlbum, updateSong, setReloadApp }) => {
    return (
        <Routes>
            <Route path="/" element={ <Home updateSong={ updateSong } updateArtist={ updateArtist } updateAlbum={ updateAlbum } /> } />
            <Route path="/artist/:id" element={ <Artist /> } />
            <Route path="/artists" element={ <Artists /> } />
            <Route path="/albums" element={ <Albumns /> } />
            <Route path="/album/:id" element={ <Album /> } />
            <Route path="/settings" element={ <Settings setReloadApp={ setReloadApp } user={ user } /> } />
        </Routes>
    )
}

export default RouterComponent
