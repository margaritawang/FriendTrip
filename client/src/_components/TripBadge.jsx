import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'


export class TripBadge extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const trip = this.props.trip;
    // console.log(trip.trip);
    // let TripDate = null;
    // if(compareDates(trip.start_date, trip.end_date)){
    //   TripDate = <Moment format="MMMM, YYYY">{trip.start_date}</Moment>;
    // }else{
    //   TripDate = <div>
    //                     <Moment format="MMMM, YYYY">{trip.start_date}</Moment>
    //                     <Moment format="MMMM, YYYY">{trip.end_date}</Moment>
    //                     </div>;
    // }
    return (
      <Card>
        <Image src={trip.imgURL} className="trip-badge-image" />
        <Card.Content>
          <Card.Header as={Link} to='/trips/'>
            {trip.location}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {compareDates(trip.start_date, trip.end_date) ? <Moment format="MMMM, YYYY">{trip.start_date}</Moment> : <div><Moment format="MMMM, YYYY">{trip.start_date}</Moment> - &nbsp;<Moment format="MMMM, YYYY">{trip.end_date}</Moment></div>}
            </span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            2 Other Friends on this Trip
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