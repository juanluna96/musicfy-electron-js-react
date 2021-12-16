import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import firebase from '../../db/Firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import './Album.scss'

const db = firebase.firestore();

const Album = () => {
    const [album, setAlbum] = useState(null);
    const [banner, setBanner] = useState(null);
    const [artist, setArtist] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const albumRef = db.collection('albums').doc(id);
        albumRef.get().then(doc => {
            const album = {
                id: doc.id,
                ...doc.data()
            };
            setAlbum(album);
        });
    }, [id]);

    // Get artist of the album
    useEffect(() => {
        if (album) {
            const artistRef = db.collection('artists').doc(album?.artist);
            artistRef.get().then(doc => {
                const artist = {
                    id: doc.id,
                    ...doc.data()
                };
                setArtist(artist);
            });
        }
    }, [album]);

    // Get album banner
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
