import React from 'react'
import { Form, Input, Button, Image, Dropdown } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'

import './AddAlbumForm.scss';

const AddAlbumForm = () => {

    const onSubmit = () => {
        return
    }

    const onDrop = () => {
        return
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop,
    })

    return (
        <Form className="add-album-form" onSubmit={ onSubmit }>
            <Form.Group>
                <Form.Field className="album-avatar" width={ 5 }>
                    <h2>AVATAR</h2>
                </Form.Field>
                <Form.Field className="album-inputs" width={ 11 }>
                    <Input placeholder="Album Name" />
                    <Dropdown placeholder='Genre' fluid search selection options={ [
                        { key: '1', text: 'Rock', value: 'Rock' },
                        { key: '2', text: 'Pop', value: 'Pop' },
                        { key: '3', text: 'Jazz', value: 'Jazz' },
                        { key: '4', text: 'Country', value: 'Country' },
                        { key: '5', text: 'Hip Hop', value: 'Hip Hop' },
                        { key: '6', text: 'Electronic', value: 'Electronic' },
                        { key: '7', text: 'Folk', value: 'Folk' },
                        { key: '8', text: 'Classical', value: 'Classical' },
                        { key: '9', text: 'Blues', value: 'Blues' },
                        { key: '10', text: 'Reggae', value: 'Reggae' },
                        { key: '11', text: 'Other', value: 'Other' },
                    ] } />
                </Form.Field>
            </Form.Group>
            <Button type='submit'>Submit</Button>
        </Form>
    )
}

export default AddAlbumForm
