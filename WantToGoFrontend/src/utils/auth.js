import firebase from "firebase/app";
import "firebase/auth";
import { UserApi } from "../api/userApi";

const signIn = async ({ email, password }) => {
  await firebase.auth().signInWithEmailAndPassword(email, password);
};

const register = async ({ firstName, lastName, dob, email, password }) => {
  const fbUser = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  await UserApi.createNewUser({
    firstName,
    lastName,
    dob,
    firebaseUid: fbUser.user.uid,
    isAdmin: false,
  }, fbUser.user.ya);
  await firebase.auth().signOut();
};

const forgotPassword = async (email) => {
  await firebase
    .auth()
    .sendPasswordResetEmail(email)
    .catch(() => null);
};

const signOut = () => {
  firebase.auth().signOut();
};

export { signIn, register, forgotPassword, signOut };
