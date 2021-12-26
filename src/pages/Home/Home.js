import React, { useState, useEffect } from 'react'
import BannerHome from '../../components/layouts/BannerHome';
import BasicSliderItems from '../../components/Sliders/BasicSliderItems';
import firebase from '../../db/Firebase';
import 'firebase/compat/firestore';

import './Home.scss';

const db = firebase.firestore(firebase);

const Home = ({ updateArtist, updateAlbum, updateSong }) => {
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        db.collection('artists').get().then(snapshot => {
            const data = snapshot?.docs.map(doc => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ));
            setArtists(data);
        });
    }, [updateArtist]);

    useEffect(() => {
        db.collection('albums').get().then(snapshot => {
            const data = snapshot?.docs.map(doc => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ));
            setAlbums(data);
        });
    }, [updateAlbum]);

    // Get a list of ten last songs
    useEffect(() => {
        db.collection('songs').limit(10).get().then(snapshot => {
            const data = snapshot?.docs.map(doc => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ));
            setSongs(data);
        });
    }, [updateSong]);

    return (
        <>
            <BannerHome />
            <div className="home">
                <BasicSliderItems title="Ultimos artistas" folder="artists" list={ artists } path="artist" />
                <BasicSliderItems title="Ultimos albumes" folder="albums" list={ albums } path="album" />
                <BasicSliderItems title="Ultimas canciones" folder="songs" list={ songs } path="song" />
            </div>
        </>
    )
}

export default Home
