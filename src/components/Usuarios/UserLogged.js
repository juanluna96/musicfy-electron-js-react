import React from 'react'
import firebase from '../../db/Firebase';

const Userlogged = () => {
    const logout = () => {
        firebase.auth().signOut();
    }

    return (
        <div style={ {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "center",
            height: "100vh"
        } }>
            <h1>Usuario Logueado</h1>
            <button onClick={ () => logout() }>Cerrar sesion</button>
        </div>
    )
}

export default Userlogged
