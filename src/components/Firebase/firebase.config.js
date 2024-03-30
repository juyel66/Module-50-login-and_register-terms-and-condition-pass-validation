// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDb_8ej5rTO8YVCrH7FqMw4z0YbpsEhKg",
  authDomain: "user-email-password-auth-5c0a0.firebaseapp.com",
  projectId: "user-email-password-auth-5c0a0",
  storageBucket: "user-email-password-auth-5c0a0.appspot.com",
  messagingSenderId: "626405099166",
  appId: "1:626405099166:web:4076209d53cc6eb3a0dd8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;