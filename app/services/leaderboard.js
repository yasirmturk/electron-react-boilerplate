import { config, authHeader, handleResponse } from './config';

function follow(userId) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' }
  };

  return fetch(
    `${config.apiUrl}/leaderboard/follow/${userId}`,
    requestOptions
  ).then(handleResponse);
}

function unfollow(userId) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' }
  };

  return fetch(
    `${config.apiUrl}/leaderboard/unfollow/${userId}`,
    requestOptions
  ).then(handleResponse);
}

function current() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/leaderboard/current`, requestOptions).then(
    handleResponse
  );
}

const leaderboardService = {
  follow,
  unfollow,
  current
};

export default leaderboardService;
