import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

import axios from 'axios'; //temp to test sendgrid code
window.axios = axios; //temp to test sendgrid code

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

// console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
// console.log('Enviornment is', process.env.NODE_ENV);

//----------------------------------Notes--------------------------------------

//To install the Redux developer tools in Chrome
// This is how you set up for development only.
//
// 1. Download the Chrome extension for redux-devtools-extension.
//
// Download Link
//
// 2. Install using npm (IN THE CLIENT DIRECTORY)
//
// npm install --save-dev redux-devtools-extension
//
// 3. Add the following to index.js
//
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
//
// 4. Replace your store call with the following:
//
// const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)));
