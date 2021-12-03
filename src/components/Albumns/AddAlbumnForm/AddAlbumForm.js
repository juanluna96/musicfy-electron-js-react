import React, { useState, useEffect, useCallback } from 'react'
import { Form, Input, Button, Image, Dropdown } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { genders } from '../../../constantes';

import './AddAlbumForm.scss';

const AddAlbumForm = () => {
    const [albumImage, setAlbumImage] = useState(null);
    const [file, setFile] = useState(null);

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
                    <Input placeholder="Album Name" />
                    <Dropdown placeholder='Genre' fluid search selection options={ genders } />
                </Form.Field>
            </Form.Group>
            <Button type='submit'>Submit</Button>
        </Form>
    )
}

export default AddAlbumForm
