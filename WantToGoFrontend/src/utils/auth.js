import firebase from 'firebase/app';
import 'firebase/auth';

const signIn = async () => {
  const provider = new firebase.auth.EmailAuthProvider();
  await firebase.auth().signInWithEmailAndPassword('test@test.com', 'test123');
};

const signOut = () => {
  firebase.auth().signOut();
};

export { signIn, signOut };
