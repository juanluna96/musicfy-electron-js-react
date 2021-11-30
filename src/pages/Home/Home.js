import React, { useState, useEffect } from 'react'
import BannerHome from '../../components/layouts/BannerHome';
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
                <h1>Home...</h1>
            </div>
        </>
    )
}

export default Home
