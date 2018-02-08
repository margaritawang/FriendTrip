import {userConstants} from '../_constants';
import {chatConstants} from '../_constants';
import {userService, tripService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';
import { apiService } from '../_services';

export const userActions = {
  face,
  login,
  logout,
  register,
  getAll,
  delete: _delete,
  getAllTrips,
  createNewTrip,
  deleteTrip,
  inviteFriend,
  getAllActivities,
  createNewActivity,
  getAllComments,
  createNewComment,
  receiveMessage,
  sendMessage,
  sendActivity,
  receiveActivity,
  deleteActivity,
  getRecommendation,
  clearAllComments,
  sendComment,
  receiveComment,
  receiveDeleteActivity,
  receiveInvite,
  sendInvite,
  updateActivity,
  getFriends
};

function face(buffer) {
  return dispatch => {
    userService.faceCompare(buffer).then((data) => {
      console.log("face back data", data);
      if (data.error) {
        console.log('face error',data);
        dispatch(failure("error"));
        dispatch(alertActions.error("error"));
      }
      else {
        dispatch(success(data));
        history.push('/trips');
      }
      }, error => {
      dispatch(failure("error"));
      dispatch(alertActions.error("error"));
    })
  }
  function request(user) {
    return {type: userConstants.LOGIN_REQUEST, user}
  }
  function success(user) {
    return {type: userConstants.LOGIN_SUCCESS, user}
  }
  function failure(error) {
    return {type: userConstants.LOGIN_FAILURE, error}
  }
}

function login(username, password) {
  return dispatch => {
    dispatch(request({username}));
    userService.login(username, password).then(user => {
      dispatch(success(user));

      history.push('/trips');
    }, error => {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    });
  };
  function request(user) {
    return {type: userConstants.LOGIN_REQUEST, user}
  }
  function success(user) {
    return {type: userConstants.LOGIN_SUCCESS, user}
  }
  function failure(error) {
    return {type: userConstants.LOGIN_FAILURE, error}
  }
}

function logout() {
  userService.logout();
  return {type: userConstants.LOGOUT};
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(user => {
      dispatch(success(user));
      history.push('/login');
      dispatch(alertActions.success('Registration successful'));
    }, error => {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    });
  };

  function request(user) {
    return {type: userConstants.REGISTER_REQUEST, user}
  }
  function success(user) {
    return {type: userConstants.REGISTER_SUCCESS, user}
  }
  function failure(error) {
    return {type: userConstants.REGISTER_FAILURE, error}
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll().
    then(users => dispatch(success(users)), error => dispatch(failure(error)));
  };

  function request() {
    return {type: userConstants.GETALL_REQUEST}
  }
  function success(users) {
    return {type: userConstants.GETALL_SUCCESS, users}
  }
  function failure(error) {
    return {type: userConstants.GETALL_FAILURE, error}
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService.delete(id).then(user => {
      dispatch(success(id));
    }, error => {
      dispatch(failure(id, error));
    });
  };

  function request(id) {
    return {type: userConstants.DELETE_REQUEST, id}
  }
  function success(id) {
    return {type: userConstants.DELETE_SUCCESS, id}
  }
  function failure(id, error) {
    return {type: userConstants.DELETE_FAILURE, id, error}
  }
}

function getAllTrips(user) {
  return dispatch => {
    console.log('get all trips', user);
    dispatch(request());

    tripService.getAllTrips(user)
    .then(trips => {
      return Promise.all([trips, Promise.all(trips.map(trip => tripService.getFriends(trip.id)))]);
    })
    .then(([trips, friends]) => {
      trips.forEach((trip, index) => {
        trips[index].friends = friends[index].friends;
      });

      dispatch(success(trips));
    })
    .catch(error => dispatch(failure(error)));
  };

  function request() {
    return {type: userConstants.GETALL_TRIPS_REQUEST}
  }
  function success(trips) {
    return {type: userConstants.GETALL_TRIPS_SUCCESS, trips}
  }
  function failure(error) {
    return {type: userConstants.GETALL_TRIPS_FAILURE, error}
  }
}

function createNewTrip(user, tripInfo) {
    return dispatch => {
        dispatch(request());

        tripService.createNewTrip(user, tripInfo)
            .then((response) => {
                console.log("new trip data", response.data);
                dispatch(success(response.data));

            })
            .catch(error => dispatch(failure(error)));
        // dispatch(success(tripInfo));
        // dispatch(failure(tripInfo));
    };
  function request() { return { type: userConstants.CREATE_NEW_TRIP_REQUEST } }
  function success(trip) { return { type: userConstants.CREATE_NEW_TRIP_SUCCESS, trip } }
  function failure(error) { return { type: userConstants.CREATE_NEW_TRIP_FAILURE, error } }
}

