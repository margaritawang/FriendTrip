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
    const tripId = this.props.match.params.id;
    const activityInfo = {
      tripId: tripId,
      description: description
    };
    dispatch(userActions.createNewActivity(user, activityInfo))
    this.setState({ submittedDescription: description })
  }

  componentDidMount(){
    const { user } = this.props;
    const tripId = this.props.match.params.id;
    this.props.dispatch(userActions.getAllActivities(user, tripId));
  }



  render() {
    const { user } = this.props;
    const { description } = this.state;
    const { activities } = this.props;
    console.log('amy', activities);
    const tripId = this.props.match.params.id;
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
          {
            activities.map(activity => {
              return (
                <Grid.Column key={activity.id}>
                  <ActivityBadge key={activity.id} activity={activity}/>
                </Grid.Column>
              )
            })
          }
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
  const { activities } = state.users;
  return {
    user,
    activities
  };
}

const connectedTripPage = connect(mapStateToProps)(TripPage);
export { connectedTripPage as TripPage };
