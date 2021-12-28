import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Form, Input, Button, Icon, Dropdown, Label, Grid } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

import firebase from '../../../db/Firebase';

import './AddSongForm.scss';

const db = firebase.firestore();

const defaultFormSong = {
    name: '',
    album: ''
};

const AddSongForm = ({ setShowModal, setUpdateSong }) => {

    const [albums, setAlbums] = useState([]);
    const [formData, setFormData] = useState(defaultFormSong);
    const [loading, setLoading] = useState(false);
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
        // Validate the form of new album
        if (formData.name === '' || formData.album === '') {
            toast.warning('El nombre de la cancion y el album al que pertenecen son obligatorios');
            return;
        }

        if (!file) {
            toast.warning('La cancion es obligatoria');
            return;
        }

        setLoading(true);

        // Save the song in the database and update the file
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`songs/${uuid()}`);

        fileRef.put(file).then(() => {
            fileRef.getDownloadURL().then(url => {
                db.collection('songs').add({
                    name: formData.name,
                    album: formData.album,
                    createdAt: new Date(),
                    url
                }).then(() => {
                    toast.success('Cancion agregada correctamente');
                    resetStates();
                }).catch(() => {
                    toast.error('Error al agregar la cancion');
                }).finally(() => {
                    setLoading(false);
                });
            });
        });
    }

    const resetStates = () => {
        setFormData(defaultFormSong);
        setFile(null);
        setUpdateSong(prevState => !prevState);
        setShowModal(false);
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
            <Button type='submit' content='Agregar cancion' loading={ loading } />
        </Form>
    )
}

export default AddSongForm
