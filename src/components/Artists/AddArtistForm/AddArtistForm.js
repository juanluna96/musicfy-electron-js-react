import React, { useState, useCallback } from 'react';
import { Form, Input, Button, Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';

import './AddArtistForm.scss';

const AddArtistForm = ({ setShowModal }) => {
    const [banner, setBanner] = useState(null);
    const [file, setFile] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        setBanner(URL.createObjectURL(acceptedFiles[0]));
        setFile(acceptedFiles[0]);
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
                <div { ...getRootProps() } className="banner">
                    <input { ...getInputProps() } />
                    {
                        isDragActive ?
                            <p>Arrastra la imagen aquí</p> :
                            <p>Arrastra la imagen o haz click para seleccionarla</p>
                    }
                </div>
                {
                    banner &&
                    <Image src={ banner } />
                }
            </Form.Field>
            <Form.Field>
                <div>Avatar</div>
            </Form.Field>
            <Form.Field>
                <Input placeholder='Artist Name' />
            </Form.Field>
            <Button type='submit'>Crear artista</Button>
        </Form>
    )
}

export default AddArtistForm
