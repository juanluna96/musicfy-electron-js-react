import React from 'react'
import { Form, Button } from 'semantic-ui-react';

const UserEmail = ({ user, setModalOpen, setTitleModal, setContentModal }) => {

    const onEditEmail = () => {
        const emailComponent = <EmailForm />
        setModalOpen(true)
        setTitleModal('Editar correo electrónico')
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

const EmailForm = () => {
    return (
        <Form>
            <Form.Field>
                <input placeholder='Correo electrónico' />
            </Form.Field>
            <Button type='submit'>Actualizar</Button>
        </Form>
    )
}

export default UserEmail
