import React from 'react';
import { Card, Icon, Image, Header, Label } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import { CommentContainer} from './CommentContainer.jsx'

export class ActivityBadge extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const activity = this.props.activity;
    // console.log(activity);
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            {activity.description}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {activity.start_date}
            </span>
            <div>
            {((activity) => {
              switch (activity.category) {
                case "Restaurant": return (
                  <Label as='a' color='blue' image>
                    Restaurant
                  </Label>
                );
                case "Attraction": return(
                  <Label as='a' color='teal' image>
                    Attraction
                  </Label>
                );
                case "Accommodation": return(
                  <Label as='a' color='yellow' image>
                    Accommodation
                  </Label>
                )
              }
            })}
            </div>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <CommentContainer/>
        </Card.Content>
      </Card>
    );
  }
}
