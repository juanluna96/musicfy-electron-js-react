import React, { useState } from 'react'
import { Button, Form, Icon, Input } from 'semantic-ui-react'

const UserPassword = ({ user, setModalOpen, setTitleModal, setContentModal }) => {
    const onEdit = () => {
        const formComponent = <ChangePasswordForm />
        setModalOpen(true)
        setTitleModal('Cambiar contraseña')
        setContentModal(formComponent)
    }

    return (
        <div className="user-password">
            <h3>Contraseña: **** **** ***</h3>
            <Button circular onClick={ onEdit }>Editar</Button>
        </div>
    )
}

const ChangePasswordForm = () => {
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [passwordType, setPasswordType] = useState({
        password: true,
        newPassword: true,
        confirmPassword: true
    })

    const onSubmit = () => {
        console.log(formData)
    }


    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const changePasswordType = (field) => {
        setPasswordType({
            ...passwordType,
            [field]: !passwordType[field]
        })
    }
    return (
        <Form onSubmit={ onSubmit } onChange={ onChange }>
            <Form.Field>
                <Input type={ passwordType.password ? 'password' : 'text' } name="password" placeholder='Contraseña actual' icon={
                    <Icon name={ passwordType.password ? 'eye' : 'eye slash outline' } link onClick={
                        () => changePasswordType('password')
                    } />
                } />
            </Form.Field>
            <Form.Field>
                <Input type={ passwordType.newPassword ? 'password' : 'text' } name="newPassword" placeholder='Nueva contraseña' icon={
                    <Icon name={ passwordType.newPassword ? 'eye' : 'eye slash outline' } link onClick={
                        () => changePasswordType('newPassword')
                    } />
                } />
            </Form.Field>
            <Form.Field>
                <Input type={ passwordType.confirmPassword ? 'password' : 'text' } name="confirmPassword" placeholder='Repetir nueva contraseña' icon={
                    <Icon name={ passwordType.confirmPassword ? 'eye' : 'eye slash outline' } link onClick={
                        () => changePasswordType('confirmPassword')
                    } />
                } />
            </Form.Field>
            <Button type='submit'>Cambiar contraseña</Button>
        </Form>
    )
}

export default UserPassword
