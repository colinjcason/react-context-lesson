import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBhKRfMtPWB8CBVOUVP4L4zBvvQmv6XphU",
  authDomain: "crown-clothing-b563c.firebaseapp.com",
  projectId: "crown-clothing-b563c",
  storageBucket: "crown-clothing-b563c.appspot.com",
  messagingSenderId: "997280534041",
  appId: "1:997280534041:web:f23187ea9bce0662f8e488",
  measurementId: "G-77ZNG1HHFR"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
