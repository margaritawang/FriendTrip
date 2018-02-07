import React from 'react';
import { Card, Icon, Image, Header, Label } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import { CommentContainer} from './CommentContainer.jsx'
import { connect } from 'react-redux';
import { userActions } from '../_actions/user.actions.js';

function renderCategory (category) {
  if (category === "Restaurant") {
    return (
      <Label as='a' color='blue' image>
        Restaurant
      </Label>
    )
  } else if  (category === "Attraction") {
    return (
      <Label as='a' color='teal' image>
        Attraction
      </Label>
    )
  } else {
    return (
      <Label as='a' color='yellow' image>
        Accommodation
      </Label>
    )
  }
}




class ActivityBadge extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const { activity, user } = this.props;
    this.props.dispatch(userActions.getAllComments(user, activity));
  }



  render() {
    const activity = this.props.activity;
    const { comments } = this.props;

    return (
      <Card>
        <Card.Content>
          <Card.Header>
            {activity.description}
            <Icon name='trash' size='large' className="delete-button" onClick={() => this.props.handleDelete(activity.id)}/>
          </Card.Header>
          <Card.Meta>
            <span className='date'>

            </span>
            <div>
            {renderCategory(activity.category)}
            </div>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <CommentContainer activityId={activity.id}/>
        </Card.Content>
      </Card>
    );
  }
}


function mapStateToProps(state){
  const { user } = state.authentication;
  const { comments } = state.users;
  return {
    user,
    comments
  }
}

const connectedActivityBadge = connect(mapStateToProps)(ActivityBadge);
export { connectedActivityBadge as ActivityBadge };
