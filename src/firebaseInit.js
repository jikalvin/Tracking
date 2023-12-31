import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB8igmIYHqKFwbSKzJ2GFCImIZWGwEhWJQ",
  authDomain: "yocilab-blog.firebaseapp.com",
  projectId: "yocilab-blog",
  storageBucket: "yocilab-blog.appspot.com",
  messagingSenderId: "15910744391",
  appId: "1:15910744391:web:ad8753644984151d5d5c62"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db= firebase.firestore();
export const bookings = db.collection('trackings');
