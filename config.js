import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCJmmm7Nz-s8Dn7VBTU4gXQBmMHBfxOx3A",
  authDomain: "phoneauth-c60a3.firebaseapp.com",
  projectId: "phoneauth-c60a3",
  storageBucket: "phoneauth-c60a3.appspot.com",
  messagingSenderId: "154960341118",
  appId: "1:154960341118:web:10a4306a8ca7cb87f2d02f",
  measurementId: "G-PGRW7QWGDP",
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
