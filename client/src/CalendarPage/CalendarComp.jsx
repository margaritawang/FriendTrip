import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Header, Image, Table } from 'semantic-ui-react';
import Moment from 'react-moment';
import { ActivityDropContainer } from './ActivityDropContainer';

class CalendarComp extends Component{
  // constructor(props){
  //   super(props);

  //   this.isDropped = this.isDropped.bind(this);
  //   this.handleDrop = this.handleDrop.bind(this);
  //   this.state = {
  //     scheduledActivities: []
  //   }
  // }

  // isDropped(activityId){
  //   return this.state.scheduledActivities.indexOf(activityId) > -1;
  // }

  // handleDrop(props){
  //   console.log("Handle Drop: ", props);
  // }

  render(){
    // const tripId = this.props.tripId;
    // const trips = this.props.trips;
    // const trip = trips.filter(
    //   (trip) => {
    //     if(trip.id === Number(tripId)) {
    //       return true
    //     }
    //   })[0];
    // const datesArray = [];
    // console.log(trip);
    // const numberOfDays = Math.round(Math.abs((Date.parse(trip.start_date) - Date.parse(trip.end_date))/(24*60*60*1000)));
    // const startDate = Date.parse(trip.start_date);
    // const dateOfStartDate = new Date(startDate);
    // for(let i = 0; i < numberOfDays; i++){
    //   let newDate = new Date(dateOfStartDate.getFullYear(), dateOfStartDate.getMonth(), (dateOfStartDate.getDay() + i));
    //   datesArray.push({ date: newDate, activities: [] } );
    // }
    // console.log(datesArray);

    const datesArray = this.props.schedule;
    const handleDrop = this.props.handleDrop;

    return (
      <div>

      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Activities</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
        {
          datesArray.map((element, index, array) => {
            return (
              <Table.Row key={index}>
                <Table.Cell key={index}>
                  <Header as='h4' key={index}>
                    <Header.Content key={index}>
                      <Moment format="MMM, DD" key={index}>{element.date}</Moment>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell key={(-1 * index) - 1}>
                  <ActivityDropContainer key={index} date={element.date} onDrop={(item, element) => {handleDrop(item, element)}} activities={element.activities}/>
                </Table.Cell>
              </Table.Row>
            )
          })
        }
        </Table.Body>
      </Table>
      </div>);
  }
}

function mapStateToProps(state){
  const {user} = state.authentication;
  const { trips } = state.users;
  const { activities } = state.users;
  return {
    trips,
    activities
  }
}

const connectedCalendarComp = connect(mapStateToProps)(CalendarComp);
export { connectedCalendarComp as CalendarComp };