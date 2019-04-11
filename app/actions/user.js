import userService from '../services';
import { snackError, snack } from '.';

export const REGISTERED = 'REGISTERED';
export const AUTHENTICATED = 'AUTHENTICATED';
export const CONNECTED = 'CONNECTED';
export const FOLLOWERSLIST = 'FOLLOWERSLIST';
export const FOLLOWINGSLIST = 'FOLLOWINGSLIST';
export const DPCHANGED = 'DPCHANGED';
export const OPTIONSCHANGED = 'OPTIONSCHANGED';
export const LOGOUT = 'LOGOUT';

export const register = userData => dispatch => {
  console.log(`register got ${userData}`);
  return userService.register(userData).then(
    user => {
      console.log(`register callback ${user}`);
      dispatch({ type: REGISTERED, success: true, payload: user });
      return user;
      // socket.chat()
    },
    error => {
      console.log(`register callback ${error}`);
      dispatch({ type: REGISTERED, success: false, payload: {} });
      dispatch(snackError(error));
    }
  );
};

export const current = () => dispatch => {
  console.log(`current got`);
  return userService.current().then(
    data => {
      // console.log('current callback ' + JSON.stringify(data));
      dispatch({ type: CONNECTED, success: true, payload: data });
      return data;
    },
    error => {
      dispatch({ type: CONNECTED, success: false, payload: {} });
      dispatch(snackError(error));
    }
  );
};

export const authenticate = (username, password) => dispatch => {
  console.log(`authenticate got ${username} and ${password}`);
  return userService.login(username, password).then(
    user => {
      console.log(`authenticate callback ${user}`);
      dispatch({ type: AUTHENTICATED, success: true, payload: user });
      return user;
    },
    error => {
      dispatch({ type: AUTHENTICATED, success: false, payload: {} });
      dispatch(snackError(error));
    }
  );
};

export const logout = () => {
  console.log('logging out');
  userService.logout();
  return { type: LOGOUT };
};

export const followers = id => dispatch => {
  console.log(`followers got ${id}`);
  return userService.getFollowers(id).then(
    data => {
      // console.log('followers callback ' + JSON.stringify(data));
      dispatch({ type: FOLLOWERSLIST, success: true, payload: data.followers });
      return data;
    },
    error => {
      dispatch({ type: FOLLOWERSLIST, success: false, payload: [] });
      dispatch(snackError(error));
    }
  );
};

export const followings = id => dispatch => {
  console.log(`followings got ${id}`);
  return userService.getFollowings(id).then(
    data => {
      // console.log('followings callback ' + JSON.stringify(data));
      dispatch({
        type: FOLLOWINGSLIST,
        success: true,
        payload: data.followings
      });
      return data;
    },
    error => {
      dispatch({ type: FOLLOWINGSLIST, success: false, payload: [] });
      dispatch(snackError(error));
    }
  );
};

export const update = userInfo => dispatch => {
  console.log(`update got ${userInfo}`);
  return userService.update(userInfo).then(
    data => {
      console.log(`update callback ${JSON.stringify(data)}`);
      dispatch({ type: CONNECTED, success: true, payload: data });
      return data;
    },
    error => {
      dispatch(snackError(error));
    }
  );
};

export const options = postOptions => dispatch => {
  console.log(`options got ${postOptions}`);
  return userService.setPostOptions(postOptions).then(
    data => {
      console.log(`options callback ${JSON.stringify(data)}`);
      dispatch({
        type: OPTIONSCHANGED,
        success: true,
        payload: data.options
      });
      return data;
    },
    error => {
      dispatch(snackError(error));
    }
  );
};

export const updatePassword = pInfo => dispatch => {
  console.log(`updatePassword got ${pInfo}`);
  return userService.updatePassword(pInfo).then(
    data => {
      console.log(`updatePassword callback ${JSON.stringify(data)}`);
      dispatch({ type: CONNECTED, success: true, payload: data });
      dispatch(snack('Successfully changed the password'));
      return data;
    },
    error => {
      dispatch(snackError(error));
    }
  );
};

export const dpChange = data => ({
  type: DPCHANGED,
  success: data.success,
  payload: data.picture
});
