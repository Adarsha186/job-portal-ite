// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS0kVr5eggYIsIKOAsrDFAZNmtPWNPZqE",
  authDomain: "ite-job.firebaseapp.com",
  projectId: "ite-job",
  storageBucket: "ite-job.appspot.com", // Corrected to match standard storage URL format
  messagingSenderId: "512180485523",
  appId: "1:512180485523:web:d6bc429e7a4513aaf3fc66",
  measurementId: "G-GCV6PBJEZN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
