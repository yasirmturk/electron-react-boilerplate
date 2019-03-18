import userService from '../services';
import { enqueueSnackbar } from '.';

export const REGISTERED = 'REGISTERED';
export const AUTHENTICATED = 'AUTHENTICATED';
export const CONNECTED = 'CONNECTED';
export const LOGOUT = 'LOGOUT';

export const register = userData => dispatch => {
  console.log(`register got ${userData}`);
  userService.register(userData).then(
    user => {
      console.log(`register callback ${user}`);
      dispatch({ type: REGISTERED, success: true, payload: user });
      // socket.chat()
    },
    error => {
      console.log(`register callback ${error}`);
      dispatch({ type: REGISTERED, success: false, payload: {} });
      dispatch(
        enqueueSnackbar({ message: error, options: { variant: 'error' } })
      );
    }
  );
};

export const current = () => dispatch => {
  console.log(`current got`);
  userService.current().then(
    data => {
      // console.log('current callback ' + JSON.stringify(data));
      dispatch({ type: CONNECTED, success: true, payload: data });
      // push('/');
    },
    error => {
      dispatch({ type: CONNECTED, success: false, payload: {} });
      dispatch(
        enqueueSnackbar({ message: error, options: { variant: 'error' } })
      );
    }
  );
};

export const authenticate = (username, password) => dispatch => {
  console.log(`authenticate got ${username} and ${password}`);
  userService.login(username, password).then(
    user => {
      console.log('authenticate callback ' + user);
      dispatch({ type: AUTHENTICATED, success: true, payload: user });
      // dispatch(connect());
      // push('/');
    },
    error => {
      dispatch({ type: AUTHENTICATED, success: false, payload: {} });
      dispatch(
        enqueueSnackbar({ message: error, options: { variant: 'error' } })
      );
    }
  );
};

export const logout = () => {
  console.log('logging out');
  userService.logout();
  return { type: LOGOUT };
};
