import Session from './session';

const servers = {
  development: 'http://localhost:3000',
  staging: 'https://insightyasir.herokuapp.com',
  production: 'https://insight.thesmartengineer.com'
};
const server = servers[process.env.NODE_ENV || 'development'];

export const config = { serverUrl: server, apiUrl: `${server}/api` };
// console.log(`${JSON.stringify(config)}`);

export function authHeader() {
  // return authorization header with jwt token
  const user = Session.get();
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
}

export function handleResponse(response) {
  return response.text().then(text => {
    // console.log(`handleResponse ${text}`);
    try {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
          // console.log('401 response returned from api');
          // auto logout if 401 response returned from api
          Session.clear();
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
        // console.log(`errMessage: ${errMessage}`);
        return Promise.reject(errMessage);
      }
      return data;
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  });
}
