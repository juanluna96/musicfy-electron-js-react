import React, { useState, useEffect, useCallback } from 'react'
import { Form, Input, Button, Image, Dropdown } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { genders } from '../../../constantes';
import firebase from '../../../db/Firebase';
import 'firebase/compat/firestore';

import './AddAlbumForm.scss';

const db = firebase.firestore();

const AddAlbumForm = () => {
    const [albumImage, setAlbumImage] = useState(null);
    const [file, setFile] = useState(null);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const artistsRef = db.collection('artists');
        const unsubscribe = artistsRef.onSnapshot((snapshot) => {
            const artists = snapshot.docs.map(doc => (
                {
                    key: doc.id,
                    text: doc.data().name,
                    value: doc.data().name,
                }
            ));
            console.log(artists)
            setArtists(artists);
        });
        return () => unsubscribe();
    }, []);

    const onSubmit = () => {
        return
    }

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
                    <Input placeholder="Nombre del album" name="nombre" />
                    <Dropdown placeholder='Artista' name="artista" lazyload fluid search selection options={ artists } />
                    <Dropdown placeholder='Genero' name="genero" lazyload fluid search selection options={ genders } />
                </Form.Field>
            </Form.Group>
            <Button type='submit'>Submit</Button>
        </Form>
    )
}

export default AddAlbumForm
