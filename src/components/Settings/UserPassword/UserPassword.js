import React, { useState } from 'react'
import { Button, Form, Icon, Input } from 'semantic-ui-react'
import { toast } from 'react-toastify';

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
    const [loading, setLoading] = useState(false);
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

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.newPassword || !formData.password || !formData.confirmPassword) {
            toast.warning('Todos los campos son obligatorios')
            return
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.warning('Las contraseñas no coinciden')
            return
        }

        if (formData.password === formData.newPassword) {
            toast.warning('La nueva contraseña no puede ser igual a la actual')
            return
        }

        if (formData.newPassword.length < 6) {
            toast.warning('La nueva contraseña debe tener al menos 6 caracteres')
            return
        }

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
