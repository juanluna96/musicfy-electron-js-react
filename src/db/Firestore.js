import FirebaseApp from './Firebase';
import 'firebase/compat/firestore'

const db = FirebaseApp.firestore();

const isUserAdmin = async (uid) => {
    const admin = await db.collection('admins').doc(uid).get();
    return admin.exists;
}

export {
    isUserAdmin
}