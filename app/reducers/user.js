import { REGISTERED, AUTHENTICATED, CONNECTED, LOGOUT } from '../actions/user';
import type { Action } from './types';

// let user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { isAuth: true, user } : { isAuth: false };
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
    case LOGOUT:
      console.log('Logged out!');
      return initialState;
    default:
      return state;
  }
}
