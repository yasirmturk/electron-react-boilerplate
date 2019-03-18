const server =
  process.env.NODE_ENV === 'production'
    ? 'https://insightyasir.herokuapp.com'
    : 'http://localhost:3000';
export const config = {
  serverUrl: server,
  apiUrl: `${server}/api`
  // apiUrl: 'https://insightyasir.herokuapp.com/api'
};

console.log(`${JSON.stringify(config)}`);

export function authHeader() {
  // return authorization header with jwt token
  const userStore = localStorage.getItem('user');
  const { user } = JSON.parse(userStore);
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  // else {
  //   return null;
  // }
}

export function handleResponse(response) {
  return response.text().then(text => {
    // console.log(`res ${text}`);
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        console.log('auto logout if 401 response returned from api');
        // auto logout if 401 response returned from api
        // logout();
        // location.reload(true);
      }

      const error = data && data.errors;
      let errMessage = '';
      if (error) {
        Object.entries(error).forEach(([k, v]) => {
          errMessage += `${k} ${v}\n`;
        });
      } else {
        errMessage = response.statusText;
      }
      return Promise.reject(errMessage);
    }

    return data;
  });
}
