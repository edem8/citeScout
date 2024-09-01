import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,

} from "firebase/auth";
import { getFirestore, } from "firebase/firestore";



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN_AUTH,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENEDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider(app)

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  provider,
  sendPasswordResetEmail,
  signInWithPopup,

}