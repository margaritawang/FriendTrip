import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { planActions } from '../_actions';
import {userActions} from '../_actions';

class PlanPage extends React.Component {
  constructor(props) {
    super(props);
    this.addPlan = this.addPlan.bind(this);
  }

  addPlan() {
    const { dispatch } = this.props;
    dispatch(planActions.addNewPlan('new plan'));
  }


  render() {
    const { user } = this.props
    const { plan } = this.props
    return (
      <div>plan
        {console.log(plan)}
        <button onClick={this.addPlan}>add new plan</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { plan, authentication } = state;
  const { user } = authentication;
  return {
    plan,
    user
  }
}

const connectedPlanPage = connect(mapStateToProps)(PlanPage);

export {
  connectedPlanPage as PlanPage
}
