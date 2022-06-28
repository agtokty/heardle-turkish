// import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: "heardleturkish.firebaseapp.com",
//     databaseURL: "https://heardleturkish-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "heardleturkish",
//     storageBucket: "heardleturkish.appspot.com",
//     messagingSenderId: "910815340133",
//     appId: "1:910815340133:web:864454cc6382cf93c0488c"
// }

// const app = initializeApp(firebaseConfig);

// export default app;
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtjRSPq-Pt8dCMBOQiclgZv3oaEK1wn9A",
  authDomain: "heardleita.firebaseapp.com",
  databaseURL: "https://heardleita-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "heardleita",
  storageBucket: "heardleita.appspot.com",
  messagingSenderId: "936930568527",
  appId: "1:936930568527:web:0142beeb259f0ee9657d3a",
  measurementId: "G-CDLP5D6VT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

