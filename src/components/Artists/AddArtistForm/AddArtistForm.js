import React, { useState, useCallback } from 'react';
import { Form, Input, Button, Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';

import './AddArtistForm.scss';

const AddArtistForm = ({ setShowModal }) => {
    const noImage = process.env.PUBLIC_URL + '/img/no-image.png';
    const [banner, setBanner] = useState(null);
    const [file, setFile] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0]);
        setBanner(URL.createObjectURL(acceptedFiles[0]));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        noKeyboard: true,
        onDrop
    });

    const onSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);
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
            <Form.Field class="artist-avatar">
                <div
                    className="avatar"
                    style={ { backgroundImage: `url('${banner ? banner : noImage}')` } }
                />
            </Form.Field>
            <Form.Field>
                <Input placeholder='Nombre del artista' />
            </Form.Field>
            <Button type='submit'>Crear artista</Button>
        </Form >
    )
}

export default AddArtistForm
