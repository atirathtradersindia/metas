// src/firebasequote.js

import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, push } from "firebase/database";

// Firebase configuration for Metas
const firebaseConfig = {
  apiKey: "AIzaSyDcmj17TKKNhcAcCdlU9hpuFulFiXD7LrQ",
  authDomain: "metas-getquote.firebaseapp.com",
  databaseURL: "https://metas-getquote-default-rtdb.firebaseio.com",
  projectId: "metas-getquote",
  storageBucket: "metas-getquote.firebasestorage.app",
  messagingSenderId: "511800791316",
  appId: "1:511800791316:web:a5d406ff06ff8ff03bf201",
  measurementId: "G-BT4YF8FF41",
};

// Initialize Firebase app (named "QuoteApp")
const app =
  !getApps().some((a) => a.name === "QuoteApp")
    ? initializeApp(firebaseConfig, "QuoteApp")
    : getApps().find((a) => a.name === "QuoteApp");

// Initialize Analytics (optional)
try {
  getAnalytics(app);
} catch (err) {
  console.warn("Analytics not supported in this environment");
}

// Auth and Database
export const auth = getAuth(app);
export const db = getDatabase(app);

// Logout function
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logged out successfully");
  } catch (err) {
    console.error("Logout error:", err);
  }
};

// Submit a new quote
export const submitQuote = async (data) => {
  try {
    const quoteRef = ref(db, "quotes");
    const newQuoteRef = await push(quoteRef, data);
    console.log("Quote submitted with ID:", newQuoteRef.key);
    return newQuoteRef.key;
  } catch (error) {
    console.error("Failed to submit quote:", error);
    throw error;
  }
};

export default app;
