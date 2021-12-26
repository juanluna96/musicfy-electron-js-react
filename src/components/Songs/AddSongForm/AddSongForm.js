import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Form, Input, Button, Icon, Dropdown, Label, Grid } from 'semantic-ui-react';
import firebase from '../../../db/Firebase';

import './AddSongForm.scss';

const db = firebase.firestore();

const defaultFormSong = {
    name: '',
    banner: '',
    album: ''
};

const AddSongForm = ({ setShowModal }) => {

    const [albums, setAlbums] = useState([]);
    const [formData, setFormData] = useState(defaultFormSong);
    const [file, setFile] = useState(null);

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
    }, []);

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'audio/*',
        noKeyboard: true,
        onDrop
    });

    // Get data from form in input and dropdown
    const onChange = (e, { name, value }) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onSubmit = () => {
        console.log(formData);
    }

    return (
        <Form className="add-song-form" onSubmit={ onSubmit }>
            <Grid>
                <Grid.Column width={ 7 }>
                    <div className="song-upload" { ...getRootProps() }>
                        <input { ...getInputProps() } />
                        <Icon name={ file ? 'file audio' : 'cloud upload' } className={ file && 'loaded' } />
                        <div>
                            <p>Arrastra tu cancion o haz click <span>aquí</span>.</p>
                            {
                                file && (
                                    <p><span>{ file.name }</span></p>
                                )
                            }
                        </div>
                    </div>
                </Grid.Column>
                <Grid.Column width={ 9 }>
                    <Form.Field>
                        <Input placeholder='Nombre de la cancion' name='name' onChange={ onChange } />
                    </Form.Field>
                    <Form.Field>
                        <Dropdown name='album' placeholder='Asigna la cancion a un album' onChange={ onChange } noResultsMessage="No se encontraron albums" search lazyload fluid selection options={ albums } />
                    </Form.Field>
                </Grid.Column>
            </Grid>
            <Button type='submit' content='Agregar cancion' />
        </Form>
    )
}

export default AddSongForm
