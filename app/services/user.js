import { config, authHeader, handleResponse } from './config';
import Session from './session';

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${config.apiUrl}/user/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      // localStorage.setItem('user', JSON.stringify(user));
      Session.set(user);
      return user;
    });
}

function current() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/user/current`, requestOptions).then(
    handleResponse
  );
}

function register(userData) {
  console.log(JSON.stringify(userData));
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  };

  return fetch(`${config.apiUrl}/user`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  // localStorage.removeItem('user');
  Session.clear();
}

function getFollowers(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/user/followers/${id}`, requestOptions).then(
    handleResponse
  );
}

function getFollowings(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/user/followings/${id}`, requestOptions).then(
    handleResponse
  );
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/user`, requestOptions).then(handleResponse);
}

function setPostOptions(opt) {
  console.log(JSON.stringify(opt));
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(opt)
  };

  return fetch(`${config.apiUrl}/user/options/post`, requestOptions).then(
    handleResponse
  );
}

function updatePassword(data) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  return fetch(`${config.apiUrl}/user/password`, requestOptions).then(
    handleResponse
  );
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/user/${id}`, requestOptions).then(
    handleResponse
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/user/${id}`, requestOptions).then(
    handleResponse
  );
}

const userService = {
  login,
  current,
  register,
  logout,
  getFollowers,
  getFollowings,
  update,
  setPostOptions,
  updatePassword,
  getById,
  delete: deleteUser
};

export default userService;
