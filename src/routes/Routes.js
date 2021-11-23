import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Pages
import Home from '../pages/Home'
import Settings from '../pages/Settings';

const RouterComponent = ({ user }) => {
    return (
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/artist" element={ <h1>Artistas</h1> } />
            <Route path="/settings" element={ <Settings user={ user } /> } />
        </Routes>
    )
}

export default RouterComponent
