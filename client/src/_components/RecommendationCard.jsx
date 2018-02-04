import React, { Component } from 'react';

import {Button,
        Comment,
        Form,
        Card,
        Image
      } from 'semantic-ui-react';



export class RecommendationCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const info = this.props.info;
    return(
      <Card>
        <img src={'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+ info.reference +'&key=AIzaSyAiNKWqw1War5KlsaCnkyig2Niafvi4zXg'}/>
          <Card.Header>
            {info.name}
          </Card.Header>
          <Card.Description>
            Address: {info.formatted_address}
          </Card.Description>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'>Approve</Button>
            </div>
          </Card.Content>
      </Card>
    )
  }
}
