import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyBYXrQQwgP5Yw0RA58ityEagWwNzgnI2PI",
  // authDomain: "quotation-tracker.firebaseapp.com",
  // projectId: "quotation-tracker",
  // storageBucket: "quotation-tracker.appspot.com",
  // messagingSenderId: "535313232033",
  // appId: "1:535313232033:web:5172eeef156e1409e800e0",

  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
