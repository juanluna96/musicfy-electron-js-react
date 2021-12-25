import React from 'react'
import { Form, Input, Button, Icon, Dropdown, Label } from 'semantic-ui-react';

import './AddSongForm.scss';

const AddSongForm = ({ showModal }) => {

    const albums = [
        { key: 'af', value: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', text: 'Aland Islands' },
        { key: 'al', value: 'al', text: 'Albania' }
    ]

    const onSubmit = () => {
        console.log('Submit');
    }

    return (
        <Form className="add-song-form" onSubmit={ onSubmit }>
            <Form.Field>
                <Input placeholder='Nombre de la cancion' />
            </Form.Field>
            <Form.Field>
                <Dropdown placeholder='Asigna la cancion a un album' search lazyload fluid selection options={ albums } />
            </Form.Field>
            <Form.Field>
                <Label>Subir cancion dropzone</Label>
            </Form.Field>
            <Button type='submit' content='Agregar cancion' />
        </Form>
    )
}

export default AddSongForm
