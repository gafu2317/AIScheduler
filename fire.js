// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxMI4cVWnuFmsdeWGOXeTqMLYj2kTyqR4",
  authDomain: "sakurasaku-4c607.firebaseapp.com",
  projectId: "sakurasaku-4c607",
  storageBucket: "sakurasaku-4c607.appspot.com",
  messagingSenderId: "788253974644",
  appId: "1:788253974644:web:1005447b9451884b257121",
  measurementId: "G-LF5D3CV7RE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
