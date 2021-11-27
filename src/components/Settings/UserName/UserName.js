import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Form, Icon, Input, Button } from 'semantic-ui-react'
import firebaseApp from '../../../db/Firebase';
import 'firebase/compat/auth'

const modalEditName = {
    title: 'Editar nombre'
}

const UserName = ({ user, setModalOpen, setTitleModal, setContentModal }) => {

    const onEdit = () => {
        const formComponent = <ChangeDisplayNameForm username={ user.displayName } setModalOpen={ setModalOpen } />
        setTitleModal(modalEditName.title)
        setContentModal(formComponent);
        setModalOpen(true)
    }

    return (
        <div className="user-name">
            <h2>{ user.displayName }</h2>
            <Button cicular onClick={ onEdit }>
                <Icon name="pencil alternate" />
                Actualizar
            </Button>
        </div>
    )
}

const ChangeDisplayNameForm = ({ username, setModalOpen }) => {
    const [formData, setFormData] = useState({ displayName: username });
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.displayName === '') {
            setModalOpen(false);
            toast.error('El nombre no puede estar vacío');
            return;
        }

        try {
            await firebaseApp.auth().currentUser.updateProfile({ displayName: formData.displayName });
            setModalOpen(false);
            toast.success('Nombre actualizado');
        } catch (error) {
            setModalOpen(false);
            toast.error(error.message);
        }

        setLoading(false);
    }

    return (
        <Form onSubmit={ onSubmit } >
            <Form.Field>
                <Input
                    placeholder='Nombre'
                    value={ username }
                    onChange={ (e) => {
                        setFormData({ ...formData, displayName: e.target.value })
                    } }
                />
            </Form.Field>
            <Button type='submit' loading={ loading }>Actualizar</Button>
        </Form >
    )
}

export default UserName
