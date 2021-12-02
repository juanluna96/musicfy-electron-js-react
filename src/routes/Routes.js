import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Pages
import Home from '../pages/Home'
import Settings from '../pages/Settings';
import Artist from '../pages/Artist';
import Artists from '../pages/Artists';

const RouterComponent = ({ user, updateArtist, setReloadApp }) => {
    return (
        <Routes>
            <Route path="/" element={ <Home updateArtist={ updateArtist } /> } />
            <Route path="/artist/:id" element={ <Artist /> } />
            <Route path="/artists" element={ <Artists /> } />
            <Route path="/settings" element={ <Settings setReloadApp={ setReloadApp } user={ user } /> } />
        </Routes>
    )
}

export default RouterComponent
