import React, { Component } from 'react';
import { RecommendationCard } from './RecommendationCard.jsx';

import {Button,
        Comment,
        Form,
        Card,
        Image
      } from 'semantic-ui-react';

export class Recommendation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log("user", this.props.user);
    const user = this.props.user;
    const tripId = this.props.tripid;
    const dispatch = this.props.dispatch;
    const activities = this.props.activities;
    // console.log('tripid', this.props.tripid);
    return (
      <Card.Group>
        {

          this.props.recommendations.map((item,index) => {
            console.log('render'+ index);
            return (<RecommendationCard  activities={activities} dispatch={dispatch} user={user} tripid={tripId} info={item}/>)
          })


        }
      </Card.Group>
    )
  }

}
