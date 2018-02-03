import axios from 'axios';

export const tripService = {
  getAllTrips,
  createNewTrip,
  getAllActivities,
  createNewActivity,
  getAllComments,
  createNewComment,
  deleteTrip
}

function getAllTrips(user) {
  const requestOptions = {
    method: 'GET'
  };

  return fetch(`/api/users/${user.id}/trips`, requestOptions).then(handleResponse);
}

function handleResponse(response){
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

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


function getAllComments(user, activity){
  const requestOptions = {
    method: 'GET'
  };

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
