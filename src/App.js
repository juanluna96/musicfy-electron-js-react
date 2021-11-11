import './App.scss';
import firebase from './db/Firebase';
import 'firebase/compat/auth';

function App() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
    } else {
      console.log('not logged in');
    }
  })
  return (
    <div className="App-header">
      <h1>App electron + react</h1>
    </div>
  );
}

export default App;
