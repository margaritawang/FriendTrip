import React from 'react';
import {Card, Icon, Image, Header, Label} from 'semantic-ui-react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {userActions} from '../_actions/user.actions.js';

function renderCategory(category) {
  if (category === "Restaurant") {
    return (<Label as='a' color='blue' image="image">
      Restaurant
    </Label>)
  } else if (category === "Attraction") {
    return (<Label as='a' color='teal' image="image">
      Attraction
    </Label>)
  } else {
    return (<Label as='a' color='yellow' image="image">
      Accommodation
    </Label>)
  }
}

class ActivityBadgeNoComments extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const activity = this.props.activity;
    return (<Card style={{
        margin: '5px',
        width: '100%'
      }}>
      <Card.Content>
        <Card.Header>
          {activity.description}
        </Card.Header>
        <Card.Meta>
          <div>
            {renderCategory(activity.category)}
          </div>
        </Card.Meta>
      </Card.Content>
    </Card>);
  }
}

function mapStateToProps(state) {
  const {user} = state.authentication;
  return {user}
}

const connectedActivityBadge = connect(mapStateToProps)(ActivityBadgeNoComments);
export {
  connectedActivityBadge as ActivityBadgeNoComments
};
