import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {tripActions} from '../_actions';
import {userActions} from '../_actions';

import {
  Card,
  Icon,
  Image,
  Container,
  Button,
  Form,
  Input
} from 'semantic-ui-react'

class PlanPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: '',
      templan: []
    }
    this.addPlan = this.addPlan.bind(this);
    this.changePlan = this.changePlan.bind(this);
  }
  addPlan(e) {
    e.preventDefault();
    const {dispatch} = this.props;
    dispatch(tripActions.addNewTrip(this.state.plan));
  }
  changePlan(e) {
    const {value} = e.target
    this.setState({plan: value});
  }
  render() {
    const {user} = this.props
    const {trip} = this.props
    const plans = this.state.templan
    return (<Container>
      <Card>
        <Image src='https://www.st-christophers.co.uk/__data/assets/image/0010/485623/pano-london-compressed.jpg'/>
        <Card.Content>
          <Card.Header>
            Matthew
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              Joined in 2015
            </span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra="extra">
          <a>
            <Icon name='user'/>
            22 Friends
          </a>
        </Card.Content>
      </Card>
      <Form onSubmit={this.addPlan}>
        <Input onChange={this.changePlan}/>
        <Button>Add Trip</Button>
      </Form>
    </Container>)
  }
}

function mapStateToProps(state) {
  const {trip, authentication} = state;
  const {user} = authentication;
  return {trip, user}
}

const connectedPlanPage = connect(mapStateToProps)(PlanPage);

export {
  connectedPlanPage as PlanPage
}
