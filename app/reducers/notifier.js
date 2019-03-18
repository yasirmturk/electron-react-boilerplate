import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from '../actions';
import type { Action } from './types';

const defaultState = {
  notifications: []
};

export default (state = defaultState, action: Action) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification
          }
        ]
      };

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key
        )
      };

    default:
      return state;
  }
};
