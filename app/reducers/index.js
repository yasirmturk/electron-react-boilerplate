// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import notifier from './notifier';
import user from './user';
import post from './post';
import leaderboard from './leaderboard';
import messages from './messages';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    notifier,
    user,
    post,
    leaderboard,
    messages
  });
}
