import {authHeader} from '../_helpers';
import axios from 'axios';
const uploader = require('base64-image-upload');
export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
  faceCompare
};

function login(username, password) {
  // const requestOptions = {
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ username, password })
  // };
  const requestOptions = {
    body: {
      email: username,
      password: password
    }
  };
  // return fetch('/users/authenticate', requestOptions)
  //     .then(response => {
  //         if (!response.ok) {
  //             return Promise.reject(response.statusText);
  //         }
  //
  //         return response.json();
  //     })
  //     .then(user => {
  //          login successful if there's a jwt token in the response
  //         if (user && user.token) {
  //              store user details and jwt token in local storage to keep user logged in between page refreshes
  //             localStorage.setItem('user', JSON.stringify(user));
  //         }
  //         return user;
  //     });
  let data = {
    email: 'a@a.com ',
    password: '1'
  }
  let config = {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      "Accept": "application/json"
    }
  }
  return axios.post('http://localhost:3000/login', {
    email: username,
    password: password
  }).then((response) => {
    console.log('res', response);
    localStorage.setItem('user', JSON.stringify({user: username, token: 'fake-jwt-token'}));
    return Promise.resolve({user: username, token: 'fake-jwt-token'});
  })
}

function faceCompare(buffer) {
  console.log("buffer", buffer);
  let data = new FormData();
  let config = {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      "Accept": "application/json"
    }
  }
  data.append('file', buffer);
  data.append('name', 'what');

    return axios.post('http://localhost:3000/api/compare',data,config)
            .then((response) => {
                // console.log(resposne);
              localStorage.setItem('user', JSON.stringify({name: 'sen'}));
              return Promise.resolve(response);
            })
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch('/users', requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch('/users/' + _id, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  return fetch('/users/register', requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  return fetch('/users/' + user.id, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch('/users/' + id, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
