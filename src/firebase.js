import { initializeApp } from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyCSsc_TJvnmhMOiY6FBxzgo8hdl0EmC3e4",
    authDomain: "vortex-movies.firebaseapp.com",
    databaseURL: "https://vortex-movies.firebaseio.com",
    projectId: "vortex-movies",
    storageBucket: "vortex-movies.appspot.com",
    messagingSenderId: "474923680919"
  });

  export const db = app.database();
  export const namesRef = db.ref('names');
  export const moviesRef = db.ref('movies');