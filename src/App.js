import { useState } from 'react';

import './App.scss';
import firebase from './db/Firebase';
import 'firebase/compat/auth';
import Userlogged from './components/Usuarios/UserLogged';
import Auth from './components/Auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  firebase.auth().onAuthStateChanged((currentUser) => {

    if (!currentUser) {
      setUser(null)
    } else {
      setUser(currentUser)
    }

    setLoading(false);
  });

  if (loading) {
    return null;
  }

  return (
    !user
      ? <Auth />
      : <Userlogged />
  );
}

export default App;
