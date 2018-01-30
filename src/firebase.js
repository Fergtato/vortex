import { initializeApp } from 'firebase';
import firebase from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyCSsc_TJvnmhMOiY6FBxzgo8hdl0EmC3e4",
    authDomain: "vortex-movies.firebaseapp.com",
    databaseURL: "https://vortex-movies.firebaseio.com",
    projectId: "vortex-movies",
    storageBucket: "vortex-movies.appspot.com",
    messagingSenderId: "474923680919"
  });

  export const db = app.database();
  export var moviesRef = null;
  export var favsRef = db.ref('lists').child('favourites');
  console.log("D");

  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      moviesRef = db.ref('lists').child('favourites').child(user.uid);
      console.log("A: " + user.uid);
    } else {
      console.log('nope');
    }
  });

  