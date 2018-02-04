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
        <Image size='mini' src={info.icon}/>
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
