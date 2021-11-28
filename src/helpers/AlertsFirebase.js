import { toast } from 'react-toastify';

const alertErrors = (type) => {
    switch (type) {
        case 'auth/wrong-password':
            toast.error('La contraseña introducida no es correcta.');
            break;
        case 'auth/email-already-in-use':
            toast.error('El correo electrónico introducido ya está en uso.');
            break;
        default:
            toast.warning('Ha ocurrido un error en el servidor, intentelo mas tarde.');
            break;
    }
}

export default alertErrors;