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

  var user = '123';

  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      user = firebase.auth().currentUser.uid;
      console.log(user);
    } else {
      console.log('nope');
    }
  });
  

  export const db = app.database();
  export const moviesRef = db.ref('lists').child('favourites').child(user);