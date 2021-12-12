import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import firebase from '../../db/Firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import './Album.scss'

const Album = () => {
    const [album, setAlbum] = useState(null);
    const [banner, setBanner] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const db = firebase.firestore();
        const albumRef = db.collection('albums').doc(id);
        albumRef.get().then(doc => {
            const album = {
                id: doc.id,
                ...doc.data()
            };
            setAlbum(album);
        });
    }, [id]);

    useEffect(() => {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        if (album) {
            const bannerRef = storageRef.child(`albums/${album.banner}`);
            bannerRef.getDownloadURL().then(url => {
                setBanner(url);
            });
        }
    }, [album]);

    return (
        <div>
            <h2>Album individual</h2>
        </div>
    )
}

export default Album
