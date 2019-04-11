import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

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
      <Grid container style={{ padding: 16 }}>
        <Grid item xs container>
          <Grid item xs={2}>
            <Avatar
              style={{ width: '64px', height: '64px' }}
              alt={user.username}
              src={user.picture}
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
        </Grid>
        <Grid item xs={12}>
          <List>
            <Divider />
            <ListItem button>
              <ListItemText
                primary={`${user.followerCount ||
                  user.followers.length} Followers`}
              />
              <ListItemIcon>
                <i className="fa fas fa-chevron-right" />
              </ListItemIcon>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary={`${user.followingCount ||
                  user.following.length} Following`}
              />
              <ListItemIcon>
                <i className="fa fas fa-chevron-right" />
              </ListItemIcon>
            </ListItem>
            <Divider />
          </List>
        </Grid>
      </Grid>
    );
  }
}

export default Profile;
