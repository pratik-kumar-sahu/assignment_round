import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyC6aRqwXbdo7PFepwcpWFO5gWUm2Nc659Y",
  authDomain: "blog-app-4c8c6.firebaseapp.com",
  projectId: "blog-app-4c8c6",
  storageBucket: "blog-app-4c8c6.appspot.com",
  messagingSenderId: "95175666581",
  appId: "1:95175666581:web:a7ccbeff0fa3d0307be49c",
});

var invokeFirestore = firebase.firestore();
var invokeAuth = firebase.auth();
var GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
var timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { invokeFirestore, GoogleAuthProvider, invokeAuth, timestamp };
