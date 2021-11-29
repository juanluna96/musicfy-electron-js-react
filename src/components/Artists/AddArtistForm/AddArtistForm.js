import React from 'react';
import { Form, Input, Button, Image } from 'semantic-ui-react';

import './AddArtistForm.scss';

const AddArtistForm = () => {


    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Form className="add-artist-form" onSubmit={ onSubmit }>
            <Form.Field className="artist-banner">
                <input type="file" />
            </Form.Field>
            <Form.Field className="artist-banner">
                <div>Avatar</div>
            </Form.Field>
            <Form.Field className="artist-banner">
                <Input placeholder='Artist Name' />
            </Form.Field>
            <Button type='submit'>Crear artista</Button>
        </Form>
    )
}

export default AddArtistForm
