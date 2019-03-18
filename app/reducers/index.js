// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import notifier from './notifier';
import counter from './counter';
import user from './user';
import leaderboard from './leaderboard';
import messages from './messages';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    notifier,
    counter,
    user,
    leaderboard,
    messages
  });
}
