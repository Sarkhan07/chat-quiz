import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

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
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(credential, 'cred', token, 'tok', 'user', user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData ? error.customData.email : null;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorCode, 'errorcode1', errorMessage, 'message2', email, 'email3', credential, 'credential4');
  }
};

export const signOut = async () => {
  try {
    console.log('Before sign-out:', auth.currentUser);
    await auth.signOut();
    console.log('After sign-out:', auth.currentUser);
  } catch (error) {
    console.error(error);
  }
};