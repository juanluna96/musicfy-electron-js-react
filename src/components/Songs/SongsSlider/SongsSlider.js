import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import firebase from '../../../db/Firebase';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

import './SongsSlider.scss';

const db = firebase.firestore();

const SongsSlider = ({ title, data }) => {
    const settings = {
        dots: false,
        infinite: data.length > 3,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        className: 'songs-slider__list'
    };

    if (data.length === 0) {
        return null
    }

    return (
        <div className='songs-slider'>
            <h2>{ title }</h2>
            {/* Songs slider */ }
            <Slider { ...settings }>
                {
                    data.map(song => (
                        <SongItem key={ song.id } song={ song } />
                    ))
                }
            </Slider>
        </div>
    )
}

const SongItem = ({ song }) => {
    const [albumImage, setAlbumImage] = useState(null);
    const [album, setAlbum] = useState(null);

    // Get album of the song
    useEffect(() => {
        db.collection('albums').doc(song.album).get().then(doc => {
            const album_obj = {
                id: doc.id,
                ...doc.data()
            }
            setAlbum(album_obj);
        });
    }, [song]);

    // Get album image
    useEffect(() => {
        if (album) {
            const storage = firebase.storage();
            const storageRef = storage.ref();
            const imageRef = storageRef.child(`albums/${album?.banner}`);
            imageRef.getDownloadURL().then(url => {
                setAlbumImage(url);
            });
        }
    }, [album]);

    return (
        <div className='songs-slider__list-item'>
            <div className='songs-slider__list-item-image' style={ { backgroundImage: `url(${albumImage})`, height: 200 } } />
            <div className='songs-slider__list-item-info'>
                <h3>{ song.name }</h3>
            </div>
        </div>
    )
}

export default SongsSlider
