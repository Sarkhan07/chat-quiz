import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { loginSuccess, logoutSuccess } from './actions';
import store from './store';

const firebaseConfig = {
  apiKey: "AIzaSyDNWsVEdUdcQ1AUJJpUvPpV2ykGiOPx1_A",
  authDomain: "chat-quiz-3f319.firebaseapp.com",
  projectId: "chat-quiz-3f319",
  storageBucket: "chat-quiz-3f319.appspot.com",
  messagingSenderId: "91656237801",
  appId: "1:91656237801:web:2c4a581014652b1c4bb678"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, db };
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    store.dispatch(loginSuccess(user));
  } catch (error) {
    console.error(error);
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
    store.dispatch(logoutSuccess());
  } catch (error) {
    console.error(error);
  }
};