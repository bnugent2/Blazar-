
import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";

// Configure Firebase.
const config = {
    apiKey: "",
    authDomain: "marshal-2f803.firebaseapp.com",
    projectId: "marshal-2f803",
    storageBucket: "marshal-2f803.appspot.com",
    messagingSenderId: "12748065664",
    appId: "1:12748065664:web:6292f43f916cce006d0f65",
    measurementId: "G-RRD2XQW2HX"
};
firebase.initializeApp(config);
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};
 

export { firebase, auth,db, signInWithGoogle};
