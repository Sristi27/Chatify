import firebase  from "firebase/app";
import "firebase/auth";


//function call
export const auth = firebase.initializeApp({
    apiKey: "AIzaSyC6ShN2I6AbrubmBSTWC8JKK78IcxDutXQ",
    authDomain: "chatapp-450f1.firebaseapp.com",
    projectId: "chatapp-450f1",
    storageBucket: "chatapp-450f1.appspot.com",
    messagingSenderId: "620795967351",
    appId: "1:620795967351:web:2a1d6971170991accf5372"
  }).auth();