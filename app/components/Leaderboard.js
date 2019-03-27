import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import UserList from './UserList';

type P = {
  current: () => void,
  topUsers: [],
  onProfile: ({}) => void
};

class Leaderboard extends Component<P> {
  props: P;

  state = {};

  componentDidMount() {
    const { current } = this.props;
    current();
  }

  render() {
    const { topUsers, follow, unfollow, onProfile } = this.props;
    console.log(`topUsers: ${topUsers.length}`);
    return (
      <Grid container>
        <Grid item xs={12} container>
          <Grid item xs={6}>
            <Typography variant="h6">Most followed Leaderboard</Typography>
          </Grid>
          <Grid item xs />
          <Grid item xs={4}>
            <InputBase placeholder="Search for someone..." />
            <IconButton aria-label="Search">
              <i className="fas fa-search" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {topUsers && <UserList users={topUsers} onProfile={onProfile} />}
          <Divider />
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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { current } from '../actions/leaderboard';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ current }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard);
