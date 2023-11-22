import { initializeApp } from "firebase/compat/app";
import { getFirestore } from "firebase/compat/firestore";
import { getAuth } from "firebase/auth";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyBa9DgcN4ZOnoINUOI0RCPu14iCLIzH0AQ",
  authDomain: "stock-915e5.firebaseapp.com",
  projectId: "stock-915e5",
  storageBucket: "stock-915e5.appspot.com",
  messagingSenderId: "874125596292",
  appId: "1:874125596292:web:e109803e9dea5bcdcbd4d1",
  measurementId: "G-57BH4GN1LQ",
});


const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };
