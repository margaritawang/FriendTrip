import React, {Component} from 'react';
import {userActions} from '../_actions/user.actions.js';
import {Button, Comment, Form, Card, Image} from 'semantic-ui-react';

function renderButton(activities, recommendation, callback) {
  for (let i of activities) {
    if (i.description === recommendation) {
      return (<Button disabled="disabled">Saved</Button>)
    }
  }
  return (<Button onClick={callback} basic="basic" color='green'>Save to Activities</Button>)
}

export class RecommendationCard extends Component {
  constructor(props) {
    super(props);
    this.addRecommendation = this.addRecommendation.bind(this);
  }
  addRecommendation(activity, imgURL) {
    const tripid = this.props.tripid;
    const {dispatch, user} = this.props;
    const activityInfo = {
      tripId: tripid,
      description: activity,
      imgURL: imgURL
    };
    dispatch(userActions.createNewActivity(user, activityInfo))
  }

  render() {
    const info = this.props.info;
    const activities = this.props.activities;
    console.log(activities);
    return (<Card className='recommendationCard'>
      {
        (info.photos)
          ? <img className='recommendationImage' src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${info.photos[0].photo_reference}&key=AIzaSyAiNKWqw1War5KlsaCnkyig2Niafvi4zXg`}/>
          : <p>Missing image</p>
      }
      <Card.Header>
        <h4>{info.name}</h4>
      </Card.Header>
      <Card.Description>
        Address: {info.formatted_address}
      </Card.Description>
      <Card.Content extra="extra">
        <div className='ui two buttons'>
          {renderButton(activities, info.name, () => this.addRecommendation(info.name, `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${info.photos[0].photo_reference}&key=AIzaSyAiNKWqw1War5KlsaCnkyig2Niafvi4zXg`))}
        </div>
      </Card.Content>
    </Card>)
  }
}
