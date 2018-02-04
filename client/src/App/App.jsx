import React from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {PrivateRoute, Recommendation } from '../_components';
import {HomePage} from '../HomePage';
import {LoginPage} from '../LoginPage';
import {RegisterPage} from '../RegisterPage';
import {TripsPage} from '../TripsIndexPage';
import {PlanPage} from '../PlanPage';
import {TripPage} from '../TripPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    const {dispatch} = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }
  render() {
    const {alert} = this.props;
    return (<Router history={history}>
      <div>
        <Route exact="exact" path="/" component={HomePage}/>
        <Route exact="exact" path="/login" component={LoginPage}/>
        <Route exact="exact" path="/register" component={RegisterPage}/>
        <Route exact="exact" path="/trips" component={TripsPage}/>
        <Route exact="exact" path="/trips/:id" component={TripPage}/>
        <Route exact="exact" path="/plan" component={PlanPage}/>
        <Route exact="exact" path="/re" component={Recommendation}/>
      </div>
    </Router>);
  }
}

function mapStateToProps(state) {
  const {alert} = state;
  return {alert};
}

const connectedApp = connect(mapStateToProps)(App);
export {
  connectedApp as App
};
