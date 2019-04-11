// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';

import Home from '../components/Home';

import { current, logout, followers, followings } from '../actions/user';

type Props = {};

class HomePage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="container">
        <CssBaseline />
        <Home {...this.props} />
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user.user
  // room: state.user.room,
  // feedCount: state.post.feed.length
});

const mapDispatch = dispatch => ({
  onConnect: () => dispatch(current()),
  onLogOut: () => dispatch(logout()),
  onFollowers: id => dispatch(followers(id)),
  onFollowings: id => dispatch(followings(id))
});

export default connect(
  mapState,
  mapDispatch
)(HomePage);
