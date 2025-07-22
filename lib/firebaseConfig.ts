// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmEldpquSTqyGOtLLramX50wABpVywrLU",
  authDomain: "todo-app-381f7.firebaseapp.com",
  projectId: "todo-app-381f7",
  storageBucket: "todo-app-381f7.firebasestorage.app",
  messagingSenderId: "723626652757",
  appId: "1:723626652757:web:7452fa1843eafe215510dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };

