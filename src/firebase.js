import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDHY9BEnM8N3_BwWbCwtA-ofcs6TTV8-Eg",
  authDomain: "scam-alert-frontend.firebaseapp.com",
  projectId: "scam-alert-frontend",
  storageBucket: "scam-alert-frontend.appspot.com",
  messagingSenderId: "1008709071968",
  appId: "1:1008709071968:web:0dcc1dd1c72fd7e931bf05",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
