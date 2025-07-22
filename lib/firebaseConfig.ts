//import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
//import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const auth = getAuth(app);

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

export { app, auth, db };


