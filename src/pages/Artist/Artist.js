import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BannerArtist from './BannerArtist';
import firebase from '../../db/Firebase'
import BasicSliderItems from '../../components/Sliders/BasicSliderItems';
import 'firebase/compat/firestore';

import './Artist.scss';
import SongsSlider from '../../components/Songs/SongsSlider';

const db = firebase.firestore(firebase);

const Artist = ({ playerSong }) => {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([])

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

    // Get songs of the artist
    useEffect(() => {
        const arraySongs = [];
        (async () => {
            await Promise.all(albums.map(async album => {
                const songs = await db.collection('songs').where('album', '==', album.id).get();
                songs.forEach(song => {
                    arraySongs.push({
                        id: song.id,
                        ...song.data()
                    })
                })
            }))
            setSongs(arraySongs);
        })();
    }, [albums]);

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
                        <SongsSlider title={ `Canciones de ${artist?.name}` } data={ songs } playerSong={ playerSong } />
                    </div>
                </>
            }
        </div>
    )
}

export default Artist
