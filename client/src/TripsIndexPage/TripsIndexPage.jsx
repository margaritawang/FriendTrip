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
    const { user } = this.props;
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image
                size='mini'
                src='/client/src/assets/img/FriendTripLogo.jpg'
                style={{ marginRight: '1.5em' }}
              />
              FriendTrip
            </Menu.Item>
            <Menu.Item as='a' position='right'><Icon name='user' /> Profile</Menu.Item>
            <Menu.Item as='a'><Icon name='send' />Invite Friends</Menu.Item>
          </Container>
        </Menu>
        <Grid container columns={3} style={{ marginTop: '7em' }} stackable>
          <Grid.Column>
            <TripBadge />
          </Grid.Column>
          <Grid.Column>
            <TripBadge />
          </Grid.Column>
          <Grid.Column>
            <TripBadge />
          </Grid.Column>
          <Grid.Column>
            <TripBadge />
          </Grid.Column>
          <Grid.Column>
            <TripBadge />
          </Grid.Column>
          <Grid.Column>
            <TripBadge />
          </Grid.Column>
        </Grid>
          <Popup
            trigger={<Button icon='add' className="primary-btn-fab"/>}
            content={
              <Form>
                <Form.Group widths='equal'>
                  <Form.Field id='form-input-control-first-name' control={Input} label='First name' placeholder='First name' />
                  <Form.Field id='form-input-control-last-name' control={Input} label='Last name' placeholder='Last name' />
                </Form.Group>
                <Form.Field id='form-textarea-control-opinion' control={TextArea} label='Opinion' placeholder='Opinion' />
                <Form.Field id='form-button-control-public' control={Button} content='Confirm' label='Label with htmlFor' />
              </Form>}
          />
      </div>
    );
  }
}

function mapStateToProps(state){
  const { user } = state.authentication;
  return {
    user
  };
}

const connectedTripsPage = connect(mapStateToProps)(TripsPage);
export { connectedTripsPage as TripsPage };
// export { TripsPage };