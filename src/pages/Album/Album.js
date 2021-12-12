import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import firebase from '../../db/Firebase';
import 'firebase/compat/firestore';

import './Album.scss'

const Album = () => {
    const [album, setAlbum] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const db = firebase.firestore();
        const albumRef = db.collection('albums').doc(id);
        albumRef.get().then(doc => {
            const album = {
                id: doc.id,
                ...doc.data()
            };
            console.log(album);
            setAlbum(album);
        });
    }, []);

    return (
        <div>
            <h2>Album individual</h2>
        </div>
    )
}

export default Album
