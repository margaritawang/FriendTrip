import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Menu, Segment, Container, Header } from 'semantic-ui-react'

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }
    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }
    render() {
        const { user, users } = this.props;
        return (
          <Segment className="mainSeg inverted vertical center aligned">
          <Header component='h1'className='inverted'><h1 className='logo'>FriendTrip</h1></Header>
           <Container>
             <Menu className='inverted large nav'>
               <Menu.Item name='Info' />
               <Menu.Item name='Login'/>
               <Menu.Item name='SignUp'/>
             </Menu>
           </Container>
           <Container className='text planRight'>
             <Header component='h1'className='inverted vertical center aligned'>
               <h1 className='pr'>PLAN RIGHT</h1>
             </Header>
             <Header component='h2'className='inverted vertical center aligned'>
               Do whatever you want when you want to.
             </Header>

           </Container>


          </Segment>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
