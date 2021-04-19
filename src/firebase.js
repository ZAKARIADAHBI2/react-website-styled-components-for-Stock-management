import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";


let firebaseConfig = {
  apiKey: "AIzaSyCpKFRdT76OohQDxLTBZO-4qL_9_iyP6ZQ",
  authDomain: "reactcrud-aa601.firebaseapp.com",
  projectId: "reactcrud-aa601",
  storageBucket: "reactcrud-aa601.appspot.com",
  messagingSenderId: "344376927878",
  appId: "1:344376927878:web:351d2ab0cb942ae0b71307"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.database();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
