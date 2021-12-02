import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Pages
import Home from '../pages/Home'
import Settings from '../pages/Settings';
import Artist from '../pages/Artist';

const RouterComponent = ({ user, setReloadApp }) => {
    return (
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/artist/:id" element={ <Artist /> } />
            <Route path="/settings" element={ <Settings setReloadApp={ setReloadApp } user={ user } /> } />
        </Routes>
    )
}

export default RouterComponent
