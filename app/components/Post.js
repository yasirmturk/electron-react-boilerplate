import React from 'react';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import { withStyles } from '@material-ui/core/styles';

// import { format } from 'date-fns';

const stylesForPost = {
  avatar: { maxWidth: 40, maxHeight: 40, marginRight: 1 },
  userName: { display: 'inline-block', marginRight: 4 },
  views: {
    position: 'relative',
    fontSize: '1.25em',
    // width: theme.typography.display1.fontSize,
    width: '1.1em',
    verticalAlign: 'middle'
    // opacity: '0.5'
  }
};

const Post = withStyles(stylesForPost)(({ post, classes }) => {
  const { creator: user, date, content } = post;

  return (
    <Grid item container>
      <Grid item xs={1}>
        <Avatar
          className={classes.avatar}
          alt={user.username}
          src={
            user.picture ||
            'https://img.icons8.com/cotton/64/000000/administrator-male.png'
          }
        />
      </Grid>
      <Grid item xs container>
        <Grid item xs={6}>
          <Typography
            variant="subtitle1"
            className={classes.userName}
            color="primary"
          >
            {user.fullname}
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.userName}
            color="textSecondary"
          >
            @{user.username}
          </Typography>
        </Grid>
        <Grid item xs />
        <Grid item xs={1}>
          <Typography variant="body2" style={{ opacity: '0.4' }}>
            <Icon className={`${classes.views} fas fa-eye`} />
            &nbsp;99+&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2" color="textSecondary">
            &nbsp;{new Date(date).toLocaleString()}
            {/* {format(timestamp, 'HH:mm')} */}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            style={{ whiteSpace: 'pre-line' }}
            paragraph
          >
            {content}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default Post;
