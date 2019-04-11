import {
  REGISTERED,
  AUTHENTICATED,
  CONNECTED,
  FOLLOWERSLIST,
  FOLLOWINGSLIST,
  DPCHANGED,
  OPTIONSCHANGED,
  LOGOUT
} from '../actions/user';
import Session from '../services/session';
import type { Action } from './types';

const emptyState = { isAuth: false };
const getInitialStateFromSession = () => {
  const user = Session.get();
  // console.log(`restoring session ${JSON.stringify(user)}`);
  return { isAuth: !!user, user };
};

export default function(state = getInitialStateFromSession(), action: Action) {
  console.log('user reducer');
  switch (action.type) {
    case REGISTERED:
      console.log(`user reducer${JSON.stringify(action.payload)}`);
      return {
        ...state,
        user: action.payload,
        isAuth: action.success
      };
    case AUTHENTICATED:
      return {
        ...state,
        user: action.payload,
        isAuth: action.success
      };
    case CONNECTED:
      return {
        ...state,
        user: action.payload.user,
        room: action.payload.room
      };
    case FOLLOWERSLIST:
      return {
        ...state,
        user: { ...state.user, followers: action.payload }
      };
    case FOLLOWINGSLIST:
      return {
        ...state,
        user: { ...state.user, followings: action.payload }
      };
    case DPCHANGED:
      return {
        ...state,
        user: {
          ...state.user,
          profile: { ...state.user.profile, picture: action.payload }
        }
      };
    case OPTIONSCHANGED:
      return {
        ...state,
        user: {
          ...state.user,
          profile: { ...state.user.profile, options: action.payload }
        }
      };
    case LOGOUT:
      console.log('Logged out!');
      return emptyState;
    default:
      return state;
  }
}
