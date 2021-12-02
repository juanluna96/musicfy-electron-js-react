import React, { useEffect, useState } from 'react';

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
            <h1>Artists</h1>
        </div>
    )
}

export default Artists
