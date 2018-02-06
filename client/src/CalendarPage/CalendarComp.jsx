import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Header, Image, Table } from 'semantic-ui-react';
import Moment from 'react-moment';
import { ActivityDropContainer } from './ActivityDropContainer';

class CalendarComp extends Component{


  render(){
    const tripId = this.props.tripId;
    const trips = this.props.trips;
    const trip = trips.filter(
      (trip) => {
        if(trip.id === Number(tripId)) {
          return true
        }
      })[0];
    const datesArray = [];
    console.log(trip);
    const numberOfDays = Math.round(Math.abs((Date.parse(trip.start_date) - Date.parse(trip.end_date))/(24*60*60*1000)));
    const startDate = Date.parse(trip.start_date);
    const dateOfStartDate = new Date(startDate);
    for(let i = 0; i < numberOfDays; i++){
      datesArray.push(new Date(dateOfStartDate.getFullYear(), dateOfStartDate.getMonth(), (dateOfStartDate.getDay() + i)));
    }
    return (
      <div>
      <ActivityDropContainer />
      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Activities</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
        {
          datesArray.map((date) => {
            return (
              <Table.Row key={date}>
                <Table.Cell key={date}>
                  <Header as='h4' key={date}>
                    <Header.Content key={date}>
                      <Moment format="MMM, DD" key={date}>{date}</Moment>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>

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