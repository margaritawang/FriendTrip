import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {userActions} from '../_actions/user.actions.js';
import {ActivityBadge} from '../_components';
import {MessageList} from '../_components';
import { Recommendation } from '../_components';
import ChatBubble from 'react-chat-bubble';
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
  Progress
} from 'semantic-ui-react'
import { TripActivityPage } from '../TripActivityPage'
import { CalendarPage } from '../CalendarPage';

class TripPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      modalOpen: false,
      message: '',
      percent: 20,
      inviteModalOpen: false,
      email: '',
      submittedEmail: '',
      submittedinviteTrip: ''
    };

    // Bind any functions here.
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleInviteSubmit = this.handleInviteSubmit.bind(this);
    this.handleInviteOpen = this.handleInviteOpen.bind(this);
    this.handleInviteClose = this.handleInviteClose.bind(this);
  }

  toggle() {
    this.setState({ percent: this.state.percent === 20 ? 100 : 0 })
  }


  handleChange(e, {name, value}) {
    this.setState({[name]: value})
  }

  sendMessage(e) {
    const {dispatch, user} = this.props
    dispatch(userActions.sendMessage({user: user.user, message: this.state.message}));
  }

  changeMessage(e) {
    const {value} = e.target
    this.setState({message: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const {description} = this.state
    const {dispatch, user} = this.props;
    const tripId = this.props.match.params.id;
    const activityInfo = {
      tripId: tripId,
      description: description
    };

    dispatch(userActions.createNewActivity(user, activityInfo))

    this.setState({
      ...this.state,
      submittedDescription: description,
      description: '',
      modalOpen: false
    })
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

  // handleOpen() {
  //   this.setState({
  //     ...this.state,
  //     modalOpen: true
  //   })
  // }

  // handleClose() {
  //   this.setState({
  //     ...this.state,
  //     modalOpen: false
  //   })
  // }
  handleInviteSubmit(e){
    console.log('inviting friends!!!');
    e.preventDefault();
    const {email} = this.state;
    const tripId = this.props.match.params.id;
    const {dispatch, user} = this.props;
    const tripInvite = {
      tripid: tripId,
      email: email,
      user: user.id
    };
    // console.log('inviting those guys:', tripInvite);
    dispatch(userActions.inviteFriend(tripInvite));
    this.setState({
      ...this.state,
      inviteModalOpen: false,
      email: '',
      submittedEmail: email
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

  handleDelete(activityId) {
    console.log('clicked delete activity', activityId);
    const { dispatch } = this.props;
    dispatch(userActions.deleteActivity(activityId));
  }

  componentDidMount() {
    const {user} = this.props;
    const tripId = this.props.match.params.id;
    if (user && tripId) {
      this.props.dispatch(userActions.getAllActivities(user, tripId));
    }

    if (tripId) {
      this.props.dispatch(userActions.getRecommendation(tripId));
    }
  }

  render() {
    const { recommendations, user, dispatch, activities, msgs, match:{params: {id: tripId}} } = this.props;
    const { description, email } = this.state;
    const panes = [
      { menuItem: 'Recommendations', render: () => <div className='recommendations'><Tab.Pane><Recommendation tripid={tripId}/></Tab.Pane></div> },
      { menuItem: 'Saved Activities', render: () => <div className='recommendations'><Tab.Pane><TripActivityPage handleDelete={this.handleDelete} activities={activities} /></Tab.Pane></div> },
      { menuItem: 'My Trip', render: () => <Tab.Pane><CalendarPage tripId={tripId}/></Tab.Pane> },
    ];

    const megs =
  [{
        "type" : 0,
        "image": "cat.jpg",
        "text": "Hello! Good Morning!"
    }, {
        "type": 1,
        "image": "dog.jpg",
        "text": "Hello! Good Afternoon!"
    }]
    return (
      <div>
        TripPage
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
            <Modal trigger={<Menu.Item as='a' onClick={this.handleInviteOpen}><Icon name='send' />Invite Friends</Menu.Item>}  
              open={this.state.inviteModalOpen}
              onClose={this.handleInviteClose}
              >
              <Modal.Header>Invite Your Friends to Help Plan the Trip!</Modal.Header>
              <Modal.Content>
                <Form onSubmit={this.handleInviteSubmit}>
                  <Form.Field id='form-input-control-email' control={Input} name='email' label='Email' placeholder='email@example.com' value={email} onChange={this.handleChange} required/>
                  <Form.Field id='form-button-control-public' control={Button} content='Invite'/>
                </Form>
              </Modal.Content>
            </Modal>            
          </Container>
        </Menu>

        <div className="primary-btn">
          <Modal trigger={<Button icon='add' onClick={this.handleOpen} className="primary-btn-fab"/>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            >
            <Modal.Header>Create an Activity</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field id='form-input-control-description' control={TextArea} name='description' label='Description' placeholder='Activity!!' value={description} onChange={this.handleChange} required/>
                <Form.Field id='form-button-control-public' control={Button} content='Create'/>
              </Form>
            </Modal.Content>
          </Modal>
        </div>

        <Grid>

          <Grid.Row>
            <Container>
              <Tab panes={panes} style={{ marginTop: '7em'}} />
            </Container>
          </Grid.Row>
          <Grid.Row>
              <div className='chatBox'>
                <div className='chat-top'>
                  <div className='chat-header'>
                    <Header inverted as='h3' Messages="Messages">MESSAGES</Header>
                  </div>
                </div>
                <MessageList messages={msgs} />
                <Form onSubmit={this.sendMessage}>
                  <Form.Field>
                    <label></label>
                    <input placeholder='Write Something Here...' onChange={this.changeMessage}/>
                  </Form.Field>
                  <Button type='submit'>Message</Button>
                </Form>
              </div>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {user} = state.authentication;
  const {msgs} = state.chat;
  const {activities, recommendations, trips} = state.users;
  return {user, activities, msgs, recommendations};
}

const connectedTripPage = connect(mapStateToProps)(TripPage);
export {
  connectedTripPage as TripPage
};
