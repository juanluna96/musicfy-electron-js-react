import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Icon, Dropdown, Label } from 'semantic-ui-react';
import firebase from '../../../db/Firebase';

import './AddSongForm.scss';

const db = firebase.firestore();

const AddSongForm = ({ setShowModal }) => {

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        db.collection('albums').get().then(snapshot => {
            const albums = [];
            snapshot.forEach(doc => {
                albums.push({
                    key: doc.id,
                    value: doc.id,
                    text: doc.data().name
                })
            })
            setAlbums(albums);
        })
    }, [])

    const onSubmit = () => {
        console.log('Submit');
    }

    return (
        <Form className="add-song-form" onSubmit={ onSubmit }>
            <Form.Field>
                <Input placeholder='Nombre de la cancion' />
            </Form.Field>
            <Form.Field>
                <Dropdown placeholder='Asigna la cancion a un album' noResultsMessage="No se encontraron albums" search lazyload fluid selection options={ albums } />
            </Form.Field>
            <Form.Field>
                <Label>Subir cancion dropzone</Label>
            </Form.Field>
            <Button type='submit' content='Agregar cancion' />
        </Form>
    )
}

export default AddSongForm
