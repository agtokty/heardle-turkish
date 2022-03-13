import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "heardleturkish.firebaseapp.com",
    databaseURL: "https://heardleturkish-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "heardleturkish",
    storageBucket: "heardleturkish.appspot.com",
    messagingSenderId: "910815340133",
    appId: "1:910815340133:web:864454cc6382cf93c0488c"
}

const app = initializeApp(firebaseConfig);

export default app;