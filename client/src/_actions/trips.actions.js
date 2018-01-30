import { tripConstants } from '../_constants/trips.constants';
import { tripService } from '../_services/trips.service';

export const tripActions = {
  getAllTrips
}

function getAllTrips(){
  return dispatch => {
    dispatch(request());

    tripService.getAllTrips()
      .then(
          trips => dispatch(success(trips)),
          error => dispatch(failure(error))
        );
  };

  function request() { return { type: tripConstants.GETALL_TRIPS_REQUEST } }
  function success(trips) { return { type: tripConstants.GETALL_TRIPS_SUCCESS, trips } }
  function failure(error) { return { type: tripConstants.GETALL_TRIPS_FAILURE, error } }
}