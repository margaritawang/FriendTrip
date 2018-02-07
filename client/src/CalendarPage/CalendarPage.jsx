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
import {userActions} from '../_actions/user.actions.js';

class CalendarPage extends Component {
  constructor(props){
    super(props);

    this.isDropped = this.isDropped.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    const tripId = this.props.tripId;
    const trips = this.props.trips;
    // Get the specific trip information based on the trip Id
    const trip = trips.filter(
      (trip) => {
        if(trip.id === Number(tripId)) {
          return true
        }
      })[0];

    // Initialize an empty array to hold the dates of the trip
    const datesArray = [];
    // Calculate the total number of days for the trip
    const numberOfDays = Math.round(Math.abs((Date.parse(trip.start_date) - Date.parse(trip.end_date))/(24*60*60*1000)));
    // Get the startDate in a number format
    const startDate = Date.parse(trip.start_date);
    // Convert the number to a Date format
    const dateOfStartDate = new Date(startDate);
    for(let i = 0; i < numberOfDays; i++){
      // Iterate over the number of days, create a new date with adding 1 day each time
      let newDate = new Date(dateOfStartDate.getFullYear(), dateOfStartDate.getMonth(), (dateOfStartDate.getDay() + i));
      // Push each new Date into the Dates Array, setup as an object with a date & an empty array of activities
      datesArray.push({ date: newDate, activities: [] } );
    }

    const { activities } = this.props;
    const scheduledActivities = [];

    activities.forEach((activity) => {
      datesArray.forEach((date) => {
        if(Date.parse(activity.start_date) === Date.parse(date.date) || Date.parse(activity.end_date) === Date.parse(date.date)){
          date.activities.push(activity);
          scheduledActivities.push(activity);
        }
      })

      // Activities start or end date matches a date.
        // Push it to that date's array
      // else do nothing.
    })

    this.state = {
      scheduledActivities: scheduledActivities,
      schedule : datesArray
    }
  }

  isDropped(activityId){
    // Return True or False depending on if the activity has been dropped into the schedule or not.
    return !!this.state.scheduledActivities.find(element => {
      return element.id === activityId;
      // return element.activity.id === activityId;
    });
  }

  handleDrop(item, element){
    const {dispatch} = this.props;
    // Get the index of the schedule (i.e. get the date the activity has been dropped on)
    const scheduleIndex = this.state.schedule.findIndex(value => {
      return value.date === element.date
    })
    // Create a new Schedule array
    const newSchedule = this.state.schedule.map((value, index) => {
      // If the 'date' matches the date you've dropped the item onto.
      if(index === scheduleIndex){
        // Replace that element with a new element which has the updated activities
        const newElement = {
          date: value.date,
          activities: value.activities.concat(item)
        }
        return newElement;
      }else{
        // If the 'dropped' activity exists in a different date
        if (value.activities.find(function (val) {
          return val.id === item.id;
          // return val.activity.id === item.activity.id;
        })) {
          // Then remove it from that date's activities
          return {
            date: value.date,
            activities: value.activities.filter(function (element) {
              return element.id != item.id;
              // return element.activity.id != item.activity.id;
            })
          };
        } else {
          // If not matched, just return the value.
          return value;
        }
      }
    })

    this.setState({
      // Push the dropped activity into the Scheduled Activities state; will no longer display in 'unscheduled'
      scheduledActivities: this.state.scheduledActivities.concat(item),
      // Update the date with the new schedule array.
      schedule : newSchedule
    });
    const newActivity = {
      ...item,
      start_date: this.state.schedule[scheduleIndex].date,
      end_date: this.state.schedule[scheduleIndex].date
    }
    console.log("LITEM: ", item);
    dispatch(userActions.updateActivity(newActivity))
  }

  render(){
    const { activities, tripId } = this.props;
    // const tripId = this.props.tripId;
    return (
      <div>
        <Grid container columns={2} stackable>
          <Grid.Column>
            <Segment><CalendarComp tripId={tripId} handleDrop={this.handleDrop} isDropped={this.isDropped} schedule={this.state.schedule} /></Segment>
          </Grid.Column>
        <Grid.Column>
          <Segment>
            <Grid columns={1} stackable>
              <Grid.Column>
                {
                  activities.map((activity, index) => {
                    return (<DragCard key={index} isDropped={this.isDropped(activity.id)} text={<ActivityBadgeNoComments activity={activity} />} />);
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