import React, { useState } from 'react'
import { Button, Form, Icon, Input } from 'semantic-ui-react'
import { toast } from 'react-toastify';
import { reAuthenticate } from '../../../db/Firestore';
import firebase from '../../../db/Firebase';
import alertErrors from '../../../helpers/AlertsFirebase';

const UserPassword = ({ user, setModalOpen, setTitleModal, setContentModal }) => {
    const onEdit = () => {
        const formComponent = <ChangePasswordForm setModalOpen={ setModalOpen } />
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

const FormDataEmpty = {
    password: '',
    newPassword: '',
    confirmPassword: ''
}

const ChangePasswordForm = ({ setModalOpen }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(FormDataEmpty)

    const [passwordType, setPasswordType] = useState({
        password: true,
        newPassword: true,
        confirmPassword: true
    })

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.newPassword || !formData.password || !formData.confirmPassword) {
            setLoading(false);
            toast.warning('Todos los campos son obligatorios')
            return
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setLoading(false);
            toast.warning('Las contraseñas no coinciden')
            return
        }

        if (formData.password === formData.newPassword) {
            setLoading(false);
            toast.warning('La nueva contraseña no puede ser igual a la actual')
            return
        }

        if (formData.newPassword.length < 6) {
            setLoading(false);
            toast.warning('La nueva contraseña debe tener al menos 6 caracteres')
            return
        }

        reAuthenticate(formData.password).then(() => {
            const user = firebase.auth().currentUser;
            user.updatePassword(formData.newPassword).then(() => {
                setLoading(false);
                setModalOpen(false);
                firebase.auth().signOut();
                toast.success('Contraseña actualizada')
            }).catch((err) => {
                setLoading(false);
                alertErrors(err?.code)
            })
        }).catch((err) => {
            setLoading(false);
            alertErrors(err?.code)
        })
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
            <Button type='submit' loading={ loading }>Cambiar contraseña</Button>
        </Form>
    )
}

export default UserPassword
