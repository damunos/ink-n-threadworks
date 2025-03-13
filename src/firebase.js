// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDCoClVk2jxfY5r_Vtxyp9QBi01iT99Xw",
  authDomain: "ink-n-threadworks.firebaseapp.com",
  projectId: "ink-n-threadworks",
  storageBucket: "ink-n-threadworks.appspot.com", // ✅ Fixed this line
  messagingSenderId: "625674544596",
  appId: "1:625674544596:web:379406cf3cf61492b1e241",
  measurementId: "G-45CM8L4D1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Authentication
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in:", result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return null;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
