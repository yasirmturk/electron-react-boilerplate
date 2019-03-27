import { config, authHeader, handleResponse } from './config';

function create(post) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  };

  return fetch(`${config.apiUrl}/post/create`, requestOptions).then(
    handleResponse
  );
}

function feed() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/post/feed`, requestOptions).then(
    handleResponse
  );
}

const postService = {
  create,
  feed
};

export default postService;
