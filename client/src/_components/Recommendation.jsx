import React, {Component} from 'react';
import {RecommendationCard} from './RecommendationCard.jsx';
import {Progress} from 'semantic-ui-react';
import {connect} from 'react-redux';

import {Button, Comment, Form, Card, Image} from 'semantic-ui-react';

class Recommendation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {user, dispatch, activities, recommendations, comments} = this.props;
    const tripId = this.props.tripid;
    return (<Card.Group>
      {
        user && activities && tripId && recommendations && recommendations.map((item, index) => {
          console.log('render' + index);
          return (<RecommendationCard activities={activities} dispatch={dispatch} user={user} tripid={tripId} info={item}/>)
        })
      }
    </Card.Group>)
  }
}

function mapStateToProps(state) {
  const {user} = state.authentication;
  const {recommendations, activities, comments} = state.users;
  return {recommendations, activities, user, comments};
}

const connectedRecommendation = connect(mapStateToProps)(Recommendation);
export {
  connectedRecommendation as Recommendation
};
