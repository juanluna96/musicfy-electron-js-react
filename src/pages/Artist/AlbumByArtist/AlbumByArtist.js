import React, { useEffect, useState } from 'react'
import firebase from '../../../db/Firebase';
import 'firebase/compat/firestore';

import './AlbumByArtist.scss';

const AlbumByArtist = ({ albumId }) => {
    const [album, setAlbum] = useState(null);
    const [albumImage, setAlbumImage] = useState(null);

    useEffect(() => {
        const db = firebase.firestore();
        const albumRef = db.collection('albums').doc(albumId);
        albumRef.get().then(doc => {
            const album = {
                id: doc.id,
                ...doc.data()
            };
            setAlbum(album);
        });
    }, [albumId]);

    // Get album banner
    useEffect(() => {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        if (album) {
            const bannerRef = storageRef.child(`albums/${album.banner}`);
            bannerRef.getDownloadURL().then(url => {
                setAlbumImage(url);
            });
        }
    }, [album]);

    return (
        <div>
            {
                album &&
                <>
                    <img src={ albumImage } alt={ album.title } />
                    <h2>{ album.title }</h2>
                    <p>{ album.description }</p>
                </>
            }
        </div>
    )
}

export default AlbumByArtist
