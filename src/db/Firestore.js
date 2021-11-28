import FirebaseApp from './Firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = FirebaseApp.firestore();

const isUserAdmin = async (uid) => {
    const admin = await db.collection('admins').doc(uid).get();
    return admin.exists;
}

const reAuthenticate = (password) => {
    const user = FirebaseApp.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(credential);
}

export {
    isUserAdmin,
    reAuthenticate
}