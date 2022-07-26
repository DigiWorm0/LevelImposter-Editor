import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDRFJtLxCXTL7Iq61ldJ8tNi4TOplhMOVY",
    authDomain: "levelimposter-347807.firebaseapp.com",
    projectId: "levelimposter-347807",
    storageBucket: "levelimposter-347807.appspot.com",
    messagingSenderId: "171787211061",
    appId: "1:171787211061:web:0812cc1daf70f4c8aefc7c",
    measurementId: "G-KD9VBWW5N1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();