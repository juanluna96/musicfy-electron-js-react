import React from 'react'
import { Button } from 'semantic-ui-react'

const UserPassword = () => {
    const onEdit = () => {
        console.log('Editar contraseña')
    }

    return (
        <div className="user-password">
            <h3>Contraseña: **** **** ***</h3>
            <Button circular onClick={ onEdit }>Editar</Button>
        </div>
    )
}

export default UserPassword
