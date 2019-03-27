import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import type { User } from '../reducers/types';

type P = {
  user: User
};

type S = {};

class Profile extends Component<P, S> {
  state = {};

  render() {
    const { user } = this.props;

    return (
      <Grid container spacing={16}>
        <Grid item xs container>
          <Grid item xs={1}>
            <Avatar
              alt="d"
              src="https://lh3.googleusercontent.com/-8cQsNrUnVPk/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfUGNTexwxNB5kj8vyVW1hiiH1JZg/s64-c-mo/photo.jpg"
            />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1">{user.fullname}</Typography>
            <Typography variant="subtitle2">@{user.username}</Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button variant="contained" color="primary">
              {user.isFollowing ? 'Following' : 'Follow'}
            </Button>
          </Grid>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            {user.followerCount} Followers
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            {user.followingCount} Following
          </Typography>
          <Divider />
        </Grid>
      </Grid>
    );
  }
}

export default Profile;
