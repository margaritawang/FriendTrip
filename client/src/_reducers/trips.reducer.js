import { tripConstants } from '../_constants/trips.constants.js';

export function trips(state = {}, action) {
  switch (action.type) {
    case tripConstants.GETALL_TRIPS_REQUEST:
      return {
        loading: true
      };
    case tripConstants.GETALL_TRIPS_SUCCESS:
      return {
        items: action.trips
      };
    case tripConstants.GETALL_TRIPS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
