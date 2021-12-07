import React, { useState, useEffect, useCallback } from 'react'
import { Form, Input, Button, Image, Dropdown } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

import { genders } from '../../../constantes';
import firebaseApp from '../../../db/Firebase';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import './AddAlbumForm.scss';

const db = firebaseApp.firestore();

const defaultAlbumForm = {
    name: '',
    artist: '',
    gender: ''
}

const AddAlbumForm = () => {
    const [albumImage, setAlbumImage] = useState(null);
    const [file, setFile] = useState(null);
    const [artists, setArtists] = useState([]);
    const [formData, setFormData] = useState(defaultAlbumForm);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const artistsRef = db.collection('artists');
        const unsubscribe = artistsRef.onSnapshot((snapshot) => {
            const artists = snapshot.docs.map(doc => (
                {
                    key: doc.id,
                    text: doc.data().name,
                    value: doc.id,
                }
            ));
            setArtists(artists);
        });
        return () => unsubscribe();
    }, []);


    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setFile(file);
        setAlbumImage(URL.createObjectURL(file));
    })

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        noKeyboard: true,
        onDrop,
    })

    const onChange = (e, data) => {
        setFormData({ ...formData, [data.name]: data.value });
    }

    const uploadImage = (fileName) => {
        const storageRef = firebaseApp.storage().ref();
        const imageRef = storageRef.child(`albums/${fileName}`);
        const snapshot = imageRef.put(file);
        return snapshot;
    }

    const onSubmit = () => {
        setLoading(true);
        if (!formData.name || !formData.artist || !formData.gender || !file) {
            toast.warning('Todos los campos son obligatorios.');
            setLoading(false);
            return;
        }

        const fileName = uuid();
        uploadImage(fileName).then(() => {
            const albumRef = db.collection('albums').doc();
            const albumData = {
                name: formData.name,
                artist: formData.artist,
                gender: formData.gender
            }
            albumRef.set(albumData);
            const artistRef = db.collection('artists').doc(formData.artist);
            artistRef.update({
                albums: firebase.firestore.FieldValue.arrayUnion(albumRef.id)
            });
            setFormData(defaultAlbumForm);
            setAlbumImage(null);
            setFile(null);
            setLoading(false);
            toast.success('Album agregado correctamente.');
        }).catch((error) => {
            console.log(error)
            toast.error('Error al subir la imagen.');
            setLoading(false);
        });



    }

    return (
        <Form className="add-album-form" onSubmit={ onSubmit }>
            <Form.Group>
                <Form.Field className="album-avatar" width={ 5 }>
                    <div
                        { ...getRootProps() }
                        className="avatar"
                        style={ { backgroundImage: `url(${albumImage})` } }
                    >
                        <input { ...getInputProps() } />
                        {
                            !albumImage &&
                            <Image src={ process.env.PUBLIC_URL + '/img/no-image.png' } />
                        }
                    </div>
                </Form.Field>
                <Form.Field className="album-inputs" width={ 11 }>
                    <Input placeholder="Nombre del album" name="name" onChange={ onChange } />
                    <Dropdown type="dropdown" placeholder='Artista' name="artist" onChange={ onChange } lazyload fluid search selection options={ artists } />
                    <Dropdown type="dropdown" placeholder='Genero' name="gender" onChange={ onChange } lazyload fluid search selection options={ genders } />
                </Form.Field>
            </Form.Group>
            <Button type='submit' loading={ loading }>Submit</Button>
        </Form>
    )
}

export default AddAlbumForm
