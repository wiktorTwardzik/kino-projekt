import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpc2JNsDshq4ZVKeGpXnuxJfUxTbVX3vA",
  authDomain: "kino-37b7c.firebaseapp.com",
  projectId: "kino-37b7c",
  storageBucket: "kino-37b7c.firebasestorage.app",
  messagingSenderId: "693022344666",
  appId: "1:693022344666:web:db9bac1bc5f32543846ce3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
