import axios from 'axios';

export const tripService = {
  getAllTrips,
  createNewTrip,
  getAllActivities,
  inviteFriend,
  createNewActivity,
  deleteActivity,
  getAllComments,
  createNewComment,
  deleteTrip,
  updateActivity,
  getFriends
}

function getAllTrips(user) {
  const requestOptions = {
    method: 'GET'
  };

  return fetch(`/api/users/${user.id}/trips`, requestOptions).then(handleResponse);
}

function getFriends(tripid) {
  const requestOptions = {
    method: 'GET'
  };

  return fetch(`/api/friends/${tripid}`).then(handleResponse);
}

function handleResponse(response){
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  console.log("services response", response.statusText);
  return response.json();
}

function createNewTrip(user, trip){
  console.log('trip',trip);
  return axios.post(`/api/users/${user.id}/trips`, {
    location: trip.location,
    start_date: trip.start_date,
    end_date: trip.end_date
  });
}

function deleteTrip(tripid) {
  console.log(`/api/trips/${tripid}`);
  return axios.delete(`/api/trips/${tripid}`);
}

function inviteFriend(inviteInfo) {
  console.log(inviteInfo);
  return axios.post(`/api/friends/${inviteInfo.tripid}`, inviteInfo);
}

function getAllActivities(trip) {
  console.log("TRIPPPP", trip);
  const requestOptions = {
    method: 'GET'
  };

  return fetch(`/api/trips/${trip}/activities`, requestOptions).then(handleResponse);
}

function createNewActivity(user, activityInfo){
  const info = {
    trip_id: activityInfo.tripId,
    description: activityInfo.description,
    owner_id: user.id
  }

  console.log('activityinfo', activityInfo);
  return axios.post(`/api/trips/${activityInfo.tripId}/activities`, info);
}

function deleteActivity(activityid) {
  // console.log(`/api/trips/${tripid}`);
  return axios.delete(`/api/activities/${activityid}`);
}

function getAllComments(user, activity){
  const requestOptions = {
    method: 'GET'
  };

  // return fetch(`/api/activities/${activity.id}/comments`, requestOptions).then(handleResponse);
  return fetch(`/api/activities/${activity.id}/comments`, requestOptions).then(handleResponse);
}

function createNewComment(user, activityId, comment){
  const info = {
    owner_id: user.id,
    description: comment,
    activity_id: activityId
  }
  console.log("INFO --------", info);
  return axios.post(`/api/activities/${activityId}/comments`, info);
}

function updateActivity(activity){
  console.log('dnd activity', activity.trip_id);
  return axios.put(`/api/trips/${activity.trip_id}/activities`, activity)
}


