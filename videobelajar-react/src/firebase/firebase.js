// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Kode konfigurasi dari akun Firebase Anda
const firebaseConfig = {
    apiKey: "AIzaSyDy26MX24hvRlAvSqAcT5mDDdLbcLL9R1Y",
    authDomain: "videobelajarweb.firebaseapp.com",
    projectId: "videobelajarweb",
    storageBucket: "videobelajarweb.firebasestorage.app",
    messagingSenderId: "96380766110",
    appId: "1:96380766110:web:fa03be364bfcc31627788f",
    measurementId: "G-7XH1HKQK08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Database agar bisa dipakai di file lain (Login.jsx, CourseContext.jsx, dll)
export const auth = getAuth(app);
export const db = getFirestore(app);