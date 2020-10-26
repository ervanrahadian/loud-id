import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAIgDddaaEDdZV7X7D_QlQITL46oD11IPw",
  authDomain: "loudid-app.firebaseapp.com",
  databaseURL: "https://loudid-app.firebaseio.com",
  projectId: "loudid-app",
  storageBucket: "loudid-app.appspot.com",
  messagingSenderId: "31253467132",
  appId: "1:31253467132:web:533a5ce34290102f206c79",
  measurementId: "G-NW5Z85JFHV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
