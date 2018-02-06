import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../_actions';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from 'semantic-ui-react'

const HomepageHeading = () => (<Container text="text">
  <Header as='h1' content='PLAN RIGHT' inverted="inverted" style={{
      fontSize: '4em',
      fontWeight: 'normal',
      marginBottom: 0,
      marginTop: '3em'
    }}/>
  <Header as='h2' content='Do whatever you want when you want to.' inverted="inverted" style={{
      fontSize: '1.7em',
      fontWeight: 'normal',
      marginTop: '1.5em'
    }}/>
  <Button  inverted size='huge'>
    Get Started
    <Icon name='right arrow'/>
  </Button>
</Container>)

const HomepageNavbar = () => (<Container>
  <Header component='h1' className='inverted'>
    <h1 className='logo'>FriendTrip</h1>
  </Header>
  <div className='nav-buttons'>

    <div className='nav-button'>
      <Button className='inverted' as={Link} to='/login'>Login
      </Button>
    </div>
    <div className='nav-button'>
      <Button className='inverted' as={Link} to='/register'>Register
      </Button>
    </div>


  </div>
</Container>)


const HomepageContent = () => (
  <Container fluid style={{
      padding: '8em 0em'
    }} vertical="vertical" className='home-content'>
    <Grid container="container" stackable="stackable" verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as='h3' style={{
              fontSize: '2em'
            }}>We Help Companies and Companions</Header>
          <p style={{
              fontSize: '1.33em'
            }}>
            We can give your company superpowers to do things that they never thought possible. Let us delight your customers and empower your needs... through pure data analytics.
          </p>
          <Header as='h3' style={{
              fontSize: '2em'
            }}>We Make Bananas That Can Dance</Header>
          <p style={{
              fontSize: '1.33em'
            }}>
            Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.
          </p>
        </Grid.Column>
        <Grid.Column floated='right' width={6}>
          <Image bordered="bordered" rounded="rounded" size='large' src='/assets/images/wireframe/white-image.png'/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Button size='huge'>Check Them Out</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>)

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }
  handleDeleteUser(id) {
    return(e) => this.props.dispatch(userActions.delete(id));
  }
  render() {
    const {user, users} = this.props;
    return (
      <Responsive>
        <Container fluid className="mainSeg vertical center aligned">
          <HomepageNavbar/>
          <HomepageHeading/>
        </Container>
        <HomepageContent />
      </Responsive>)
  }
}

function mapStateToProps(state) {
  const {users, authentication} = state;
  const {user} = authentication;
  return {user, users};
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export {
  connectedHomePage as HomePage
};
