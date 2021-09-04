import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcPbTd4gRNKcu_00NnjRbSI9zh0WcRwWU",
  authDomain: "events-7b13a.firebaseapp.com",
  projectId: "events-7b13a",
  storageBucket: "events-7b13a.appspot.com",
  messagingSenderId: "93735667518",
  appId: "1:93735667518:web:4d40a07977d626b515ce6f",
  measurementId: "G-XTT6VS0MPH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;