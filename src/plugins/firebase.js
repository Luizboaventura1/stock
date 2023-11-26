
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyBa9DgcN4ZOnoINUOI0RCPu14iCLIzH0AQ",
  authDomain: "stock-915e5.firebaseapp.com",
  projectId: "stock-915e5",
  storageBucket: "stock-915e5.appspot.com",
  messagingSenderId: "874125596292",
  appId: "1:874125596292:web:e109803e9dea5bcdcbd4d1",
  measurementId: "G-57BH4GN1LQ"
})

const db = getFirestore(firebaseConfig)

export { firebaseConfig, db }