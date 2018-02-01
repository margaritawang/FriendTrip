import { planConstants } from '../_constants';

export function plan(state = {}, action) {
  switch (action.type) {
    case planConstants.ADD_NEW_PLAN_REQUEST:
    return { addingNewPlan: true};
    case planConstants.ADD_NEW_PLAN_SUCCESS:
    return { addedNewPlan: true, items: action.plan};
    default:
      return state
  }
}
