import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
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

export const sendMessageToFirestore = async (text, user) => {
  try {
    await addDoc(collection(db, 'messages'), {
      text,
      user,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

export const listenToMessagesFromFirestore = (callback) => {
  const q = query(collection(db, 'messages'), orderBy('timestamp'));
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
};