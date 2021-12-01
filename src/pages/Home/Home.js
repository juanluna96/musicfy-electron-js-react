import React, { useState, useEffect } from 'react'
import BannerHome from '../../components/layouts/BannerHome';
import BasicSliderItems from '../../components/Sliders/BasicSliderItems';
import firebase from '../../db/Firebase';
import 'firebase/compat/firestore';

import './Home.scss';

const db = firebase.firestore(firebase);

const Home = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        db.collection('artists').get().then(snapshot => {
            const data = snapshot?.docs.map(doc => doc.data());
            setArtists(data);
        });
    }, []);

    return (
        <>
            <BannerHome />
            <div className="home">
                <BasicSliderItems title="Ultimos artistas" artists={ artists } />
            </div>
        </>
    )
}

export default Home
