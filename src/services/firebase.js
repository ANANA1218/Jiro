import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDt7yqJ8zqkZ2lWIHSB8Gun4byRUqGYs6s",
    authDomain: "jiro-ikram-annabelle.firebaseapp.com",
    projectId: "jiro-ikram-annabelle",
    storageBucket: "jiro-ikram-annabelle.appspot.com",
    messagingSenderId: "1006974861342",
    appId: "1:1006974861342:web:a2627312ed2e450fb9ee0f"
}

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
