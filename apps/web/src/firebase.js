/* eslint-disable no-useless-catch */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWXEEtqcznkudA6uOaZqftnw13NyonYco",
  authDomain: "mini-project-kelompok3.firebaseapp.com",
  projectId: "mini-project-kelompok3",
  storageBucket: "mini-project-kelompok3.appspot.com",
  messagingSenderId: "126571210027",
  appId: "1:126571210027:web:0097d7495726288c5a116e"
};
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
    return 'signin with google success';
  } catch (err) {
    throw err;
  }
};


export { signInWithGoogle }