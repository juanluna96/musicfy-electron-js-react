import React, { useState } from 'react'
import { Form, Button, Input } from 'semantic-ui-react';

const UserEmail = ({ user, setModalOpen, setTitleModal, setContentModal }) => {

    const onEditEmail = () => {
        const emailComponent = <EmailForm user={ user } setModalOpen={ setModalOpen } />
        setModalOpen(true)
        setTitleModal('Editar correo electrónico y contraseña')
        setContentModal(emailComponent)
    }

    return (
        <div className="user-email">
            <h3>Email: { user.email }</h3>
            <Button circular onClick={ onEditEmail }>
                Actualizar
            </Button>
        </div>
    )
}

const EmailForm = ({ user, setModalOpen }) => {
    const [FormData, setFormData] = useState({
        email: user.email,
        password: ''
    });

    const onSubmit = (e) => {
        e.preventDefault()


    }

    const onChange = (e) => {
        setFormData({
            ...FormData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Form onSubmit={ onSubmit } onChange={ onChange }>
            <Form.Field>
                <Input value={ Form.email } name="email" placeholder='Correo electrónico' />
            </Form.Field>
            <Form.Field>
                <Input value={ Form.password } name="password" placeholder='Contraseña' type='password' />
            </Form.Field>
            <Button type='submit'>Actualizar</Button>
        </Form>
    )
}

export default UserEmail
