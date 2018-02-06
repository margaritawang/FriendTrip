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
  render(){
    const { activities } = this.props;
    const tripId = this.props.tripId;
    return (
      <div>
      <DragCard text="TESTING THIS" />
      <Grid container columns={2} stackable>
        <Grid.Column>
          <Segment><CalendarComp tripId={tripId}/></Segment>
        </Grid.Column>
      <Grid.Column>
        <Segment>
          <Grid columns={1} stackable>
            <Grid.Column>
              {
                activities.map(function(activity){
                  return (<DragCard text="TESTING THIS" />);
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
  return {user, activities, msgs};
}


// Export the wrapped component:
const connectedCalendarPage = connect(mapStateToProps)(CalendarPage);
export { connectedCalendarPage as CalendarPage };

// <ActivityBadgeNoComments activity={activity} />