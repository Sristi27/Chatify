import firebase  from "firebase/app";
import "firebase/auth";


//function call
export const auth = firebase.initializeApp({
    apiKey: your_api_key,
    authDomain: your_auth_domain,
    projectId: your_proj_id ,
    storageBucket: your_storage_bucket,
    messagingSenderId: your_sender_id,
    appId: your_app_id
  }).auth();