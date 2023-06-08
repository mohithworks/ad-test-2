import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBax6s2FlOOFNB04rZ1f9y7rOKSXExyY6o",
    authDomain: "topsy-52620.firebaseapp.com",
    projectId: "topsy-52620",
    storageBucket: "topsy-52620.appspot.com",
    messagingSenderId: "202409648298",
    appId: "1:202409648298:web:a5dcfb0d1852711d87b0d3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);