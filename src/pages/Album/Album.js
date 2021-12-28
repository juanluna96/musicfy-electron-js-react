import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from 'semantic-ui-react';

import firebase from '../../db/Firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import './Album.scss'
import ListSongs from '../../components/Songs/ListSongs';

const db = firebase.firestore();

const Album = () => {
    const [album, setAlbum] = useState(null);
    const [banner, setBanner] = useState(null);
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([]);
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

    // Get songs of the album
    useEffect(() => {
        if (album) {
            const songsRef = db.collection('songs').where('album', '==', album.id);
            songsRef.get().then(querySnapshot => {
                const songs = [];
                querySnapshot.forEach(doc => {
                    const song = {
                        id: doc.id,
                        ...doc.data()
                    };
                    songs.push(song);
                });
                setSongs(songs);
            });
        }
    }, [album]);

    if (!album || !artist || !banner) {
        return <Loader active >Cargando</Loader>
    }

    return (
        <div className="album">
            <div className="album__header">
                <HeaderAlbum artist={ artist } album={ album } banner={ banner } />
            </div>
            <div className="album__songs">
                <ListSongs songs={ songs } albumImage={ banner } />
            </div>
        </div>
    )
}

const HeaderAlbum = ({ album, banner, artist }) => {
    return (
        <>
            <div className="album__header__banner" style={ { backgroundImage: `url(${banner})` } } />
            <div className="album__header__info">
                <h1>{ album.name }</h1>
                <p>
                    De <span>{ artist.name }</span>
                </p>
            </div>
        </>
    )
}

export default Album
