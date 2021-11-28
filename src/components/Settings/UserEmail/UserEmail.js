import React, { useState } from 'react'
import { Form, Button, Input, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { reAuthenticate } from '../../../db/Firestore';

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
    const [passwordType, setPasswordType] = useState(true);
    const [loading, setLoading] = useState(false);
    const [FormData, setFormData] = useState({
        email: user.email,
        password: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (!FormData.email || !FormData.password) {
            setModalOpen(false);
            setLoading(false);
            toast.warning('Todos los campos son obligatorios');
            return;
        }

        if (FormData.email === user.email) {
            setModalOpen(false);
            setLoading(false);
            toast.warning('El correo electrónico no puede ser el mismo');
            return;
        }

        reAuthenticate(FormData.password).then(() => {
            user.updateEmail(FormData.email).then(() => {
                setModalOpen(false);
                setLoading(false);
                toast.success('Correo electrónico actualizado');
            }).catch(() => {
                setModalOpen(false);
                setLoading(false);
                toast.error('Error al actualizar correo electrónico');
            })
        }).catch(() => {
            setModalOpen(false);
            setLoading(false);
            toast.error('Contraseña incorrecta');
        })
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
                <Input value={ FormData.email } name="email" placeholder='Correo electrónico' />
            </Form.Field>
            <Form.Field>
                <Input value={ FormData.password } name="password" placeholder='Contraseña' type={ passwordType ? 'password' : 'text' }
                    icon={
                        <Icon name={ passwordType ? 'eye' : 'eye slash outline' } onClick={ onChangePasswordType } link />
                    }
                />
            </Form.Field>
            <Button type='submit' loading={ loading }>Actualizar</Button>
        </Form>
    )
}

export default UserEmail
