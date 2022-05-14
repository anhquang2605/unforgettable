// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD3NLrzDgz-A37b0oc8_6KfFfpCnvYuUhc",

  authDomain: "unforgettable-b6f1a.firebaseapp.com",

  projectId: "unforgettable-b6f1a",

  storageBucket: "unforgettable-b6f1a.appspot.com",

  messagingSenderId: "412100601026",

  appId: "1:412100601026:web:f4e6b6d3d1aec46d4dc75b",

  measurementId: "G-NV4YJFFXHT",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
export default firebase;
