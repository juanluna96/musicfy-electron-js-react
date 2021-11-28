import { useState } from 'react';

import firebase from './db/Firebase';
import 'firebase/compat/auth';
import Auth from './components/Auth';
import { ToastContainer } from 'react-toastify';
import Loggedlayout from './layouts/LoggedLayout/LoggedLayout';
import TitleBarComponent from './layouts/TitleBarComponent/TitleBarComponent';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reloadApp, setReloadApp] = useState(false);

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
      {/* <TitleBarComponent /> */ }
      { !user ? <Auth /> : <Loggedlayout setReloadApp={ setReloadApp } user={ user } /> }
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
