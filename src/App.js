import { useState } from 'react';

import firebase from './db/Firebase';
import 'firebase/compat/auth';
import Userlogged from './components/Usuarios/UserLogged';
import Auth from './components/Auth';
import { ToastContainer } from 'react-toastify';
import Loggedlayout from './layouts/LoggedLayout/LoggedLayout';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  firebase.auth().onAuthStateChanged((currentUser) => {
    if (!currentUser || !currentUser?.emailVerified) {
      firebase.auth().signOut();
      setUser(null);
    } else {
      setUser(currentUser);
    }

    setLoading(false);
  });


  if (loading) {
    return null;
  }

  return (
    <>
      { !user ? <Auth /> : <Loggedlayout user={ user } /> }
      <ToastContainer
        position="top-center"
        autoClose={ 9999999999 }
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss
        pauseOnVisibilityChange
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
