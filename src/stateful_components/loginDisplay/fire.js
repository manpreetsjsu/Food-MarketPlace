import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAQEcJLtuovRMBoFCKOJDYaL76iJpvfcNk",
    authDomain: "shield-food.firebaseapp.com",
    databaseURL: "https://shield-food.firebaseio.com",
    projectId: "shield-food",
    storageBucket: "shield-food.appspot.com",
    messagingSenderId: "554028624769"
};
const fire= firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});
// const firestore =firebase.firestore();
// const docref=firestore.doc("users");

export default fire;