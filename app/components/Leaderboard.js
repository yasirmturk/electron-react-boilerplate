import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './Leaderboard.css';

type P = {
  current: () => void,
  follow: string => void,
  unfollow: string => void,
  topUsers: []
};

type S = {};

class Leaderboard extends Component<P, S> {
  props: P;

  state = {};

  componentWillMount() {
    const { current } = this.props;
    current();
  }

  followUser = id => {
    console.log(`followUesr ${id}`);
    const { follow } = this.props;
    follow(id);
  };

  render() {
    const { topUsers, follow, unfollow } = this.props;
    console.log(`topUsers: ${topUsers.length}`);
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <Paper square className={styles.paper}>
            <div className={styles.topBar}>
              <Typography variant="h6">Most followed Leaderboard</Typography>
              <div className={styles.topHeading} />
              <InputBase
                className={styles.input}
                placeholder="Search for someone..."
              />
              <IconButton className={styles.iconButton} aria-label="Search">
                <i className="fas fa-search" />
              </IconButton>
            </div>
            <List className={styles.list}>
              {topUsers.map((user, index) => (
                <ListItem alignItems="flex-start" key={index}>
                  <ListItemAvatar>
                    <Avatar
                      alt={user._id}
                      src={
                        user.picture ||
                        'https://lh3.googleusercontent.com/-8cQsNrUnVPk/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfUGNTexwxNB5kj8vyVW1hiiH1JZg/s64-c-mo/photo.jpg'
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.fullname} @${user.username}`}
                    secondary={
                      <React.Fragment>
                        <Typography component="span">
                          {user.followerCount} followers
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                  />
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
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    topUsers: state.leaderboard.users
  };
}

import { bindActionCreators } from 'redux';
import routes from '../constants/routes';
import * as LeaderboardActions from '../actions/leaderboard';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LeaderboardActions, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard);
