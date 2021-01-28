import initFirebase from "./initFirebase";
import firebase from "firebase/app";

initFirebase();

const getFirestoreCollection = (name: string) =>
  firebase.firestore().collection(name);

export default getFirestoreCollection;
