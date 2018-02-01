import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions/user.actions.js';
import { ActivityBadge } from '../_components';
import {
  Button, Container, Grid, Header, Icon, Image, Item, Label, Menu, Segment, Step, Table, Dropdown, Popup, Form, TextArea, Input, Modal
} from 'semantic-ui-react'

class TripPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      description: ''
    };
    // Bind any functions here.
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e, { name, value }){
    this.setState({ [name]: value })
  }

  handleSubmit(e){
    e.preventDefault();
    const { description } = this.state
    const { dispatch, user } = this.props;
    const activityInfo = {
      description: description
    };
    dispatch(userActions.createNewActivity(user , activityInfo))
    this.setState({ submittedDescription: description })
  }

  componentDidMount(){
    const { user, trip } = this.props;
//
  }



  render() {
    const { user, trip } = this.props;
    const { description } = this.state;
    return (
      <div>
        TripPage
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
          {/* {
            activities.map(activity => {
              return (
                <Grid.Column key={activity.id}>
                  <TripBadge key={activity.id} activity={activity}/>
                </Grid.Column>
              )
            })
          } */}
        </Grid>
          <Modal trigger={<Button icon='add' className="primary-btn-fab"/>}>
            <Modal.Header>Create an Activity</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field id='form-input-control-description' control={TextArea} name='description' label='Description' placeholder='Activity!!' value={description} onChange={this.handleChange} required/>
                <Form.Field id='form-button-control-public' control={Button} content='Create'/>
              </Form>
            </Modal.Content>
          </Modal>
      </div>
    );
  }
}

function mapStateToProps(state){
  const { user } = state.authentication;
  const { trips } = state.users;
  // Get Trip id from params -> pass it in as OwnProps
  // Use a filter to then grab that specific trip with TripID
  // Set a new state: selectedTrip: []; or overwrite the trips state.
  const trip = state.users.trips[0];
  const { activities } = state.users;
  return {
    user
  };
}

const connectedTripPage = connect(mapStateToProps)(TripPage);
export { connectedTripPage as TripPage };
