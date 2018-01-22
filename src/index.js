import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
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

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
