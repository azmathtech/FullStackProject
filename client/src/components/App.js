import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);

//----------------------------------Notes--------------------------------------

// With jsx the following are identicle - exact and exact={true}
// Just using exact jsx will assume you mean it is equal to {true}

//Functional Component - how app started
// const App = () => {
//   return (
//     <div className="container">
//       <BrowserRouter>
//         <div>
//           <Header />
//           <Route exact path="/" component={Landing} />
//           <Route exact path="/surveys" component={Dashboard} />
//           <Route path="/surveys/new" component={SurveyNew} />
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// };
