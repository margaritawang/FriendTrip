import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions/user.actions.js';
import { Form, Container, Input, Field, Segment, Button, Icon, Image, Card } from 'semantic-ui-react';
import { CityCard } from '../_components';

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
    console.log("usereeeeee", user);
    return (
      <div>
        Hello world!!
        <CityCard />
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