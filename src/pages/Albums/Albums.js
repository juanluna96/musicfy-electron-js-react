import React, { useEffect, useState } from 'react'
import firebase from '../../db/Firebase';
import 'firebase/compat/firestore';

import './Albums.scss';

const db = firebase.firestore();

const Albums = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        db.collection('albums').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const album = {
                    id: doc.id,
                    ...doc.data()
                };
                setAlbums(albums => [...albums, album]);
            });
        });
    }, []);

    return (
        <div className="albums">
            <h1>Albumes</h1>
        </div>
    )
}

export default Albums
