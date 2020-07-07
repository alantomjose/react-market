import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyAyKgPAaVpS1DHKrxfbWeiqKPif6ABO564",
    authDomain: "spacenos-app.firebaseapp.com",
    databaseURL: "https://spacenos-app.firebaseio.com",
    projectId: "spacenos-app",
    storageBucket: "spacenos-app.appspot.com",
    messagingSenderId: "960691631503",
    appId: "1:960691631503:web:860b1d7c3ed0a23a2b87fa",
    measurementId: "G-4NNRG956VK"
  };
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();