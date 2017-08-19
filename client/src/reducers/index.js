import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm
});

//----------------------------------Notes--------------------------------------

//import { reducer as reduxForm } from 'redux-form';
// we can not change the name reducer as it is required by redux-form
// using as allows us to assign another variable name to reducer
