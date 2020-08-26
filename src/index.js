import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import * as firebase from "firebase";
import {firebaseConfig} from "./components/Firebase";
import {initGA, logPageView} from "./components/GoogleAnalytics";

firebase.initializeApp(firebaseConfig)
const firebaseAnalytics = firebase.analytics();
const ga = initGA();

ReactDOM.render(
  <React.StrictMode>
    <App />
    <script>
        logPageView();
    </script>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
