// Import the functions you need from the SDKs you need
import { initializeApp, auth } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqYw98XgnqYVg4aHVCqn1RVfo00C7cm2I",
    authDomain: "lamps-api.firebaseapp.com",
    projectId: "lamps-api",
    storageBucket: "lamps-api.appspot.com",
    messagingSenderId: "232711795073",
    appId: "1:232711795073:web:0f83a0853fc18a84cbb880",
    measurementId: "G-9ZREF53Q3J"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const firebase = firebase.auth()

export { auth, app };