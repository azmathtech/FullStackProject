import axios from 'axios';

import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

//----------------------------------Notes--------------------------------------
//Redux Thunk middleware allows us to pass in a function to our action and
// pass in the dispatch function.  This allows us to have the action used
// when ever we want it to be called.

//Prior to refactor of fetchUser
// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get('/api/current_user')  //this returns a promise
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };
// };

// all of the below code is the same as the function above
// stages of refactor below

//for an arrow function with one argument you can eleminate the return and {}
// export const fetchUser = () =>
//   function(dispatch) {
//     axios
//       .get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };

// export const fetchUser = () =>
//   dispatch => {
//     axios
//       .get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };

// export const fetchUser = () => dispatch => {
//   axios
//     .get('/api/current_user')
//     .then(res => dispatch({ type: FETCH_USER, payload: res }));
// };

// Final of refactor
// export const fetchUser = () => async dispatch => {
//   const res = axios.get('/api/current_user');
//
//   dispatch({ type: FETCH_USER, payload: res });
// };

//Rather than returning the entire response object we pull out just the data
// export const fetchUser = () => async dispatch => {
//   const res = await axios.get('/api/current_user');
//
//   dispatch({ type: FETCH_USER, payload: res.data });
// };