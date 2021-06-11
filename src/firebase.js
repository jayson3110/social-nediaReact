import firebase from "firebase"; 


const firebaseConfig = {
    apiKey: "AIzaSyANHbp9_IMyx8RXwUSQaZIgIUeleIV4HRI",
    authDomain: "scoialmedia-698b6.firebaseapp.com",
    projectId: "scoialmedia-698b6",
    storageBucket: "scoialmedia-698b6.appspot.com",
    messagingSenderId: "1071129779701",
    appId: "1:1071129779701:web:51410c070df9be215914bc",
    measurementId: "G-2XK0SN5E2F"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();


export {db, auth, provider, storage};
