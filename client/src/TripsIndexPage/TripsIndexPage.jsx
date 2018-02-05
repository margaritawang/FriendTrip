import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {userActions} from '../_actions/user.actions.js';
import {TripBadge} from '../_components';
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
  Tab
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
      modalOpen: false
    };
    // Bind any functions here.
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleSubmit(e){
    e.preventDefault();
    const {location, start_date, end_date} = this.state
    const {dispatch, user} = this.props;
    const tripInfo = {
      location: location,
      start_date: start_date,
      end_date: end_date
    };

    // console.log('tripinfo', tripInfo);
    dispatch(userActions.createNewTrip(user ,tripInfo))
    this.setState({
      submittedLocation: location,
      submittedStart_date: start_date,
      submittedEnd_date: end_date,
      location: '',
      start_date: '',
      end_date: '',
      modalOpen: false
    })
  }

  handleDelete(tripid){
    console.log('clicked delete', tripid);
    const { dispatch } = this.props;
    dispatch(userActions.deleteTrip(tripid));
  }

  componentDidMount() {
    const {user} = this.props;
    this.props.dispatch(userActions.getAllTrips(user));
  }

  render() {
    const { user, trips } = this.props;
    console.log(user);
    console.log(trips);
    const ownedTrips = trips.filter(trip => trip.owner_id === user.id);
    const invitedTrips = trips.filter(trip => trip.owner_id !== user.id);
    const { location, start_date, end_date, submittedLocation, submittedStart_date, submittedEnd_date } = this.state;
    const panes = [
      { menuItem: 'My Trips', render: () => <Tab.Pane>{
        <Grid container columns={3} style={{ marginTop: '2em' }} stackable>
          {ownedTrips.map(trip => {
            return (
              <Grid.Column key={trip.id}>
                <TripBadge key={trip.id} trip={trip} handleDelete={this.handleDelete}/>
              </Grid.Column>
            )
          })}
        </Grid>}
      </Tab.Pane>},
      { menuItem: "Invited Trips", render: () => <Tab.Pane>{
        <Grid container columns={3} style={{ marginTop: '2em' }} stackable>
        {invitedTrips.map(trip => {
          return (
            <Grid.Column key={trip.id}>
              <TripBadge key={trip.id} trip={trip} handleDelete={this.handleDelete}/>
            </Grid.Column>
          )
        })}
        </Grid>}
      </Tab.Pane>}
    ];
    return (
      <div>
        <Menu fixed='top' inverted color='blue'>
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
        <Tab panes={panes} style={{ marginTop: '7em' }} />
        {/* <Grid container columns={3} style={{ marginTop: '7em' }} stackable>
          {
            trips.map(trip => {
              return (
                <Grid.Column key={trip.id}>
                  <TripBadge key={trip.id} trip={trip} handleDelete={this.handleDelete}/>
                </Grid.Column>
              )
            })
          }
        </Grid> */}
          <Modal trigger={<Button icon='add' onClick={this.handleOpen} className="primary-btn-fab"/>}
              open={this.state.modalOpen}
              onClose={this.handleClose}
            >
            <Modal.Header>Create a Trip</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field id='form-input-control-first-name' control={Input} name='location' label='Location' placeholder='Location' value={location} onChange={this.handleChange} required/>
                <Form.Field id='form-input-control-start-date' control={Input} name='start_date' label='Start Date' placeholder='2018-07-12' value={start_date} onChange={this.handleChange} required/>
                <Form.Field id='form-input-control-end-date' control={Input} name='end_date' label='End Date' placeholder='2018-07-22' value={end_date} onChange={this.handleChange} required/>
                <Form.Field id='form-button-control-public' control={Button} content='Create'/>
              </Form>
            </Modal.Content>
          </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {user} = state.authentication;
  const {trips} = state.users;
  return {user, trips};
}

const connectedTripsPage = connect(mapStateToProps)(TripsPage);
export {
  connectedTripsPage as TripsPage
};
