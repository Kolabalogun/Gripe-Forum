// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {

  apiKey: process.env.local.REACT_APP_API_KEY,

  authDomain: process.env.local.REACT_APP_DOMAIN_NAME,

  projectId: process.env.local.REACT_APP_PROJECT_ID,

  storageBucket: process.env.local.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.local.REACT_APP_MESSAGING_SID,

  appId: process.env.local.REACT_APP_APP_ID

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
