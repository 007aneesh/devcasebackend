// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCHCsFz-EbxLTbNTrYgxmj5xSRRJ_cQyYs",
  authDomain: "devcase-2a759.firebaseapp.com",
  projectId: "devcase-2a759",
  storageBucket: "devcase-2a759.appspot.com",
  messagingSenderId: "245619839029",
  appId: "1:245619839029:web:f3e0ed22861eacea41617c",
  measurementId: "G-PS5ZBD1KWP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
