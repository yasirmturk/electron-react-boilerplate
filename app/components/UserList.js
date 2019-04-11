import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import UserInfo from './UserInfo';
import type { User } from '../reducers/types';

type P = {
  users: [User],
  follow: string => void,
  unfollow: string => void,
  onProfile: ({}) => void
};

class UserList extends Component<P> {
  state = {};

  render() {
    const { users, follow, unfollow, onProfile } = this.props;
    console.log(`users: ${users.length}`);

    return (
      <List>
        {users.map((user, index) => (
          <React.Fragment key={user.username}>
            <Divider />
            <ListItem button onClick={() => onProfile(user)}>
              <Typography variant="subtitle1">
                {`${1 + index}.`}&nbsp;&nbsp;
              </Typography>
              <ListItemAvatar>
                <Avatar alt={user.username} src={user.picture} />
              </ListItemAvatar>
              <ListItemText primary={<UserInfo user={user} showFollowers />} />
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    user.isFollowing ? unfollow(user._id) : follow(user._id)
                  }
                >
                  {user.isFollowing ? 'Following' : 'Follow'}
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { follow, unfollow } from '../actions/leaderboard';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ follow, unfollow }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(UserList);
