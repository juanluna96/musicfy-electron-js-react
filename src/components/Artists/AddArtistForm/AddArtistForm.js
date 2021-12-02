import React, { useState, useCallback } from 'react';
import { Form, Input, Button, Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import firebase from "../../../db/Firebase";
import "firebase/compat/storage";

import './AddArtistForm.scss';
import alertErrors from '../../../helpers/AlertsFirebase';

const emptyFormData = {
    name: '',
}

const AddArtistForm = ({ setShowModal, setReloadApp }) => {
    const noImage = process.env.PUBLIC_URL + '/img/no-image.png';
    const [formData, setFormData] = useState(emptyFormData);
    const [banner, setBanner] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0]);
        setBanner(URL.createObjectURL(acceptedFiles[0]));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        noKeyboard: true,
        onDrop
    });

    const onChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const uploadImage = fileId => {
        const ref = firebase.storage().ref(`/artists/${fileId}`);
        const task = ref.put(file);
        return task;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.name) {
            setLoading(false);
            toast.warning('Porfavor ingresa el nombre del artista');
            return;
        }

        if (!file) {
            setLoading(false);
            toast.warning('Añade la imagen del artista')
            return
        }

        const fileId = uuid();
        uploadImage(fileId).then(() => {
            const db = firebase.firestore();
            db.collection('artists').add({
                id: uuid(),
                name: formData.name,
                banner: fileId,
                createdAt: new Date()
            }).then(() => {
                setFormData(emptyFormData);
                setBanner(null);
                setFile(null);
                setLoading(false);
                setShowModal(false);
                setReloadApp(prevState => !prevState);
                toast.success('Artista agregado correctamente');
            }).catch((err) => {
                setLoading(false);
                alertErrors(err?.code)
            })
        }).catch((err) => {
            setLoading(false);
            alertErrors(err?.code)
        })
    }

    return (
        <Form className="add-artist-form" onSubmit={ onSubmit }>
            <Form.Field className="artist-banner">
                <div
                    { ...getRootProps() }
                    className="banner"
                    style={ { backgroundImage: `url('${banner}')` } }
                >
                    <input { ...getInputProps() } />
                    {
                        !banner &&
                        <Image src={ noImage } />
                    }
                </div>
            </Form.Field>
            {
                banner &&
                <Form.Field className="artist-avatar">
                    <div
                        className="avatar"
                        style={ { backgroundImage: `url('${banner}')` } }
                    />
                </Form.Field>
            }
            <Form.Field>
                <Input name="name" onChange={ onChange } placeholder='Nombre del artista' />
            </Form.Field>
            <Button type='submit' loading={ loading }>Crear artista</Button>
        </Form >
    )
}

export default AddArtistForm
