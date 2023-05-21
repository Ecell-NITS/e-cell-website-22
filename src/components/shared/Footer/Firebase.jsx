// import firebase from 'firebase/tools'
// import "firebase/firestore"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyDa9t6ln9LoTBYzehtfjTWcG7JD4-9qDtE",
    authDomain: "newsletter-95b14.firebaseapp.com",
    projectId: "newsletter-95b14",
    storageBucket: "newsletter-95b14.appspot.com",
    messagingSenderId: "171849255462",
    appId: "1:171849255462:web:da43ce8d5894a943c9b4e7"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db  = firebaseApp.firestore();

export default db;
