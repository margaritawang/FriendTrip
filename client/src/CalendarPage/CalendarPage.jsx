// Let's make <Card text='Write the docs' /> draggable!
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragCard } from './DragBadges.jsx';
import { ActivityBadgeNoComments } from './ActivityBadgeNoComments';
import {connect} from 'react-redux';
import {
 Container, Grid, Segment
} from 'semantic-ui-react'
import { CalendarComp } from './CalendarComp';

class CalendarPage extends Component {
  constructor(props){
    super(props);

    this.isDropped = this.isDropped.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    const tripId = this.props.tripId;
    const trips = this.props.trips;
    const trip = trips.filter(
      (trip) => {
        if(trip.id === Number(tripId)) {
          return true
        }
      })[0];
    const datesArray = [];
    const numberOfDays = Math.round(Math.abs((Date.parse(trip.start_date) - Date.parse(trip.end_date))/(24*60*60*1000)));
    const startDate = Date.parse(trip.start_date);
    const dateOfStartDate = new Date(startDate);
    for(let i = 0; i < numberOfDays; i++){
      let newDate = new Date(dateOfStartDate.getFullYear(), dateOfStartDate.getMonth(), (dateOfStartDate.getDay() + i));
      datesArray.push({ date: newDate, activities: [] } );
    }

    this.state = {
      scheduledActivities: [],
      schedule : datesArray
    }
  }

  isDropped(activityId){
    return !!this.state.scheduledActivities.find(element => {
      return element.activity.id === activityId;
    });
  }

  handleDrop(item, element){
    const scheduleIndex = this.state.schedule.findIndex(value => {
      return value.date === element.date
    })
    const newSchedule = this.state.schedule.map((value, index) => {
      if(index === scheduleIndex){
        const newElement = {
          date: value.date,
          activities: value.activities.concat(item)
        }
        return newElement;
      }else{
        return value;
      }
    })

    this.setState({
      scheduledActivities: this.state.scheduledActivities.concat(item),
      schedule : newSchedule
    });
    // [...this.state.schedule, this.state.schedule[scheduleIndex].activities.concat(item)]
    // console.log("HandleDrop Item: ", item);
    // console.log("HandleDrop Element: ", element);
    // element.activities.push(item);
    // console.log("Element's Activities Pushed: ", element);
    console.log("This state:", this.state);
  }

  render(){
    const { activities } = this.props;
    const tripId = this.props.tripId;
    return (
      <div>
        <Grid container columns={2} stackable>
          <Grid.Column>
            <Segment><CalendarComp tripId={tripId} handleDrop={this.handleDrop} schedule={this.state.schedule} /></Segment>
          </Grid.Column>
        <Grid.Column>
          <Segment>
            <Grid columns={1} stackable>
              <Grid.Column>
                {
                  activities.map((activity) => {
                    return (<DragCard isDropped={this.isDropped(activity.id)} text={<ActivityBadgeNoComments activity={activity} />} />);
                  })
                }
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
    );
  }
}

function mapStateToProps(state) {
  const {user} = state.authentication;
  const {msgs} = state.chat;
  const {activities} = state.users;
  const { trips } = state.users;
  return {user, activities, msgs, trips};
}


// Export the wrapped component:
const connectedCalendarPage = connect(mapStateToProps)(CalendarPage);
export { connectedCalendarPage as CalendarPage };

// <ActivityBadgeNoComments activity={activity} />