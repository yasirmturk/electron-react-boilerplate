/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import uuidv1 from 'uuid/v1';
import MessageList from './MessageList';

import { chatIO } from '../services/socket';

import { addMessage } from '../actions/messages';

type P = {
  user: {},
  room: {},
  messages: [],
  onMessageSubmitted: ({}) => void,
  onMessageReceived: ({}) => void
};

type S = {};

class ChatRoom extends Component<P, S> {
  state = {};

  componentWillMount() {
    const {
      user: { token },
      room,
      onMessageReceived
    } = this.props;
    const roomId = room._id;

    // Connect and join this room
    this.socket = chatIO.joinRoom(token, roomId, onMessageReceived);

    console.log(`created socket ${this.socket}`);
  }

  onSubmit = e => {
    e.preventDefault();

    const { user, room, onMessageSubmitted } = this.props;
    const roomId = room._id;
    const { value } = this.input;

    const message = {
      id: uuidv1(),
      username: user.username,
      content: value,
      date: Date.now()
    };
    onMessageSubmitted(message);
    this.socket.emit('newMessage', roomId, message);
    this.input.form.reset();
  };

  render() {
    const { user, messages } = this.props;

    return (
      <Grid container justify="center" style={{ flexGrow: 1 }}>
        <Grid item xs={12} md={10}>
          <Typography variant="h6" gutterBottom>
            {user._id}'s Chatroom
          </Typography>
          <Divider />
          <br />
          <MessageList messages={messages} />
          <form>
            <Grid container style={{ marginTop: 10 }}>
              <TextField
                label="Your Message"
                style={{ flexGrow: 1 }}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    this.onSubmit(event);
                  }
                }}
                inputRef={input => (this.input = input)}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ margin: 12 }}
                onClick={this.onSubmit}
              >
                Send
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    room: state.user.room,
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onMessageSubmitted(message) {
      console.log('message submitted', message);
      dispatch(addMessage(message));
    },
    onMessageReceived(message) {
      console.log('message received', message);
      dispatch(addMessage(message));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom);
