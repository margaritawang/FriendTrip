import { tripConstants } from '../_constants';

export function trip(state = {}, action) {
  switch (action.type) {
    case tripConstants.ADD_NEW_TRIP_REQUEST:
    return { addingNewTrip: true};
    case tripConstants.ADD_NEW_TRIP_SUCCESS:
    return { addedNewTrip: true, items: action.trip};
    default:
      return state
  }
}
