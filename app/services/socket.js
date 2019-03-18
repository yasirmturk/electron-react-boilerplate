import io from 'socket.io-client';
import { config } from './config';

export default {
  // joinRoom,
  rooms,
  chat
};

export const chatIO = {
  joinRoom: (token, roomId, onMessage) => {
    const socket = io(`${config.serverUrl}/chatroom`, {
      transports: ['websocket'],
      query: `token=${token}`
    });
    socket.on('disconnect', () => {
      console.log('Room disconnected');
    });
    // When socket connects, join the current chatroom
    socket.on('connect', () => {
      console.log(`Room connected ${roomId}`);
      socket.emit('join', roomId);
      // Update users list upon emitting updateUsersList event
      socket.on('updateUsersList', (users, clear) => {
        console.log(`updateUsersList ${clear}`);
        if (users.error != null) {
          console.log(`users.error: ${users.error}`);
        } else {
          // app.helpers.updateUsersList(users, clear);
        }
      });

      // Whenever a user leaves the current room, remove the user from users list
      socket.on('removeUser', userId => {
        console.log(`removeUser: ${userId}`);
        // app.helpers.updateNumOfUsers();
      });

      // Append a new message
      socket.on('addMessage', m => {
        console.log(`addMessage: ${m}`);
        onMessage(m);
      });
    });
    return socket;
  }
};

function rooms() {
  const socket = io(`${config.serverUrl}/rooms`, { transports: ['websocket'] });
  // When socket connects, get a list of chatrooms
  socket.on('connect', () => {
    // Update rooms list upon emitting updateRoomsList event
    socket.on('updateRoomsList', room => {
      // Display an error message upon a user error(i.e. creating a room with an existing title)
      if (room.error != null) {
        console.log(`room.error: ${room.error}`);
      } else {
        // app.helpers.updateRoomsList(room);
      }
    });
  });
}

function chat(roomId, username) {
  const socket = io(`${config.serverUrl}/chatroom`, {
    transports: ['websocket']
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
  // When socket connects, join the current chatroom
  socket.on('connect', () => {
    console.log(`connected ${username} to room ${roomId}`);
    socket.emit('join', roomId);
    // Update users list upon emitting updateUsersList event
    socket.on('updateUsersList', (users, clear) => {
      console.log(`updateUsersList ${clear}`);
      if (users.error != null) {
        console.log(`users.error: ${users.error}`);
      } else {
        // app.helpers.updateUsersList(users, clear);
      }
    });

    // Whenever the user hits the save button, emit newMessage event.
    // $('.chat-message button').on('click', e => {
    //   // app.helpers.addMessage(message);
    // });
    const message = {
      content: 'messageContent',
      username,
      date: Date.now()
    };
    socket.emit('newMessage', roomId, message);

    // Whenever a user leaves the current room, remove the user from users list
    socket.on('removeUser', userId => {
      console.log(`removeUser: ${userId}`);
      // app.helpers.updateNumOfUsers();
    });

    // Append a new message
    socket.on('addMessage', m => {
      console.log(`addMessage: ${m}`);
      // app.helpers.addMessage(message);
    });
  });
}
