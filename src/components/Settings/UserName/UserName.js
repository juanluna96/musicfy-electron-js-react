import React from 'react'
import { toast } from 'react-toastify';
import { Form, Icon, Input, Button } from 'semantic-ui-react'
import firebaseApp from '../../../db/Firebase';
import 'firebase/compat/auth'

const UserName = ({ user }) => {
    const onEdit = () => {

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
