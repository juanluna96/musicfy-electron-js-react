import React from 'react'
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
    const onSubmit = async (e) => {
        e.preventDefault()
        const { displayName } = e.target
        const user = firebaseApp.auth().currentUser
        try {
            await user.updateProfile({ displayName: displayName.value })
            setModalOpen(false)
            toast.success('Nombre actualizado')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <Form onSubmit={ onSubmit }>
            <Form.Field>
                <Input
                    placeholder='Nombre'
                    value={ username }
                    onChange={ (e) => {
                        setModalOpen(true)
                        setModalOpen(true)
                    } }
                />
            </Form.Field>
            <Button type='submit'>Actualizar</Button>
        </Form>
    )
}

export default UserName
