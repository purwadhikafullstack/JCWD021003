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
  apiKey: "AIzaSyAy8h7tpyTCBpf3QSd9V6JqfvIjEMRusMA",
  authDomain: "final-project-group-3-e0d7b.firebaseapp.com",
  projectId: "final-project-group-3-e0d7b",
  storageBucket: "final-project-group-3-e0d7b.appspot.com",
  messagingSenderId: "716957093453",
  appId: "1:716957093453:web:f3371cd498a08bdb681604",
  measurementId: "G-C5R6RG72Q3"
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
    console.log("user",user);
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    // console.log("docs",docs)
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        username: user.displayName,
        authProvider: 'google',
        email: user.email,
        avatar: user.photoURL
      });
    }
    // const userRef = firestore.collection('users');
    // const querySnapshot = await userRef.where('uid', '==', uid).get();
    //   console.log("snapshot",querySnapshot);
    const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log('No matching documents.');
          return null; // or handle the case when no user is found
        }
    
        // Assuming there is only one document with the given UID
        const userData = querySnapshot.docs[0].data();
        // console.log('userData',userData)
    return userData;
  } catch (err) {
    throw err;
  }
};


export { signInWithGoogle }