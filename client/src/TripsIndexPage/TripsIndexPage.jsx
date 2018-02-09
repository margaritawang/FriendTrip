import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {userActions} from '../_actions/user.actions.js';
import {TripBadge} from '../_components';
import {InvitedTripBadge} from '../_components';
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Menu,
  Segment,
  Step,
  Table,
  Dropdown,
  Popup,
  Form,
  TextArea,
  Input,
  Modal,
  Tab,
  Select
} from 'semantic-ui-react'

class TripsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      start_date: '',
      end_date: '',
      submittedLocation: '',
      submittedStart_date: '',
      submittedEnd_date: '',
      modalOpen: false,
      inviteModalOpen: false,
      email: '',
      inviteTrip: '',
      submittedEmail: '',
      submittedinviteTrip: ''
    };
    // Bind any functions here.
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInviteSubmit = this.handleInviteSubmit.bind(this);
    this.handleInviteOpen = this.handleInviteOpen.bind(this);
    this.handleInviteClose = this.handleInviteClose.bind(this);
    this.getFriends = this.getFriends.bind(this);
  }
  toggle() {
    this.setState({
      percent: this.state.percent === 20
        ? 100
        : 0
    })
  }
  getFriends(tripid) {
    const {dispatch} = this.props;
    dispatch(userActions.getFriends(tripid));
  }
  handleChange(e, {name, value}) {
    this.setState({[name]: value})
  }
  handleOpen() {
    this.setState({
      ...this.state,
      modalOpen: true
    })
  }
  handleClose() {
    this.setState({
      ...this.state,
      modalOpen: false
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const {location, start_date, end_date} = this.state
    const {dispatch, user} = this.props;
    const tripInfo = {
      location: location,
      start_date: start_date,
      end_date: end_date
    };
    dispatch(userActions.createNewTrip(user, tripInfo))
    this.setState({
      submittedLocation: location,
      submittedStart_date: start_date,
      submittedEnd_date: end_date,
      location: '',
      start_date: '',
      end_date: '',
      modalOpen: false,
      inviteModalOpen: false,
      email: '',
      inviteTrip: '',
      submittedEmail: '',
      submittedinviteTrip: ''
    })
  }
  handleDelete(tripid) {
    const {dispatch} = this.props;
    dispatch(userActions.deleteTrip(tripid));
  }
  handleInviteSubmit(e) {
    e.preventDefault();
    const {email, inviteTrip} = this.state;
    const {trips} = this.props;
    const {dispatch, user} = this.props;
    const tripInvite = {
      tripid: inviteTrip,
      email: email,
      user: user.id
    };
    const sendData = {
      email: email,
      sender: user
    }
    dispatch(userActions.inviteFriend(tripInvite));
    dispatch(userActions.sendInvite(sendData));
    this.setState({
      ...this.state,
      inviteModalOpen: false,
      email: '',
      inviteTrip: '',
      submittedEmail: email,
      submittedinviteTrip: inviteTrip
    })
  }
  handleInviteOpen() {
    this.setState({
      ...this.state,
      inviteModalOpen: true
    })
  }
  handleInviteClose() {
    this.setState({
      ...this.state,
      inviteModalOpen: false
    })
  }
  componentDidMount() {
    const {user} = this.props;
    this.props.dispatch(userActions.getAllTrips(user));
  }
  render() {
    const {user, trips} = this.props;
    const ownedTrips = trips.filter(trip => Number(trip.owner_id) === user.id);
    const tripOptions = ownedTrips.map(trip => {
      return ({
        key: trip.id,
        text: trip.location,
        value: trip.id,
        image: {
          avatar: true,
          src: `${trip.imgURL}`
        }
      });
    })
    const invitedTrips = trips.filter(trip => Number(trip.owner_id) !== user.id);
    const {
      location,
      start_date,
      end_date,
      submittedLocation,
      submittedStart_date,
      submittedEnd_date,
      email,
      inviteTrip
    } = this.state;
    const panes = [
      {
        menuItem: 'My Trips',
        render: () => <Tab.Pane>{
              <Grid container="container" columns={3} style={{
                    marginTop: '2em'
                  }} stackable="stackable">
                  {
                    ownedTrips.map(trip => {
                      return (<Grid.Column key={trip.id}>
                        <TripBadge key={trip.id} trip={trip} handleDelete={this.handleDelete}/>
                      </Grid.Column>)
                    })
                  }
                </Grid>
            }
          </Tab.Pane>
      }, {
        menuItem: "Invited Trips",
        render: () => <Tab.Pane>{
              <Grid container="container" columns={3} style={{
                    marginTop: '2em'
                  }} stackable="stackable">
                  {
                    invitedTrips.map(trip => {
                      return (<Grid.Column key={trip.id}>
                        <InvitedTripBadge key={trip.id} trip={trip}/>
                      </Grid.Column>)
                    })
                  }
                </Grid>
            }
          </Tab.Pane>
      }
    ];
    return (<div>
      <Menu fixed='top' inverted="inverted" color='blue'>
        <Container>
          <Menu.Item as='a' header="header">
            FriendTrip
          </Menu.Item>
          <Menu.Item as='a' position='right'><Icon name='user'/>
            Profile</Menu.Item>
          <Modal trigger={<Menu.Item as = 'a' onClick = {
              this.handleInviteOpen
            } > <Icon name='send'/>Invite Friends < /Menu.Item>} open={this.state.inviteModalOpen} onClose={this.handleInviteClose}>
            <Modal.Header>Invite Your Friends!</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleInviteSubmit}>
                <Form.Field id='form-input-control-email' control={Input} name='email' label='Email' placeholder='email@example.com' value={email} onChange={this.handleChange} required="required"/>
                <Form.Select id='form-input-control-inviteTrip' name='inviteTrip' control={Select} fluid="fluid" label='Select A Trip' options={tripOptions} onChange={this.handleChange} required="required"/>
                <Form.Field id='form-button-control-public' control={Button} content='Invite' Icon="Icon" name='group'/>
              </Form>
            </Modal.Content>
          </Modal>
        </Container>
      </Menu>
      <div className='primary-btn'>
        <Modal trigger={<Button icon = 'add' onClick = {
            this.handleOpen
          }
          className = "primary-btn-fab" />} open={this.state.modalOpen} onClose={this.handleClose}>
          <Modal.Header>Create a Trip</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field id='form-input-control-first-name' control={Input} name='location' label='Location' placeholder='Location' value={location} onChange={this.handleChange} required="required"/>
              <Form.Field id='form-input-control-start-date' control={Input} name='start_date' label='Start Date' placeholder='2018-07-12' value={start_date} onChange={this.handleChange} required="required"/>
              <Form.Field id='form-input-control-end-date' control={Input} name='end_date' label='End Date' placeholder='2018-07-22' value={end_date} onChange={this.handleChange} required="required"/>
              <Form.Field id='form-button-control-public' control={Button} content='Create'/>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
      <Tab panes={panes} style={{
          marginTop: '0.5em'
        }}/>
    </div>);
  }
}

function mapStateToProps(state) {
  const {user} = state.authentication;
  const {trips} = state.users;
  const {friends} = state;
  return {user, trips, friends};
}

const connectedTripsPage = connect(mapStateToProps)(TripsPage);
export {
  connectedTripsPage as TripsPage
};
