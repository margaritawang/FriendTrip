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
    {console.log("recomend data", this.props.recommendations)}
    return (
      <Card.Group>
        {
          this.props.recommendations.map((item,index) => {
            console.log('render'+ index);
            return (<RecommendationCard info={item}/>)
          })
        }
      </Card.Group>
    )
  }

}
