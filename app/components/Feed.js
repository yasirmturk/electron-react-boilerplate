import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import PostList from './PostList';
import PostInput from './PostInput';

import { create } from '../actions/post';

type P = {
  onPostSubmitted: ({}) => void,
  onProfile: ({}) => void
};

class Feed extends Component<P> {
  state = {};

  onProfile = user => {
    const { onProfile } = this.props;
    onProfile(user);
  };

  onPostSubmit = content => {
    const { onPostSubmitted } = this.props;

    const post = {
      content
    };
    onPostSubmitted(post);
  };

  onLoad = () => {
    this.main.scrollTop = this.main.scrollHeight;
    // this.main.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    return (
      <React.Fragment>
        <Grid
          container
          style={{ height: '100%', flexWrap: 'nowrap' }}
          // spacing={8}
          direction="column"
          justify="space-between"
          alignItems="stretch"
        >
          <div
            style={{
              flexGrow: 1,
              overflow: 'scroll',
              scrollBehavior: 'smooth',
              padding: 16
            }}
            ref={main => {
              this.main = main;
            }}
          >
            <PostList
              onLoad={this.onLoad}
              onProfile={this.onProfile}
              emptyMessage="It's looking empty here! But that's normal. Find familiar faces you know by clicking on the leaderboard icon just to the left!"
            />
          </div>
          <Divider />
          <Grid item style={{ padding: '8px 16px' }}>
            <PostInput onSubmit={this.onPostSubmit} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onPostSubmitted(post) {
      dispatch(create(post));
    }
  };
}
export default connect(
  null,
  mapDispatchToProps
)(Feed);
