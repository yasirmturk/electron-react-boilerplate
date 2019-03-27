import { CREATEPOST, GETFEED } from '../actions/post';
import type { Action } from './types';

const initialState = { feed: [] };

export default function(state = initialState, action: Action) {
  console.log('post reducer');
  switch (action.type) {
    case CREATEPOST:
      return {
        ...state,
        feed: state.feed.concat(action.payload)
      };
    case GETFEED:
      return {
        ...state,
        feed: action.payload
      };
    default:
      return state;
  }
}
