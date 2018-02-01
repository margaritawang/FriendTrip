import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'


export class TripBadge extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const activity = this.props.trip;
    
    return (
      <Card>
        <Card.Content>
          <Card.Header as={Link} to={`/trips/${trip.id}`}>
            Activity descriptions goes here.
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {activity.owner}
            </span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          Activity Comments goes here.
        </Card.Content>
      </Card>
    );
  }
}