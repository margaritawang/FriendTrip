import React from 'react';
import { Card, Icon, Image, Header, Label } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import { CommentContainer} from './CommentContainer.jsx'

export class ActivityBadge extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const activity = this.props.activity;

    return (
      <Card>
        <Card.Content>
          <Card.Header>
            {activity.description}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              
            </span>
            <div>
              <Label as='a' color='blue' image>
                Restaurant
              </Label>
              <Label as='a' color='teal' image>
                Attraction
              </Label>
              <Label as='a' color='yellow' image>
                Highly Rated!
              </Label>
            </div>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <CommentContainer/>
        </Card.Content>
      </Card>
    );
  }
}
