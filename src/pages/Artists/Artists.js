import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
        <Grid>
            <Grid.Row className="artists">
                <Grid.Column width={ 16 }>
                    <h1>Artistas</h1>
                </Grid.Column>
                {
                    artists.map(artist => (
                        <Grid.Column key={ artist.id } mobile={ 8 } tablet={ 4 } computer={ 3 }>
                            <Artist artist={ artist } />
                        </Grid.Column>
                    ))
                }
            </Grid.Row>
        </Grid>
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
        <Link to={ `/artist/${artist.id}` }>
            <div className="artists__item">
                <div className="avatar" style={ { backgroundImage: `url(${banner})` } } />
                <h3>{ artist.name }</h3>
            </div>
        </Link>
    )
}

export default Artists
