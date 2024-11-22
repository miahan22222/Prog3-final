import app from "firebase/app"
import firebase from "firebase";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDu9mhTfQQdK5EkdsTUSSuqF2IsR2ITLaU",
  authDomain: "hola-2aea5.firebaseapp.com",
  projectId: "hola-2aea5",
  storageBucket: "hola-2aea5.firebasestorage.app",
  messagingSenderId: "12597978674",
  appId: "1:12597978674:web:c225aadc9993a4a2853e2b"
};
  app.initializeApp(firebaseConfig)

  export const auth = firebase.auth() 
  export const db = app.firestore()
  export const storage = app.storage()