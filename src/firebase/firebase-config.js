import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// cd
const firebaseConfig = {
    apiKey: 'AIzaSyAoyDnC0raarAWY0__dW37bXo6ZYm5um4Q',
    authDomain: 'journal-app-react-f23c3.firebaseapp.com',
    projectId: 'journal-app-react-f23c3',
    storageBucket: 'journal-app-react-f23c3.appspot.com',
    messagingSenderId: '861993111421',
    appId: '1:861993111421:web:57cc05cbeb924a39948614',
    measurementId: 'G-LYZXBPJYRJ',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
