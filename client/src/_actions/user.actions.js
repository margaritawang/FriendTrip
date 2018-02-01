import { userConstants } from '../_constants';
import { userService, tripService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    face,
    login,
    logout,
    register,
    getAll,
    delete: _delete,
    getAllTrips,
    createNewTrip,
    getAllActivities
};

function face(buffer) {
  return dispatch => {
    userService.faceCompare(buffer).
    then(
      (data) => {
        console.log("data",data);
        dispatch(success({name: 'sen'}));
        history.push('/');
      },
      error => {
        dispatch(failure("error"));
        dispatch(alertActions.error("error"));
      }
    )
  }
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }}
}


function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/trips');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }}
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    console.log('userrr-----', user);
                    dispatch(success(user));
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function getAllTrips(user){
  return dispatch => {
    dispatch(request());

    tripService.getAllTrips(user)
      .then(trips => dispatch(success(trips)))
      .catch(error => dispatch(failure(error)));
  };

  function request() { return { type: userConstants.GETALL_TRIPS_REQUEST } }
  function success(trips) { return { type: userConstants.GETALL_TRIPS_SUCCESS, trips } }
  function failure(error) { return { type: userConstants.GETALL_TRIPS_FAILURE, error } }
}

function createNewTrip(user, tripInfo){
    return dispatch => {
        dispatch(request());

        //tripService.createNewTrip(user, tripInfo)
            //.then(() => dispatch(success(tripInfo)))
            //.catch(error => dispatch(failure(error)));
        dispatch(success(tripInfo));
        dispatch(failure(tripInfo));
    };
  function request() { return { type: userConstants.CREATE_NEW_TRIP_REQUEST } }
  function success(trip) { return { type: userConstants.CREATE_NEW_TRIP_SUCCESS, trip } }
  function failure(error) { return { type: userConstants.CREATE_NEW_TRIP_FAILURE, error } }
}

function getAllActivities(user, trip){
    console.log(user, trip);
    return dispatch => {
        dispatch(request());
    
        tripService.getAllActivities(trip)
          .then(activities => dispatch(success(activities)))
          .catch(error => dispatch(failure(error)));
      };
    
      function request() { return { type: userConstants.GETALL_TRIP_ACTIVITIES_REQUEST } }
      function success(activities) { return { type: userConstants.GETALL_TRIP_ACTIVITIES_SUCCESS, activities } }
      function failure(error) { return { type: userConstants.GETALL_TRIP_ACTIVITIES_FAILURE, error } }
}