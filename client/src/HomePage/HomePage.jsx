import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

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
          <div>
            <input id="anPageName" name="page" type="hidden" value="desktop" />
            <div className="desktop">
              <div>
                <div className="rectangle">
                </div>
                <div className="tell-us-where-you-ar">
                  Tell us where you are strating from and where you
                  <br/> want to go and we’ll find the best route
                  <br/> to get you there
                </div>
                <div className="h-ome">
                  HOME
                </div>
                <div className="t-rip">
                  TRIP
                </div>
                <div className="l-ogin">
                  LOGIN
                </div>
                <div className="sign-up">
                  SIGN UP
                </div>
                <div className="main">
                  PLAN RIGHT
                </div>
              </div>
            </div>
          </div>
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
