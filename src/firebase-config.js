import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_CONFIG,
  authDomain: "quiz-db375.firebaseapp.com",
  projectId: "quiz-db375",
  storageBucket: "quiz-db375.appspot.com",
  messagingSenderId: "123600681102",
  appId:process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-4E7DT5K04H"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

export {db};