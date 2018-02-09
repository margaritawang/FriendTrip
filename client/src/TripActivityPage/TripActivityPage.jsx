import React, {Component} from 'react';
import {ActivityBadge} from '../_components';
import {Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';

class TripActivityPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {activities} = this.props;
    return (<Grid container="container" columns={3} style={{
        marginTop: '3em'
      }} stackable="stackable">
      {
        activities && activities.map(activity => {
          return (<Grid.Column key={activity.id}>
            <ActivityBadge handleDelete={this.props.handleDelete} key={activity.id} activity={activity}/>
          </Grid.Column>)
        })
      }
    </Grid>)
  }
}

function mapStateToProps(state) {
  const {activities} = state.users;
  return {activities};
}

const connectedTripActivityPage = connect(mapStateToProps)(TripActivityPage);
export {
  connectedTripActivityPage as TripActivityPage
};
