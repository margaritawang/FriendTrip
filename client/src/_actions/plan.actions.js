import { planConstants } from '../_constants';

export const planActions = {
  addNewPlan
}

function addNewPlan(plan) {
  return dispatch => {
      dispatch(request({ plan }));
      // service
      dispatch(success(plan));
      // if error dispatch failure
  }
  function request(plan) { return {type: planConstants.ADD_NEW_PLAN_REQUEST, plan}}
  function success(plan) { return {type: planConstants.ADD_NEW_PLAN_SUCCESS, plan}}
}
