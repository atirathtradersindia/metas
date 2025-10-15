// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA37k44vamxWsVjl7WyJZof5PRC3NRrR2M",
  authDomain: "metas-reg.firebaseapp.com",
  databaseURL: "https://metas-reg-default-rtdb.firebaseio.com",
  projectId: "metas-reg",
  storageBucket: "metas-reg.firebasestorage.app",
  messagingSenderId: "253590979081",
  appId: "1:253590979081:web:08728d17445afb335b2ed8",
  measurementId: "G-F53XSSEN0P"
};

// ✅ Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getDatabase(app);

// ✅ Logout helper
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Logout error:", err);
  }
};

// ✅ Track user state (can be used in App.jsx)
export const trackAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export default app;