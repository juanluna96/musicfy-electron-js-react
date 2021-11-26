import React from 'react'
import { toast } from 'react-toastify';
import { Form, Icon, Input, Button } from 'semantic-ui-react'
import firebaseApp from '../../../db/Firebase';
import 'firebase/compat/auth'

const modalEditName = {
    title: 'Editar nombre',
    content: (
        <Form>
            <Form.Field>
                <Input icon='user' iconPosition='left' placeholder='Nombre' />
            </Form.Field>
        </Form>
    )
}

const UserName = ({ user, setModalOpen, setTitleModal, setContentModal }) => {
    const onEdit = () => {
        setTitleModal(modalEditName.title)
        setContentModal(modalEditName.content)
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

export default UserName
