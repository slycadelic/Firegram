// Your web app's Firebase Config
// also required: install firebase package on frontend using npm install firebase

// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
// using 2 services - storage for storing data and firstore as database 
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration  
// object used to initialize the firebase app - copied from firebase project dashboard 
const firebaseConfig = {
  apiKey: "AIzaSyB_snw3Evd_-_Ss3U9bK8fRlDwNLCGHNRI",
  authDomain: "spatel-firegram.firebaseapp.com",
  projectId: "spatel-firegram",
  storageBucket: "spatel-firegram.appspot.com",
  messagingSenderId: "15467606895",
  appId: "1:15467606895:web:ae18813dc2735cec3e6e9a"
};

// Initialize Firebase app - connects to backend
const app = firebase.initializeApp(firebaseConfig);


// Initialize storage and firestore services here and on dashboard
// In storage, get rid of auth rules to let anyone use services
// can add auth later.
const projectFirestore = getFirestore(app);
const projectStorage = getStorage(app);

// Export services to be used in other files 
export { projectStorage, projectFirestore};