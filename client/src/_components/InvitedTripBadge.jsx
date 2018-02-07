import React from 'react';
import { Button, Card, Icon, Image, Header } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import { history } from '../_helpers';


export class InvitedTripBadge extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const trip = this.props.trip;
    return (
      <Card>
        <Image src={trip.imgURL} className="trip-badge-image" />
        <Card.Content>
          <Header as='h2' onClick={() => { history.push(`/trips/${trip.id}`)}}>
            {trip.location}
          </Header>
          <Card.Meta>
            <span className='date'>
              {compareDates(trip.start_date, trip.end_date) ? <Moment format="MMMM, YYYY">{trip.start_date}</Moment> : <div><Moment format="MMMM, YYYY">{trip.start_date}</Moment> - &nbsp;<Moment format="MMMM, YYYY">{trip.end_date}</Moment></div>}
            </span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            {trip.friends} Other Friends on this Trip
          </a>
        </Card.Content>
      </Card>
    );
  }
}

function compareDates(start_date, end_date){
  const startDateArray = start_date.split('-');
  const endDateArray = end_date.split('-');
  return startDateArray[0] === endDateArray[0] && startDateArray[1] === endDateArray[1];
}
