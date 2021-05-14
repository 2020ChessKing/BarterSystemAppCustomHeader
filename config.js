import firebase from 'firebase';
require('@firebase/firestore');

  // Your web app's Firebase configuration
  var firebaseConfig = 
  {
    apiKey: "AIzaSyBSz_jFLxeELEWdAc5mYd0QoT64vgSeXT0",
    authDomain: "bartersystem-1fdcd.firebaseapp.com",
    projectId: "bartersystem-1fdcd",
    storageBucket: "bartersystem-1fdcd.appspot.com",
    messagingSenderId: "573191693805",
    appId: "1:573191693805:web:1b8f8283352c752d01f3e4"
  };
  // Initialize Firebase
  if(!firebase.apps.length)
  {
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase.firestore();
