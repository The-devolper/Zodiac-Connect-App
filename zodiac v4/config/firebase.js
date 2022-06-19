import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import { collection, doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCRmNEkLF4wvO-N4_KBzW1py1p0z4Az5x0',
  authDomain: 'interest-hub.firebaseapp.com',
  projectId: 'interest-hub',
  storageBucket: 'interest-hub.appspot.com',
  messagingSenderId: '999733536711',
  appId: '1:999733536711:web:8934106138dc7b1b2f5be2',
  measurementId: 'G-XWYNENMHJS',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export {
  app,
  createUserWithEmailAndPassword,
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  database,
  ref,
  set,
  get,
  child,
  onValue,
  sendPasswordResetEmail,
  remove,
  doc,
  onSnapshot,
  firestore,
  collection,
  googleProvider,
  signInWithRedirect,
  signInWithPopup,
  update,
  analytics,
  logEvent,
  GoogleAuthProvider,
};
