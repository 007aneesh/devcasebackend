"use strict";
const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    storageBucket: "gs://devcase-2a759.appspot.com"
});
const storage = firebase.storage();
