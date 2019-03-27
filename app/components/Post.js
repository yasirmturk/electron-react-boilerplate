import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import { withStyles } from '@material-ui/core/styles';

// import { format } from 'date-fns';

const stylesForPost = {
  avatar: { maxWidth: 32, maxHeight: 32, marginRight: 5 },
  userName: {
    display: 'inline-block',
    marginRight: 5
  },
  timestamp: { display: 'inline-block' }
};

const Post = withStyles(stylesForPost)(({ post, classes }) => {
  const { creator: user, date, content } = post;

  return (
    <Grid container justify="flex-start">
      <Grid item xs={1}>
        <Avatar
          className={classes.avatar}
          alt={user.username}
          src="https://lh3.googleusercontent.com/-8cQsNrUnVPk/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfUGNTexwxNB5kj8vyVW1hiiH1JZg/s64-c-mo/photo.jpg"
        />
      </Grid>
      <Grid item xs container>
        <Grid item xs={6}>
          <Typography variant="subtitle1" className={classes.userName}>
            {user.fullname} @{user.username}
          </Typography>
        </Grid>
        <Grid item xs />
        <Grid item xs={4}>
          <Icon
            className="fas fa-eye"
            fontSize="small"
            color="action"
            style={{ width: '3em' }}
          >
            &nbsp;99+&nbsp;
          </Icon>
          <Typography variant="subtitle2" className={classes.timestamp}>
            &nbsp;{new Date(date).toLocaleString()}
            {/* {format(timestamp, 'HH:mm')} */}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" paragraph>
            {content}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default Post;