function deleteTrip(tripid) {
  return dispatch => {
    dispatch(request());

    tripService.deleteTrip(tripid)
      .then((r) => {
        dispatch(success(tripid));
      }).catch(error => {
        dispatch(failure());
      });
      // dispatch(success(tripid));
      // dispatch(failure());
  }

  function request() { return { type: userConstants.DELETE_TRIP_REQUEST } }
  function success(tripid) { return { type: userConstants.DELETE_TRIP_SUCCESS, tripid } }
  function failure() { return { type: userConstants.DELETE_TRIP_FAILURE } }
}

function inviteFriend(inviteInfo) {
  return dispatch => {
    dispatch(request());
    console.log('invited info-----------------', inviteInfo);
    tripService.inviteFriend(inviteInfo)
    .then(() => {
      dispatch(success());
    }).catch(error => {
      dispatch(failure());
    })
  }
  function request() { return { type: userConstants.INVITE_FRIEND_REQUEST }}
  function success() { return { type: userConstants.INVITE_FRIEND_SUCCESS }}
  function failure() { return { type: userConstants.INVITE_FRIEND_FAILURE }}
}

function getAllActivities(user, trip) {
  console.log(user, trip);
  return dispatch => {
    dispatch(request());

    tripService.getAllActivities(trip).
    then(activities => dispatch(success(activities))).
    catch(error => dispatch(failure(error)));
  };

  function request() {
    return {type: userConstants.GETALL_TRIP_ACTIVITIES_REQUEST}
  }
  function success(activities) {
    return {type: userConstants.GETALL_TRIP_ACTIVITIES_SUCCESS, activities}
  }
  function failure(error) {
    return {type: userConstants.GETALL_TRIP_ACTIVITIES_FAILURE, error}
  }
}

function createNewActivity(user, activityInfo){
  console.log('info',activityInfo);
  return dispatch => {
    dispatch(request());

    tripService.createNewActivity(user, activityInfo)
    .then((response) => {
         console.log('createNewActivityresponse:', response.data);
         console.log('activityinfoooooooo', activityInfo);
         dispatch(success(response.data));
         dispatch(send(response.data));
       //   history.push('/');
       })
    .catch(error => dispatch(failure(error)));
  }

  function request() {
    return {type: userConstants.CREATE_NEW_ACTIVITY_REQUEST}
  }
  function success(activities) {
    return {type: userConstants.CREATE_NEW_ACTIVITY_SUCCESS, activities}
  }
  function failure(error) {
    return {type: userConstants.CREATE_NEW_ACTIVITY_FAILURE, error}
  }
  function send(activity) {
    return { type: chatConstants.SENDING_ACTIVITY, activity}
  }
}

function deleteActivity(activityid) {
  return dispatch => {
    dispatch(request());

    tripService.deleteActivity(activityid)
      .then((r) => {
        dispatch(success(activityid));
        dispatch(send(activityid));
      }).catch(error => {
        dispatch(failure());
      });
      // dispatch(success(tripid));
      // dispatch(failure());
  }

  function request() { return { type: userConstants.DELETE_ACTIVITY_REQUEST } }
  function success(activityid) { return { type: userConstants.DELETE_ACTIVITY_SUCCESS, activityid } }
  function failure() { return { type: userConstants.DELETE_ACTIVITY_FAILURE } }
  function send(activityid) {return {type: chatConstants.DELECTING_ACTIVITY, activityid}}
}

function getAllComments(user, activity){
  return dispatch => {
    dispatch(request());


    tripService.getAllComments(user, activity)
      .then((response) => {
        console.log('get all comments', response);
        dispatch(success(response));
      })
      .catch(error => dispatch(failure(error)));
  }

  function request() {
    return {type: userConstants.GETALL_COMMENTS_REQUEST}
  }
  function success(comments) {
    return {type: userConstants.GETALL_COMMENTS_SUCCESS, comments}
  }
  function failure(error) {
    return {type: userConstants.GETALL_COMMENTS_FAILURE, error}
  }

}

