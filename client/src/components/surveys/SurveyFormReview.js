import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>
          {label}
        </label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        className="green btn-flat right"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  //console.log(state);
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));

//----------------------------------Notes--------------------------------------
//SurveyFormReview shows users their form inputs for review

//Repetitive blocks of code if we do this four times
/* <div>
  <div>
    <label>Survey Title</label>
  </div>
  <div>
    {formValues.title}
  </div>
</div> */

//the history prop is made available by the withRouter function
//withRouter passes the history prop to SurveyFormReview which teaches our
//component about the avaliable routes in the app
