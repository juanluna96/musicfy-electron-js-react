import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Pages
import Home from '../pages/Home'

const RouterComponent = () => {
    return (
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/artist" element={ <h1>Artistas</h1> } />
        </Routes>
    )
}

export default RouterComponent
