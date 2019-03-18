import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

// import { format } from 'date-fns';

const stylesForMessage = {
  avatar: { maxWidth: 32, maxHeight: 32, marginRight: 5 },
  userName: {
    display: 'inline-block',
    marginRight: 5
  },
  timestamp: { display: 'inline-block' }
};

const Message = withStyles(stylesForMessage)(({ message, classes }) => {
  const { username, date, content } = message;
  return (
    <Grid container justify="flex-start">
      <Avatar
        className={classes.avatar}
        alt={username}
        src="https://lh3.googleusercontent.com/-8cQsNrUnVPk/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfUGNTexwxNB5kj8vyVW1hiiH1JZg/s64-c-mo/photo.jpg"
      />
      <div>
        <Typography variant="body2" className={classes.userName}>
          {username}
        </Typography>
        <Typography variant="caption" className={classes.timestamp}>
          {new Date(date).toLocaleString()}
          {/* {format(timestamp, 'HH:mm')} */}
        </Typography>
        <Typography variant="body1" paragraph>
          {content}
        </Typography>
      </div>
    </Grid>
  );
});

type P = {
  messages: []
};

type S = {};

class MessageList extends Component<P, S> {
  state = {};

  render() {
    const { messages } = this.props;

    return (
      <div>
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    );
  }
}

export default MessageList;
