

import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.
  VITE_FIREBASE_APIKEY,
  authDomain: "vingo2.firebaseapp.com",
  projectId: "vingo2",
  storageBucket: "vingo2.firebasestorage.app",
  messagingSenderId: "141911755992",
  appId: "1:141911755992:web:3ce366a94aa211c5d61bad"
};

const app = initializeApp(firebaseConfig);

const auth=getAuth(app)

export{app,auth}