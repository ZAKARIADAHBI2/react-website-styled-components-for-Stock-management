import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyARQLyIRvLGR6Tze_fc8vKc5f4vFwg1UMs",
    authDomain: "pfe-estf.firebaseapp.com",
    databaseURL: "https://pfe-estf-default-rtdb.firebaseio.com",
    projectId: "pfe-estf",
    storageBucket: "pfe-estf.appspot.com",
    messagingSenderId: "1096888098127",
    appId: "1:1096888098127:web:8d12b0932fe0781788f93a",
    measurementId: "G-4FVE0E2TSS"
  };
  firebase.initializeApp(firebaseConfig);

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
  