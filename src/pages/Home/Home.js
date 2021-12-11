import React, { useState, useEffect } from 'react'
import BannerHome from '../../components/layouts/BannerHome';
import BasicSliderItems from '../../components/Sliders/BasicSliderItems';
import firebase from '../../db/Firebase';
import 'firebase/compat/firestore';

import './Home.scss';

const db = firebase.firestore(firebase);

const Home = ({ updateArtist, updateAlbum }) => {
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);

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

    return (
        <>
            <BannerHome />
            <div className="home">
                <BasicSliderItems title="Ultimos artistas" folder="artists" list={ artists } />
                <BasicSliderItems title="Ultimos albumes" folder="albums" list={ albums } />
            </div>
        </>
    )
}

export default Home
