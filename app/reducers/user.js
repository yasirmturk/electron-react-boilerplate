import {
  REGISTERED,
  AUTHENTICATED,
  CONNECTED,
  FOLLOWERSLIST,
  FOLLOWINGSLIST,
  LOGOUT
} from '../actions/user';
import type { Action } from './types';

const initialState = { isAuth: false };

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case REGISTERED:
      console.log(`user reducer${JSON.stringify(action.payload)}`);
      return {
        ...state,
        user: action.payload,
        isAuth: action.success
      };
    case AUTHENTICATED:
      console.log('user reducer');
      return {
        ...state,
        user: action.payload,
        isAuth: action.success
      };
    case CONNECTED:
      console.log('user reducer');
      return {
        ...state,
        user: action.payload.user,
        room: action.payload.room
      };
    case FOLLOWERSLIST:
      console.log('user reducer');
      return {
        ...state,
        user: { ...state.user, followers: action.payload }
      };
    case FOLLOWINGSLIST:
      console.log('user reducer');
      return {
        ...state,
        user: { ...state.user, followings: action.payload }
      };
    case 'DPCHANGED':
      console.log('user reducer');
      return {
        ...state,
        user: {
          ...state.user,
          profile: { ...state.user.profile, picture: action.payload }
        }
      };
    case LOGOUT:
      console.log('Logged out!');
      return initialState;
    default:
      return state;
  }
}
