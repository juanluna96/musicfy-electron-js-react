import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BannerArtist from './BannerArtist';
import AlbumByArtist from './AlbumByArtist';
import firebase from '../../db/Firebase'
import 'firebase/compat/firestore';

import './Artist.scss';

const db = firebase.firestore(firebase);

const Artist = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        db.collection('artists').doc(id).get().then(doc => {
            console.log(doc.data());
            setArtist(doc.data());
        })
    }, [id]);

    return (
        <div className="artist">
            {
                artist &&
                <>
                    <BannerArtist artist={ artist } />
                    {
                        artist.albums?.map(album => {
                            return <AlbumByArtist albumId={ album } key={ album } />
                        })
                    }
                </>
            }
            <h2>Mas informacion...</h2>
        </div>
    )
}

export default Artist
