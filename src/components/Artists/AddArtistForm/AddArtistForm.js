import React, { useState, useCallback } from 'react';
import { Form, Input, Button, Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import './AddArtistForm.scss';

const emptyFormData = {
    name: '',
}

const AddArtistForm = ({ setShowModal }) => {
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
