export const ADD_MESSAGE = 'ADD_MESSAGE';

export function addMessage(message) {
  console.log(`addMessage got ${JSON.stringify(message)}`);
  return {
    type: ADD_MESSAGE,
    payload: message
  };
}
