import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';


class TripBadge extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Card>
        <Image src='/assets/images/avatar/large/matthew.png' />
        <Card.Content>
          <Card.Header>
            Berlin
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              March, 2018
            </span>
          </Card.Meta>
          <Card.Description>
            Berlin is a world class city!
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            2 Other Friends on this Trip
          </a>
        </Card.Content>
      </Card>
    )
  }
}
export default TripBadge;