import { tripConstants } from '../_constants';

export const tripActions = {
  addNewTrip
}

function addNewTrip(trip) {
  return dispatch => {
      dispatch(request({ trip }));
      // service
      console.log("addnewtrip", trip);
      dispatch(success(trip));
      // if error dispatch failure
  }
  function request(trip) { return {type: tripConstants.ADD_NEW_TRIP_REQUEST, trip}}
  function success(trip) { return {type: tripConstants.ADD_NEW_TRIP_SUCCESS, trip}}
}
