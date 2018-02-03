import { tripConstants } from '../_constants';

export const tripActions = {
  addNewTrip
}

function addNewTrip(trip) {
  return dispatch => {
      dispatch(request({ trip }));
      console.log("addnewtrip", trip);
      dispatch(success(trip));
  }
  function request(trip) { return {type: tripConstants.ADD_NEW_TRIP_REQUEST, trip}}
  function success(trip) { return {type: tripConstants.ADD_NEW_TRIP_SUCCESS, trip}}
}
