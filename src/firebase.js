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

  // export var userFavouritesRef = null;
  // export var userWatchlistRef = null;

  export var userListsRef = null;
  export const listsRef = db.ref('lists');

  // export const favouritesRef = db.ref('lists').child('favourites');
  // export const watchlistRef = db.ref('lists').child('watchlist');

  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      userListsRef = db.ref('lists').child(user.uid);
      // userFavouritesRef = db.ref('lists').child('favourites').child(user.uid);
      // userWatchlistRef = db.ref('lists').child('watchlist').child(user.uid);
    } else {
      console.log('Could not get users list - firebase.js');
    }
  });

  