import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BannerArtist from './BannerArtist';
import firebase from '../../db/Firebase'
import BasicSliderItems from '../../components/Sliders/BasicSliderItems';
import 'firebase/compat/firestore';

import './Artist.scss';

const db = firebase.firestore(firebase);

const Artist = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        db.collection('artists').doc(id).get().then(doc => {
            setArtist(doc.data());
        })
    }, [id]);

    // Get albums of the artist
    useEffect(() => {
        if (artist) {
            db.collection('albums').where('artist', '==', id).get().then(snapshot => {
                const albums = snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });
                setAlbums(albums);
            })
        }
    }, [artist]);

    return (
        <div className="artist">
            {
                artist &&
                <>
                    <BannerArtist artist={ artist } />
                    <div className="artist__content">
                        <BasicSliderItems
                            title={ `Albumes de ${artist.name}` }
                            list={ albums }
                            folder="albums"
                            path="album"
                        />
                    </div>
                </>
            }
            <h2>Mas informacion...</h2>
        </div>
    )
}

export default Artist
