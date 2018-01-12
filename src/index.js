import React from 'react';
import App from './app';
import { render } from 'react-dom';
import '../sass/main.scss';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDMwEGhPJi-ts66ddGWTqJAN9EFIAKmAso",
  authDomain: "sisketeers-15556.firebaseapp.com",
  databaseURL: "https://sisketeers-15556.firebaseio.com",
  projectId: "sisketeers-15556",
  storageBucket: "sisketeers-15556.appspot.com",
  messagingSenderId: "470740166069"
};

firebase.initializeApp(config);

render(<App />, document.querySelector('#root'));
