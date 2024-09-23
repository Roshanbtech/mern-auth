// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "r-auth-ae365.firebaseapp.com",
  projectId: "r-auth-ae365",
  storageBucket: "r-auth-ae365.appspot.com",
  messagingSenderId: "370983137412",
  appId: "1:370983137412:web:f9d4d6cad95ae5861052d1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
