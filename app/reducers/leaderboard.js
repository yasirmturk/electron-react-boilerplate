/* eslint-disable no-case-declarations */
import { FOLLOWED, UNFOLLOWED, LEADERBOARD } from '../actions/leaderboard';
import type { Action } from './types';

const initialState = { users: [] };

export default function(state = initialState, action: Action) {
  console.log('leaderboard reducer');
  switch (action.type) {
    case LEADERBOARD:
      return {
        ...state,
        users: action.payload
      };
    case FOLLOWED:
    case UNFOLLOWED:
      const newUser = action.payload;
      console.log(JSON.stringify(newUser));
      const { users } = state;
      // eslint-disable-next-line no-underscore-dangle
      const idx = users.findIndex(u => u._id === newUser._id);
      return {
        ...state,
        users: state.users
          .slice(0, idx)
          .concat(newUser)
          .concat(state.users.slice(idx + 1))
      };
    default:
      return state;
  }
}
