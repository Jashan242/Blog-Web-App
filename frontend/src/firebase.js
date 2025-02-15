import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCyQBqMMZK95b9PEW7xSsSYHmlxkRwS_No",
    authDomain: "authentication-practice-cc642.firebaseapp.com",
    projectId: "authentication-practice-cc642",
    storageBucket: "authentication-practice-cc642.firebasestorage.app",
    messagingSenderId: "878206085740",
    appId: "1:878206085740:web:8e6282b1a94dde0f3e0649",
    measurementId: "G-7WK7QZ3QCJ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword };
