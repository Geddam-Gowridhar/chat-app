import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyA6WgJMH6PgA9lr-EMVUIMwISqhra97NpA",
  authDomain: "chatapp-5efd4.firebaseapp.com",
  databaseURL: "https://chatapp-5efd4-default-rtdb.firebaseio.com",
  projectId: "chatapp-5efd4",
  storageBucket: "chatapp-5efd4.firebasestorage.app",
  messagingSenderId: "920573589411",
  appId: "1:920573589411:web:bc7b4f1c7b94cd9bfa8c16",
  measurementId: "G-0P762496P1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);