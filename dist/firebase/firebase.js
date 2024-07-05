"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
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
const app = (0, app_1.initializeApp)(firebaseConfig);
const analytics = (0, analytics_1.getAnalytics)(app);
