import React, { useState, useEffect } from 'react';
import firebase from '../../../db/Firebase';
import 'firebase/compat/storage';

import './BannerArtist.scss';

const BannerArtist = ({ artist }) => {
    const [bannerUrl, setBannerUrl] = useState(null);

    useEffect(() => {
        const storageRef = firebase.storage().ref();
        const artistRef = storageRef.child(`artists/${artist.banner}`);
        artistRef.getDownloadURL().then(url => {
            setBannerUrl(url);
        });
    }, [artist]);

    return (
        <div className="banner-artist" style={ { backgroundImage: `url(${bannerUrl})` } }>
            BannerArtist...
        </div>
    )
}

export default BannerArtist
