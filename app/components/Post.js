import React from 'react';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import UserInfo from './UserInfo';

// import { format } from 'date-fns';

function Post({ post, onUser }) {
  const { creator: user } = post;

  return (
    <Grid item container>
      <Grid item xs={1}>
        <Avatar alt={user.username} src={user.picture} />
      </Grid>
      <Grid item xs container justify="space-between">
        <Grid item xs={6}>
          <UserInfo user={user} onClick={onUser} />
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            inline
            style={{ opacity: '0.4', marginRight: 8 }}
          >
            <i className="fas fa-eye" />
            &nbsp;{post.viewCount}
          </Typography>
          <Typography
            variant="subtitle2"
            inline
            align="right"
            color="textSecondary"
          >
            {new Date(post.date).toLocaleString()}
            {/* {format(date, 'HH:mm')} */}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            style={{ whiteSpace: 'pre-line' }}
            paragraph
          >
            {post.content}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Post;
