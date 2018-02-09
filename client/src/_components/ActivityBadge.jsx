import React from 'react';
import { Card, Icon, Image, Header, Label, Button } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import { CommentContainer} from './CommentContainer.jsx'
import { connect } from 'react-redux';
import { userActions } from '../_actions/user.actions.js';

function renderCategory (category) {
  if (category === "Restaurant") {
    return (
      <Label color='blue' image>
        Restaurant
      </Label>
    )
  } else if  (category === "Attraction") {
    return (
      <Label color='teal' image>
        Attraction
      </Label>
    )
  } else {
    return (
      <Label color='yellow' image>
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
        <Card.Content className='recommendationCard' style = {{
            padding: '0px'
          }}>
          {activity.imgURL ? <img className='recommendationImageWidth' src={activity.imgURL} style={{
              paddingTop: '0px',
              paddingLeft: '0px',
              paddingRight: '0px',
              paddingBottom: '0px'
            }}/> : "" }
          <Card.Header style={{padding: '10px'}}>
            {activity.description}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
            </span>
            {renderCategory(activity.category)}
           <Button animated='fade' basic color='red' size="mini" style={{float: 'right'}} onClick={() => this.props.handleDelete(activity.id)}>
              <Button.Content hidden>Delete</Button.Content>
              <Button.Content visible>
                <Icon name='trash'/>
              </Button.Content>
            </Button>
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
