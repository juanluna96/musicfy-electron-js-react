import React, { useEffect, useState } from 'react'
import firebase from '../../../db/Firebase'
import 'firebase/compat/storage'

import './BannerHome.scss';

const BannerHome = () => {
    const [bannerUrl, setBannerUrl] = useState(null);

    useEffect(() => {
        firebase.storage().ref('others/banner.jpg').getDownloadURL().then(url => {
            setBannerUrl(url);
        }).catch(() => { })
    }, []);

    if (!bannerUrl) {
        return null;
    }

    return (
        <div className="banner-home" style={ { backgroundImage: `url(${bannerUrl})` } } />
    )
}

export default BannerHome
