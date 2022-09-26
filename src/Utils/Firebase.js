// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {

  apiKey: 'AIzaSyBOj1baSXORuThDICnh01rNx8TPorxuHUs',

  authDomain: "gripe-forum.firebaseapp.com",

  projectId: "gripe-forum",

  storageBucket: "gripe-forum.appspot.com",

  messagingSenderId: "118106829404",

  appId: "1:118106829404:web:031ec4e4a2ecc79a5fac99"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
