import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import firebase from '../../../db/Firebase';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

import './SongsSlider.scss';
import { Icon } from 'semantic-ui-react';

const db = firebase.firestore();

const SongsSlider = ({ playerSong, title, data }) => {
    const settings = {
        dots: false,
        infinite: data.length > 4,
        speed: 500,
        slidesToShow: 4,
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
                        <SongItem key={ song.id } song={ song } playerSong={ playerSong } />
                    ))
                }
            </Slider>
        </div>
    )
}

const SongItem = ({ song, playerSong }) => {
    const [albumImage, setAlbumImage] = useState(null);
    const [album, setAlbum] = useState(null);
    const [artist, setArtist] = useState(null);

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

    // Get artist of the album
    useEffect(() => {
        if (album) {
            db.collection('artists').doc(album.artist).get().then(doc => {
                const artist_obj = {
                    id: doc.id,
                    ...doc.data()
                }
                setArtist(artist_obj);
            });
        }
    }, [album]);

    const onPlay = () => {
        playerSong(song.id, albumImage, song.name, song.url, artist.name);
    }

    return (
        <div className='songs-slider__list-item'>
            <div className='songs-slider__list-item-image' onClick={ onPlay } style={ { backgroundImage: `url(${albumImage})` } } >
                <Icon name='play circle outline' />
            </div>
            <div className='songs-slider__list-item-info'>
                <Link to={ `/album/${album?.id}` }>
                    <h3>{ song.name }</h3>
                </Link>
            </div>
        </div>
    )
}

export default SongsSlider
