import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions/user.actions.js';
import { TripBadge } from '../_components';
import {
  Button, Container, Grid, Header, Icon, Image, Item, Label, Menu, Segment, Step, Table, Dropdown, Popup, Form, TextArea, Input
} from 'semantic-ui-react'

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
    const { user, trips } = this.props;
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image
                size='mini'
                src='./client/src/assets/img/FriendTripLogo.jpg'
                style={{ marginRight: '1.5em' }}
              />
              FriendTrip
            </Menu.Item>
            <Menu.Item as='a' position='right'><Icon name='user' /> Profile</Menu.Item>
            <Menu.Item as='a'><Icon name='send' />Invite Friends</Menu.Item>
          </Container>
        </Menu>
        <Grid container columns={3} style={{ marginTop: '7em' }} stackable>
          {
            trips.map(trip => {
              return (
                <Grid.Column>
                  <TripBadge />
                </Grid.Column>
              )
            })
          }
        </Grid>
          <Popup
            trigger={<Button icon='add' className="primary-btn-fab"/>}
            content={
              <Form action={`http://localhost:3000/api/users/${user.id}/trips`}>
                <Form.Field id='form-input-control-first-name' control={Input} name='location' label='Location' placeholder='Location' />
                <Form.Field id='form-input-control-first-name' control={Input} name='month' label='Month' placeholder='Month' />
                <Form.Field id='form-button-control-public' control={Button} content='Create'/>
              </Form>}
          />
      </div>
    );
  }
}

function mapStateToProps(state){
  const { user } = state.authentication;
  const { trips } = state.users;
  return {
    user,
    trips
  };
}

const connectedTripsPage = connect(mapStateToProps)(TripsPage);
export { connectedTripsPage as TripsPage };
// export { TripsPage };

          // {user.trips.map(function(trip) => {
          //   return (
          //     <Grid.Column>
          //       <TripBadge />
          //     </Grid.Column>)
          // })}