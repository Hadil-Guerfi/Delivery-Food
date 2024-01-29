
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import   {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUX3pJVWvemdAggaDrTz01DMj9aTuECz8",
  authDomain: "delivery-d0152.firebaseapp.com",
  databaseURL: "https://delivery-d0152-default-rtdb.firebaseio.com",
  projectId: "delivery-d0152",
  storageBucket: "delivery-d0152.appspot.com",
  messagingSenderId: "336835891283",
  appId: "1:336835891283:web:dcf93d30a46026ff6c76a6"
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const firestore =getFirestore(app);
export const auth=getAuth(app)