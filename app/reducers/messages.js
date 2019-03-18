import { ADD_MESSAGE } from '../actions/messages';
import type { Action } from './types';

const initialState = [
  // {
  //   id: '2',
  //   username: 'marissa',
  //   date: new Date(),
  //   content: 'Cool, das funktioniert.'
  // },
  // {
  //   id: '3',
  //   username: 'jennifer',
  //   date: new Date(),
  //   content: 'Cool, das funktioniert.'
  // }
];

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_MESSAGE:
      console.log('state', state);
      if (state.some(message => message.id === action.payload.id)) {
        console.log('skippping');
        return state;
      }
      return [...state, action.payload];
    default:
      return state;
  }
}
