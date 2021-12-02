import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';

import firebase from '../../db/Firebase';
import 'firebase/compat/firestore';

import './Artists.scss';

const db = firebase.firestore(firebase);

const Artists = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        db.collection('artists')
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        ...doc.data()
                    }
                ));
                setArtists(data);
            });
    }, []);

    return (
        <div className="artists">
            {
                artists.map(artist => (
                    <Artist key={ artist.id } artist={ artist } />
                ))
            }
        </div>
    )
}

const Artist = ({ artist }) => {
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const bannerRef = storageRef.child(`artists/${artist.banner}`);

        bannerRef.getDownloadURL().then(url => {
            setBanner(url);
        });
    }, [artist]);

    return (
        <div className="artist">
            <h2>{ artist.name }</h2>
            <p>{ artist.description }</p>
        </div>
    )
}

export default Artists
