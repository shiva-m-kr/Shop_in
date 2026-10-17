import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginshopin.firebaseapp.com",
  projectId: "loginshopin",
  storageBucket: "loginshopin.firebasestorage.app",
  messagingSenderId: "56801716432",
  appId: "1:56801716432:web:6adfd359b4427341b516d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export {auth, provider}


