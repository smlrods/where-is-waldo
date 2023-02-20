import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDRwibtERv67OzQmiLFxG_yH556kQwQS20',
  authDomain: 'smlrods-findus.firebaseapp.com',
  projectId: 'smlrods-findus',
  storageBucket: 'smlrods-findus.appspot.com',
  messagingSenderId: '1086055179831',
  appId: '1:1086055179831:web:fd40bac3b79b769e4781b2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App db={db}/>
  </React.StrictMode>
);
