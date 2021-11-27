import React, { useState } from 'react'
import { Form, Button, Input, Icon } from 'semantic-ui-react';

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
    const [passwordType, setPasswordType] = useState(true);

    const onSubmit = (e) => {
        e.preventDefault()
    }

    const onChange = (e) => {
        setFormData({
            ...FormData,
            [e.target.name]: e.target.value
        })
    }

    const onChangePasswordType = () => {
        setPasswordType(!passwordType)
    }

    return (
        <Form onSubmit={ onSubmit } onChange={ onChange }>
            <Form.Field>
                <Input value={ Form.email } name="email" placeholder='Correo electrónico' />
            </Form.Field>
            <Form.Field>
                <Input value={ Form.password } name="password" placeholder='Contraseña' type={ passwordType ? 'password' : 'text' }
                    icon={
                        <Icon name={ passwordType ? 'eye' : 'eye slash outline' } onClick={ onChangePasswordType } link />
                    }
                />
            </Form.Field>
            <Button type='submit'>Actualizar</Button>
        </Form>
    )
}

export default UserEmail
