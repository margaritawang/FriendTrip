export const tripService = {
  getAllTrips,
  createNewTrip,
  getAllActivities
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
  const requestOptions = {
    body: {
      location: trip.location,
      start_date: trip.start_date,
      end_date: trip.end_date
    }
  };
  return axios.post('/api/trips', {
    location: trip.location,
    start_date: trip.start_date,
    end_date: trip.end_date
  }).then((response) => {
    console.log('Success: ', response);
  })
}

function getAllActivities(trip) {
  console.log(trip);
  const requestOptions = {
    method: 'GET'
  };

  return fetch(`/api/trips/${trip.id}/activities`, requestOptions).then(handleResponse);
}