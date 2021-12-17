import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
            <Grid>
                { albums.map(album => (
                    <AlbumItem album={ album } key={ album.id } />
                )) }
            </Grid>
        </div>
    )
}

const AlbumItem = ({ album }) => {
    const [Banner, setBanner] = useState('');

    useEffect(() => {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`albums/${album.banner}`);
        imageRef.getDownloadURL().then((url) => {
            setBanner(url);
        }
        );
    }, [album]);

    return (
        <Grid.Column mobile={ 8 } tablet={ 4 } computer={ 3 }>
            <Link to={ `/album/${album.id}` }>
                <div className="albums__item">
                    <div className="banner" style={ { backgroundImage: `url(${Banner})` } } />
                    <h3>{ album.name }</h3>
                    <p>{ album.description }</p>
                </div>
            </Link>
        </Grid.Column>
    )
}

export default Albums
