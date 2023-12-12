import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyBYXrQQwgP5Yw0RA58ityEagWwNzgnI2PI",
  // authDomain: "quotation-tracker.firebaseapp.com",
  // projectId: "quotation-tracker",
  // storageBucket: "quotation-tracker.appspot.com",
  // messagingSenderId: "535313232033",
  // appId: "1:535313232033:web:5172eeef156e1409e800e0",

  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
