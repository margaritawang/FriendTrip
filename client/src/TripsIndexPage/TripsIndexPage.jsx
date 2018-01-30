import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions/user.actions.js';
import { TripBadge } from '../_components';
import { Test } from '../_components/test.jsx';

class TripsPage extends React.Component {
  constructor(props){
    super(props);
    // Bind any functions here.
  }

  componentDidMount(){
    const { user } = this.props;
    this.props.dispatch(userActions.getAllTrips(user));
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        Hello world!!
          <Test />
      </div>
    );
  }


}


function mapStateToProps(state){
  //const { trips } = ;
  const { user } = state.authentication;
  return {
    user
  };
}

const connectedTripsPage = connect(mapStateToProps)(TripsPage);
export { connectedTripsPage as TripsPage };
// export { TripsPage };