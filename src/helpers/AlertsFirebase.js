import { toast } from 'react-toastify';

const alertErrors = (type) => {
    console.log(type)
    switch (type) {
        case 'auth/wrong-password':
            toast.error('La contraseña introducida no es correcta.');
            break;
        default:
            toast.warning('Ha ocurrido un error en el servidor, intentelo mas tarde.');
            break;
    }
}

export default alertErrors;