import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { tripActions } from '../_actions/trips.actions.js';
import { Form, Container, Input, Field, Segment, Button, Icon, Image } from 'semantic-ui-react';

class TripsPage extends React.Component {
  constructor(props){
    super(props);
    this.props.dispatch(tripActions.getAllTrips());
    // Bind any functions here.
  }

  render() {
    const { trips } = this.props;
    return (
      <div>
        Hello world!!
      </div>
    );
  }


}


function mapStateToProps(state){
  const { trips } = state.trips;
  return {
    trips
  };
}

const connectedTripsPage = connect(mapStateToProps)(TripsPage);
export { connectedTripsPage as TripsPage };
// export { TripsPage };