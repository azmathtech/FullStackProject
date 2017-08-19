import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.emails = validateEmails(values.reipients || '');

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);

//----------------------------------Notes--------------------------------------
//SurveyForm shows a form for a user to add input

//Basic Field example -
//<Field type="text" name="surveyTitle" component="input" />

//this.props.handleSubmit is a helper function provided by reduxForm

//testing form

/* <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
  <Field type="text" name="surveyTitle" component="input" />
  <button type="submit">Submit</button>
</form> */

/* <Field
  label="Survey Title"
  type="text"
  name="title"
  component={SurveyField}
/> */

// if (!values.title) {
//   errors.title = 'You must provide a title';
// }
// if (!values.subject) {
//   errors.title = 'You must provide a title';
// }
// if (!values.body) {
//   errors.title = 'You must provide a title';
// }
// if (!values.emails) {
//   errors.title = 'You must provide a title';
// }

//used for testing <form onSubmit={this.props.handleSubmit(values => console.log(values))}>

//onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit}
//The above is used becase we want a reference to the onSurveySubmit function
//to be called.  If we used this.props.onSurveySubmit() the function would run
//as soon as the javascript compiler read that line.  We want it to run after the form is
//actually submitted by the user.

//destroyOnUnmount is true by default
