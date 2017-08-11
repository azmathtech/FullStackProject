import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    //debugger;  //used to test the output of the below

    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500} //default is US $ - input is in cents
        token={token => this.props.handleToken(token)} //callback function returns an authorization token representing the charge
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn grey black-text">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);

//----------------------------------Notes--------------------------------------

//using https://github.com/azmenak/react-stripe-checkout

//callback function returns an authorization token representing the charge
//token={token => console.log(token)} //used for testing to see the token
