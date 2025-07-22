// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1vqjsm8sgWf_opGUEX-hVsSF7YZi9qqE",
  authDomain: "erponline-c3993.firebaseapp.com",
  projectId: "erponline-c3993",
  storageBucket: "erponline-c3993.appspot.com",
  messagingSenderId: "987368253114",
  appId: "1:987368253114:web:88db47ff5dc1197e500483",
  measurementId: "G-W5NK5DGX3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