function createNewComment(user, activityId, comment){
  return dispatch => {
    dispatch(request());
    console.log('user', user);
    console.log('activityId',activityId);
    console.log('comment', comment);
    tripService.createNewComment(user, activityId, comment)
      .then((response) => {

        console.log('backend commnet', response.data)
        dispatch(success(response.data));
        dispatch(send(response.data))
      })
      .catch((error) => {
        dispatch(failure(error));
      })
  }

  function request(){
    return { type: userConstants.CREATE_NEW_COMMENT_REQUEST }
  }
  function success(comment) {
    return {type: userConstants.CREATE_NEW_COMMENT_SUCCESS, comment}
  }
  function failure(error) {
    return {type: userConstants.CREATE_NEW_COMMENT_FAILURE, error}
  }
  function send(comment) {
    return { type: chatConstants.SENDING_COMMENT, comment}
  }
}

function receiveMessage(message) {
  return dispatch => {
    dispatch(receive(message));
  }

  function receive(message) {
    return {type: chatConstants.INCOMING_MESSAGE, message}
  }

}

function sendMessage(message) {
  return dispatch => {
    dispatch(send(message));
  }
  function send(message) {
    return {type: chatConstants.SENDING_MESSAGE, message}
  }
}

function receiveActivity(activity) {
  return dispatch => {
    let sendData = {
      description: activity
    }
    dispatch(receive(sendData));
  }
  function receive(activity) {
    return { type: chatConstants.INCOMING_ACTIVITY, activity}
  }
}

function sendActivity(activity) {
  return dispatch => {
    dispatch(send(activity));
  }
  function send(activity) {
    return { type: chatConstants.SENDING_ACTIVITY, activity}
  }
}

function getRecommendation(tripID) {
  return dispatch => {
    dispatch(request(tripID))
    apiService.getRecommend(tripID).
    then((data) => {
      dispatch(success(data));
    }).
    catch((err) => {
      dispatch(failure(err));
    })
  }


  function request(tripID) {
    return {type: userConstants.GET_RECOMMENDATION_REQUEST, tripID}
  }
  function success(recommendations) {
    return {type: userConstants.GET_RECOMMENDATION_SUCCESS, recommendations}
  }
  function failure(error) {
    return {type: userConstants.GET_RECOMMENDATION_FAILURE, error: error}
  }
}


function clearAllComments(){
  return dispatch => {
    dispatch(clear());
  }
  function clear(){
    return { type: userConstants.CLEAR_ALL_COMMENTS, comments: []};
  }

}

function receiveComment(comment) {
  return dispatch => {
    let sendData = {
      description: comment
    }
    console.log('received comment', comment);
    dispatch(receive(comment));
  }
  function receive(comment) {
    return { type: chatConstants.INCOMING_COMMENT, comment}
  }
}

function sendComment(comment) {
  return dispatch => {
    dispatch(send(comment));
  }
  function send(comment) {
    return { type: chatConstants.SENDING_COMMENT, comment}
  }
}

function receiveDeleteActivity(activityID) {
  return dispatch => {
    dispatch(receive(activityID));
  }

  function receive(activityID) {
    return { type: chatConstants.RECEIVE_DELECT_ACTIVITY, activityID};
  }
}


function updateActivity(activity){
  return dispatch => {
    tripService.updateActivity(activity)
      .then((response) => {
        dispatch(success(response.data));
      })
      .catch(error => dispatch(failure(error)));
  }
  function success(activities) {
    return {type: userConstants.UPDATE_ACTIVITY_SUCCESS, activities}
  }
  function failure(error) {
    return {type: userConstants.UPDATE_ACTIVITY_FAILURE, error}
  }
}

function getFriends(tripid) {
  return dispatch => {
    tripService.getFriends(tripid)
    .then((response) => {
      console.log('getting friends on this trip', response)
      dispatch(success(response));
    })
    .catch(error => dispatch(failure(error)));
  }

  function success(friends) {
    return {type: userConstants.GET_FRIENDS_SUCCESS, friends}
  }
  function failure(error) {
    return {type: userConstants.GET_FRIENDS_FAILURE, error}
  }
}


function receiveInvite(invite) {
  return dispatch => {
      console.log('user--- invite', invite);
      userService.getUserByEmail(invite.email).
      then((user) => {

        if (invite.sender.id != user.id) {
          let userGet = {
            user: invite.email,
            id: user.id
          }
          console.log('receive-----user',user);
          dispatch(getAllTrips(userGet));
          dispatch(receive(invite));
        }
      })
      // dispatch(getAllTrips(invite));
      dispatch(receive(invite));
  }

  function receive(invite) {
    return { type: chatConstants.RECEIVE_INVITE, invite}
  }
}

function sendInvite(invite) {
  return dispatch => {
    dispatch(send(invite));
  }
  function send(invite) {
    return { type: chatConstants.SENDING_INVITE, invite}
  }
}
